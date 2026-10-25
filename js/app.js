// Arabic Learning App - Duolingo-style lesson engine
// Pure vanilla JS, localStorage persistence, SpeechSynthesis audio.

// localStorage is unavailable or throws on some file:// setups, so guard it.
const store = {
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : raw;
        } catch (e) {
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            /* persistence is a progressive enhancement */
        }
    },
    clear() {
        try {
            localStorage.clear();
        } catch (e) {
            /* ignore */
        }
    },
    json(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch (e) {
            return fallback;
        }
    }
};

// How many questions a single lesson asks. Each word is drilled twice, once in
// each direction, so the learner both reads and produces the language.
const REPS_PER_WORD = 2;
const TEST_LENGTH = 20;
const ROOT_DRILL_LENGTH = 10;

// A sentence stage belongs to a bank, not a dialect. Two dialects reading the
// same bank share the stages they have finished; a dialect on another bank has
// its own list.
function sentenceBankFor(dialectId) {
    if (typeof resolveBank === 'function' && typeof DIALECT_BANK !== 'undefined') {
        return resolveBank(dialectId, DIALECT_BANK);
    }
    return 'general';
}

// How long a sentence stage's sentences are. A stage is described by its
// longest sentence so the hint cannot drift from the data it is drawn from.
const SENTENCE_LENGTH_BANDS = [
    { max: 2, label: '2 words' },
    { max: 3, label: '3 words' },
    { max: 5, label: '4–5 words' },
    { max: 8, label: '6–8 words' },
    { max: 12, label: '9–12 words' },
    { max: Infinity, label: '13+ words' }
];

const SENTENCE_BANK_LABELS = {
    gulf: 'Gulf Arabic',
    levantine: 'Levantine Arabic',
    egyptian: 'Egyptian Arabic',
    maghrebi: 'Maghrebi Arabic',
    general: 'Standard Arabic'
};

function stageSentences(bank, stage) {
    if (typeof SENTENCE_BANKS === 'undefined') return [];
    return (SENTENCE_BANKS[bank] || []).filter(s => s && s.stage === stage);
}

function stageLengthHint(bank, stage) {
    const sentences = stageSentences(bank, stage);
    if (!sentences.length) return '';
    const longest = Math.max(...sentences.map(s => (Array.isArray(s.tiles) ? s.tiles.length : 0)));
    const band = SENTENCE_LENGTH_BANDS.find(b => longest <= b.max);
    return band ? band.label : '';
}

function bankLabel(bank) {
    return SENTENCE_BANK_LABELS[bank] || SENTENCE_BANK_LABELS.general;
}

// Stages a bank has actually written. buildPath() only emits a node for these,
// so an authoring pass adds a card without touching the renderer.
function authoredStages(bank) {
    if (typeof SENTENCE_BANKS === 'undefined') return [];
    const stages = [];
    (SENTENCE_BANKS[bank] || []).forEach(s => {
        if (s && typeof s.stage === 'number' && !stages.includes(s.stage)) stages.push(s.stage);
    });
    return stages.sort((a, b) => a - b);
}

function hasNumericUnitId(completedLessons) {
    return Object.keys(completedLessons).some(dialectId => {
        const entries = completedLessons[dialectId];
        if (!Array.isArray(entries)) return false;
        return entries.some(id => typeof id === 'number' ||
            (typeof id === 'string' && /^\d+$/.test(id)));
    });
}

// Saved unit progress used to hold numeric ids. Convert it to the stable
// `unit:<key>` ids the path uses and write the result back once.
function loadCompletedLessons() {
    const raw = store.json('arabicLearn_completed', {}) || {};
    if (!hasNumericUnitId(raw)) return raw;
    if (typeof SentenceEngine === 'undefined' || !SentenceEngine.migrateCompleted) return raw;

    const migrated = SentenceEngine.migrateCompleted(raw, lessonData);
    store.set('arabicLearn_completed', JSON.stringify(migrated));
    return migrated;
}

function loadSentenceProgress() {
    const raw = store.json('arabicLearn_sentenceProgress', {});
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
}

// Progress may predate the migration, so both the stable id and the legacy
// numeric id count as done.
function isUnitDone(completed, unit) {
    if (!unit) return false;
    if (completed.includes(unit.id)) return true;
    return typeof unit.key === 'string' && completed.includes('unit:' + unit.key);
}

// Pause after an answer before the next question appears. Testers found the
// old 900ms too tight to read the word, so both pauses gained 300ms.
const ADVANCE_CORRECT_MS = 1200;
const ADVANCE_WRONG_MS = 2100;

class ArabicLearnApp {
    constructor() {
        this.state = {
            currentDialect: store.json('arabicLearn_currentDialect', null),
            xp: parseInt(store.get('arabicLearn_xp', '0')) || 0,
            streak: parseInt(store.get('arabicLearn_streak', '0')) || 0,
            lastActiveDate: store.get('arabicLearn_lastActive', null),
            completedLessons: loadCompletedLessons(),
            sentenceProgress: loadSentenceProgress(),
            wordStats: store.json('arabicLearn_wordStats', {}),
            mode: 'lesson',
            currentLesson: null,
            questions: [],
            currentQuestionIndex: 0,
            correctThisSession: 0,
            exercise: null,
            assembled: [],
            tray: [],
            showRoot: false,
            pool: null,
            dirs: null,
            voices: []
        };

        this.dom = {};
        this._locked = false;
        this._advanceTimer = null;
        this._raf = null;
        this.init();
    }

    init() {
        this.cacheDom();
        this.loadVoices();
        this.renderDialectGrid();
        this.bindEvents();
        this.updateLastActive();

        // If a dialect was already chosen, jump straight to home.
        if (this.state.currentDialect && lessonData[this.state.currentDialect.id]) {
            this.showHome();
        }
    }

    cacheDom() {
        const ids = [
            'onboardingScreen', 'homeScreen', 'lessonScreen', 'profileScreen', 'testScreen',
            'rootsScreen', 'dialectGrid', 'dialectSelectProfile', 'headerDialectName',
            'streakCount', 'xpCount', 'userLevel', 'xpBarFill', 'unitsList',
            'lessonProgressFill', 'currentQ', 'totalQ', 'questionArea',
            'feedbackArea', 'feedbackText', 'rootNote', 'autoTimer', 'autoTimerFill',
            'skipBtn', 'closeLesson', 'lessonTitle', 'profileStreak', 'profileXP',
            'profileLevel', 'resetProgressBtn', 'bottomNav',
            'testWordsKnown', 'testAccuracy', 'testPoolInfo', 'testStartBtn',
            'patternList', 'familyList', 'rootDrillBtn'
        ];
        ids.forEach(id => {
            this.dom[id] = document.getElementById(id);
        });
    }

    // ---------- Audio ----------
    loadVoices() {
        if (!('speechSynthesis' in window)) return;
        const populate = () => {
            this.state.voices = window.speechSynthesis.getVoices();
        };
        populate();
        window.speechSynthesis.onvoiceschanged = populate;
    }

    speak(text) {
        if (!('speechSynthesis' in window) || !text) return;
        try {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'ar-SA';
            const arabicVoice = this.state.voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ar'));
            if (arabicVoice) utter.voice = arabicVoice;
            utter.rate = 0.85;
            window.speechSynthesis.speak(utter);
        } catch (e) {
            /* speech is a progressive enhancement */
        }
    }

    // ---------- Screens ----------
    showScreen(name) {
        ['onboardingScreen', 'homeScreen', 'lessonScreen', 'profileScreen', 'testScreen', 'rootsScreen'].forEach(id => {
            this.dom[id].classList.toggle('active', id === name);
        });
        const showNav = name === 'homeScreen' || name === 'profileScreen' ||
            name === 'testScreen' || name === 'rootsScreen';
        this.dom.bottomNav.hidden = !showNav;
        document.body.classList.toggle('has-nav', showNav);
        window.scrollTo(0, 0);
    }

    showHome() {
        this.dom.headerDialectName.textContent =
            `${this.state.currentDialect.flag} ${this.state.currentDialect.nameEn}`;
        this.renderPath();
        this.updateStats();
        this.showScreen('homeScreen');
        this.setNav('home');
    }

    setNav(tab) {
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tab);
        });
    }

    // ---------- Dialect picker ----------
    renderDialectGrid() {
        const grid = this.dom.dialectGrid;
        grid.innerHTML = '';

        const regions = [...new Set(dialects.map(d => d.region))];
        regions.forEach(region => {
            const heading = document.createElement('h3');
            heading.className = 'region-heading';
            heading.textContent = region;
            grid.appendChild(heading);

            const wrap = document.createElement('div');
            wrap.className = 'dialect-grid-inner';

            dialects.filter(d => d.region === region).forEach(dialect => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'dialect-card';
                card.innerHTML = `
                    <span class="dialect-flag" aria-hidden="true">${dialect.flag}</span>
                    <span class="dialect-name-ar">${dialect.nameAr}</span>
                    <span class="dialect-name-en">${dialect.nameEn}</span>
                `;
                card.setAttribute('aria-label', `Learn ${dialect.nameEn}`);
                card.addEventListener('click', () => this.selectDialect(dialect));
                wrap.appendChild(card);
            });

            grid.appendChild(wrap);
        });
    }

    selectDialect(dialect) {
        this.state.currentDialect = dialect;
        store.set('arabicLearn_currentDialect', JSON.stringify(dialect));
        this.showHome();
    }

    // ---------- Path ----------
    // The home list is a mixed path: word units plus the sentence stages that
    // sit after their anchor units. buildPath() owns the order and isUnlocked()
    // owns the lock rules, so this method only describes what it is handed.
    renderPath() {
        const list = this.dom.unitsList;
        list.innerHTML = '';
        const dialectId = this.state.currentDialect.id;
        const lessons = lessonData[dialectId] || [];
        const completed = this.state.completedLessons[dialectId] || [];
        const bank = sentenceBankFor(dialectId);
        const sentenceProgress = this.state.sentenceProgress || {};
        const path = this.buildSentencePath(lessons, bank);

        path.forEach((node, index) => {
            const isCompleted = this.isPathNodeDone(node, completed, sentenceProgress, bank);
            const isLocked = this.isPathNodeLocked(path, index, completed, bank, sentenceProgress);
            const card = node.kind === 'sentence'
                ? this.renderSentenceCard(node, isLocked, isCompleted)
                : this.renderUnitCard(node.unit, isLocked, isCompleted);
            list.appendChild(card);
        });
    }

    buildSentencePath(lessons, bank) {
        if (typeof SentenceEngine === 'undefined' || !SentenceEngine.buildPath) {
            // Without the engine the path still renders, just without sentences.
            return lessons.map(unit => ({ kind: 'unit', id: 'unit:' + unit.key, unit: unit }));
        }
        return SentenceEngine.buildPath({
            units: lessons,
            bank: bank,
            anchors: typeof STAGE_ANCHORS !== 'undefined' ? STAGE_ANCHORS : [],
            sentenceStages: authoredStages(bank)
        });
    }

    isPathNodeDone(node, completed, sentenceProgress, bank) {
        if (!node) return false;
        if (node.kind === 'sentence') {
            const done = sentenceProgress[node.bank || bank];
            return Array.isArray(done) && done.includes(node.stage);
        }
        return isUnitDone(completed, node.unit);
    }

    isPathNodeLocked(path, index, completed, bank, sentenceProgress) {
        if (typeof SentenceEngine !== 'undefined' && SentenceEngine.isUnlocked) {
            return !SentenceEngine.isUnlocked(path, index, completed, bank, sentenceProgress);
        }
        if (index === 0) return false;
        return !this.isPathNodeDone(path[index - 1], completed, sentenceProgress, bank);
    }

    // Both card kinds share the same shell: badge, title, status and one line
    // of detail. Only what fills that shell differs.
    bindCardActivation(card, isLocked, activate) {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', isLocked ? '-1' : '0');
        card.setAttribute('aria-disabled', isLocked ? 'true' : 'false');
        if (isLocked) return;
        card.addEventListener('click', activate);
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        });
    }

    renderUnitCard(unit, isLocked, isCompleted) {
        const card = document.createElement('div');
        card.className = `unit-card${isLocked ? ' locked' : ''}${isCompleted ? ' completed' : ''}`;

        const status = isCompleted ? '✓ Done'
            : isLocked ? '🔒 Locked'
            : 'Start';

        card.innerHTML = `
            <div class="unit-badge" aria-hidden="true">${isCompleted ? '★' : isLocked ? '🔒' : '▶'}</div>
            <div class="unit-body">
                <div class="unit-header">
                    <span class="unit-title">${unit.title}</span>
                    <span class="unit-status">${status}</span>
                </div>
                <div class="unit-desc">${unit.desc} · ${unit.words.length} words · ${unit.words.length * REPS_PER_WORD} questions</div>
            </div>
        `;

        this.bindCardActivation(card, isLocked, () => this.startLesson(unit));
        return card;
    }

    renderSentenceCard(node, isLocked, isCompleted) {
        const card = document.createElement('div');
        card.className = `unit-card sentence-card${isLocked ? ' locked' : ''}${isCompleted ? ' completed' : ''}`;

        const status = isCompleted ? '✓ Done'
            : isLocked ? '🔒 Locked'
            : 'Start';
        const meta = [stageLengthHint(node.bank, node.stage), bankLabel(node.bank)]
            .filter(Boolean)
            .join(' · ');

        card.innerHTML = `
            <div class="unit-badge" aria-hidden="true">${isCompleted ? '★' : isLocked ? '🔒' : '💬'}</div>
            <div class="unit-body">
                <div class="unit-header">
                    <span class="unit-title">Sentences · Stage ${node.stage}</span>
                    <span class="unit-status">${status}</span>
                </div>
                <div class="unit-desc">${meta}</div>
            </div>
        `;

        this.bindCardActivation(card, isLocked, () => this.startSentenceStage(node.stage, node.bank));
        return card;
    }

    // ---------- Lesson engine ----------
    startLesson(unit) {
        this.beginSession('lesson', unit.title, unit.words, unit.id);
    }

    startSentenceStage(stage, bank) {
        const resolved = bank || sentenceBankFor(this.state.currentDialect.id);
        this.beginSession('sentence', `Sentence · Stage ${stage}`, [], null, {
            stage: stage,
            bank: resolved
        });
    }

    // unitId must survive into currentLesson: completeSession() reads it to mark
    // the unit done, which is what unlocks the next one. Tests pass no id.
    // options: { showRoot, dirs, pool } — used by the root-inference drill.
    beginSession(mode, title, words, unitId = null, options = {}) {
        this.state.mode = mode;
        this.state.currentLesson = { id: unitId, title, words, stage: options.stage, bank: options.bank };
        this.state.showRoot = !!options.showRoot;
        this.state.dirs = options.dirs || null;
        this.state.pool = options.pool || null;
        this.state.questions = mode === 'sentence'
            ? this.buildSentenceQuestionSet(options.bank, options.stage)
            : this.buildQuestions(words, this.state.dirs);
        this.state.currentQuestionIndex = 0;
        this.state.correctThisSession = 0;

        this.dom.lessonTitle.textContent = title;
        this.dom.totalQ.textContent = this.state.questions.length;
        this.dom.lessonProgressFill.style.width = '0%';
        this.dom.skipBtn.hidden = false;

        this.showScreen('lessonScreen');
        this.renderQuestion();
    }

    // Every word is drilled once per direction, then the whole set is shuffled
    // so the learner cannot predict the order. A caller can pin the directions.
    buildQuestions(words, dirs = null) {
        const questions = [];
        if (dirs) {
            words.forEach(word => dirs.forEach(dir => questions.push({ word, dir })));
            return this.shuffle(questions);
        }
        words.forEach((word, i) => {
            const first = i % 2 === 0 ? 'ar-en' : 'en-ar';
            const second = first === 'ar-en' ? 'en-ar' : 'ar-en';
            questions.push({ word, dir: first });
            questions.push({ word, dir: second });
            for (let r = 2; r < REPS_PER_WORD; r++) {
                questions.push({ word, dir: r % 2 === 0 ? first : second });
            }
        });
        return this.shuffle(questions);
    }

    // A sentence stage drills one sentence per question. The stage is resolved
    // from the bank it was opened on, so a gulf stage is the same drill for
    // every gulf dialect.
    buildSentenceQuestionSet(bank, stage) {
        if (typeof SentenceEngine === 'undefined' || !SentenceEngine.buildSentenceQuestions) return [];
        const resolvedBank = bank || sentenceBankFor(this.state.currentDialect ? this.state.currentDialect.id : null);
        const sentences = stageSentences(resolvedBank, stage);
        const questions = SentenceEngine.buildSentenceQuestions(sentences);

        // A stage ends by asking what one of its words is made of. The moment is
        // only added when a sentence actually carries a root-and-pattern word.
        const moment = this.buildStageRootMoment(sentences);
        if (moment) questions.push({ kind: 'root', moment: moment });

        return questions;
    }

    buildStageRootMoment(sentences) {
        if (typeof SentenceEngine === 'undefined' || !SentenceEngine.buildRootMoment) return null;
        const pool = typeof ROOT_FORM_LIST !== 'undefined' ? ROOT_FORM_LIST : [];
        for (let i = 0; i < (sentences || []).length; i += 1) {
            const moment = SentenceEngine.buildRootMoment(sentences[i], pool);
            if (moment) return moment;
        }
        return null;
    }

    buildExercise(word, dir) {
        // Lessons draw distractors from the whole curriculum; the root drill
        // draws them from the root families so every option is a derived word.
        const source = (this.state.pool && this.state.pool.length) ? this.state.pool : allWords;
        const pool = source.filter(w => w.en !== word.en && w.ar !== word.ar);
        const distractors = this.pickDistractors(pool, 3);

        if (dir === 'ar-en') {
            const options = this.shuffle([word.en, ...distractors.map(w => w.en)]);
            return {
                type: 'ar-en',
                prompt: word.ar,
                translit: word.tr,
                speak: word.ar,
                instruction: 'What does this mean?',
                options,
                answer: word.en,
                answerTranslit: ''
            };
        }
        const options = this.shuffle([word.ar, ...distractors.map(w => w.ar)]);
        return {
            type: 'en-ar',
            prompt: word.en,
            translit: '',
            speak: null,
            instruction: 'Select the Arabic',
            options,
            answer: word.ar,
            answerTranslit: word.tr
        };
    }

    pickDistractors(pool, n) {
        const seen = new Set();
        const picked = [];
        for (const w of this.shuffle([...pool])) {
            if (seen.has(w.en)) continue;
            seen.add(w.en);
            picked.push(w);
            if (picked.length === n) break;
        }
        return picked;
    }

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    clearTimers() {
        if (this._advanceTimer) {
            clearTimeout(this._advanceTimer);
            this._advanceTimer = null;
        }
        if (this._raf) {
            cancelAnimationFrame(this._raf);
            this._raf = null;
        }
    }

    renderQuestion() {
        this.clearTimers();
        this._locked = false;

        if (this.state.mode === 'sentence') {
            this.renderSentenceQuestion();
            return;
        }

        const q = this.state.questions[this.state.currentQuestionIndex];
        if (!q) {
            this.dom.questionArea.innerHTML =
                '<p class="question-instruction">No sentences in this stage yet.</p>';
            return;
        }

        this.updateQuestionProgress();

        const exercise = this.buildExercise(q.word, q.dir);
        this.state.exercise = exercise;

        const area = this.dom.questionArea;
        const rootHint = (this.state.showRoot && q.word.root) ? `
            <div class="root-hint">
                <span class="root-chip"><span class="chip-label">Root</span> ${q.word.root} <span class="chip-gloss">${q.word.rootMeaning || ''}</span></span>
                <span class="root-chip chip-pattern"><span class="chip-label">Pattern</span> ${q.word.pattern} <span class="chip-gloss">${q.word.patternRole || ''}</span></span>
            </div>
        ` : '';
        area.innerHTML = `
            <p class="question-instruction">${exercise.instruction}</p>
            ${rootHint}
            <div class="prompt-row">
                ${exercise.speak ? `<button class="speak-btn" id="speakBtn" aria-label="Play pronunciation">🔊</button>` : ''}
                <div class="prompt-stack">
                    <div class="question-text"${exercise.type === 'en-ar' ? ' dir="ltr"' : ''}>${exercise.prompt}</div>
                    ${exercise.translit ? `<div class="prompt-translit">${exercise.translit}</div>` : ''}
                </div>
            </div>
            <div class="choices" id="choices" role="group" aria-label="Answer choices"></div>
        `;

        const speakBtn = document.getElementById('speakBtn');
        if (speakBtn) {
            speakBtn.addEventListener('click', () => this.speak(exercise.speak));
            this.speak(exercise.speak);
        }

        const choicesDiv = document.getElementById('choices');
        exercise.options.forEach((option, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'choice-btn';
            btn.textContent = option;
            btn.dataset.index = i;
            btn.addEventListener('click', () => this.selectChoice(option, btn));
            choicesDiv.appendChild(btn);
        });

        this.resetFeedback();
    }

    // ---------- Sentence tile builder ----------
    // One tap places a tile; the strip is RTL, so the first word lands at the
    // right edge and the sentence builds the way it is read. There is no submit
    // button: filling the last slot is the submission.
    renderSentenceQuestion() {
        const q = this.state.questions[this.state.currentQuestionIndex];
        if (!q) {
            this.dom.questionArea.innerHTML =
                '<p class="question-instruction">No sentences in this stage yet.</p>';
            return;
        }

        this.updateQuestionProgress();

        if (q.kind === 'root') {
            this.renderRootQuestion(q);
            return;
        }

        this.state.exercise = q;
        this.state.assembled = [];
        this.state.tray = [...q.tiles];

        this.dom.questionArea.innerHTML = `
            <p class="question-instruction">Build the sentence</p>
            <div class="build-strip" id="buildStrip" dir="rtl" role="group" aria-label="Your sentence"></div>
            <div class="build-tray" id="buildTray" dir="rtl" role="group" aria-label="Word tiles"></div>
            <p class="build-hint">Tap a word to place it, tap a placed word to send it back.</p>
        `;

        this.renderBuildTiles();
        this.resetFeedback();
    }

    // The close of a stage: one word, four pattern moulds. The word's own
    // pattern is always among them, and a miss is marked like any other miss.
    renderRootQuestion(q) {
        const moment = q.moment;
        this.state.exercise = moment;
        this.state.assembled = [];
        this.state.tray = [];

        const area = this.dom.questionArea;
        area.innerHTML = `
            <p class="question-instruction" dir="ltr">Which pattern is this word built on?</p>
            <div class="root-moment-prompt">
                <div class="root-moment-word" dir="rtl">${moment.word.ar}</div>
                <div class="root-moment-gloss">${moment.word.en || moment.word.rootMeaning || ''}</div>
            </div>
            <div class="choices" id="choices" role="group" aria-label="Pattern choices"></div>
        `;

        const choicesDiv = document.getElementById('choices');
        moment.options.forEach(option => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'choice-btn pattern-choice';
            btn.dir = 'rtl';
            btn.textContent = option;
            btn.addEventListener('click', () => this.selectRootChoice(option, btn));
            choicesDiv.appendChild(btn);
        });

        this.resetFeedback();
    }

    selectRootChoice(option, btn) {
        if (this._locked) return;
        this._locked = true;

        const moment = this.state.exercise;
        const isCorrect = option === moment.answer;

        document.querySelectorAll('.choice-btn').forEach(c => {
            c.disabled = true;
            if (c.textContent === moment.answer) {
                c.classList.add('correct');
            } else if (c === btn) {
                c.classList.add('wrong');
            }
        });

        if (isCorrect) {
            this.state.correctThisSession++;
            this.addXp(10);
            this.dom.feedbackText.textContent = 'Correct';
            this.dom.feedbackArea.className = 'feedback-area feedback-correct';
        } else {
            this.dom.feedbackText.textContent = `Correct answer: ${moment.answer}`;
            this.dom.feedbackText.setAttribute('dir', 'rtl');
            this.dom.feedbackArea.className = 'feedback-area feedback-wrong';
        }

        // The same equation the word drill uses, so the pattern is tied back to
        // the sentence the learner just built.
        this.showRootNote(moment.word);

        this.autoAdvance(isCorrect ? ADVANCE_CORRECT_MS : ADVANCE_WRONG_MS, isCorrect);
    }

    // The tray and the strip are both redrawn from state, which keeps duplicate
    // words honest: a tile is picked by position, never by text.
    renderBuildTiles() {
        const strip = document.getElementById('buildStrip');
        const tray = document.getElementById('buildTray');
        if (!strip || !tray) return;

        strip.innerHTML = '';
        tray.innerHTML = '';

        this.state.assembled.forEach((word, i) => {
            strip.appendChild(this.buildTile(word, 'answer', i));
        });
        this.state.tray.forEach((word, i) => {
            tray.appendChild(this.buildTile(word, 'tray', i));
        });

        strip.classList.toggle('is-empty', this.state.assembled.length === 0);
    }

    // The word on top, its gloss underneath. The gloss is only drawn for a
    // placed tile whose word the sentence itself teaches (a glue word or a new
    // one), so the strip never invents a meaning the stage did not give.
    teachGloss(word) {
        const sentence = this.state.exercise && this.state.exercise.sentence;
        const teach = sentence && Array.isArray(sentence.teach) ? sentence.teach : [];
        for (let i = 0; i < teach.length; i += 1) {
            const entry = teach[i];
            if (!entry || entry.ar !== word) continue;
            if (entry.kind !== 'glue' && entry.kind !== 'new') continue;
            return entry.en || '';
        }
        return '';
    }

    morphWordFor(word) {
        if (typeof SentenceEngine === 'undefined' || !SentenceEngine.findMorphForm) return null;
        const pool = typeof ROOT_FORM_LIST !== 'undefined' ? ROOT_FORM_LIST : [];
        return SentenceEngine.findMorphForm(word, pool);
    }

    sentenceMorphWord(sentence) {
        if (!sentence || !Array.isArray(sentence.tiles)) return null;
        for (let i = 0; i < sentence.tiles.length; i += 1) {
            const form = this.morphWordFor(sentence.tiles[i]);
            if (form) return form;
        }
        return null;
    }

    buildTile(word, from, index) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `build-tile build-tile-${from}`;
        btn.dataset.index = index;

        const label = document.createElement('span');
        label.className = 'build-tile-word';
        label.textContent = word;
        btn.appendChild(label);

        if (from === 'answer') {
            const chips = document.createElement('span');
            chips.className = 'build-tile-chips';

            const gloss = this.teachGloss(word);
            if (gloss) {
                const glossChip = document.createElement('span');
                glossChip.className = 'tile-gloss';
                glossChip.dir = 'ltr';
                glossChip.textContent = gloss;
                chips.appendChild(glossChip);
            }

            const morph = this.morphWordFor(word);
            if (morph && morph.root) {
                const rootChip = document.createElement('span');
                rootChip.className = 'tile-root-chip';
                rootChip.dir = 'ltr';
                rootChip.textContent = `Root ${morph.root}`;
                chips.appendChild(rootChip);
            }

            if (chips.childNodes.length) btn.appendChild(chips);
        }

        btn.addEventListener('click', () => this.selectTile(from, index));
        return btn;
    }

    // from: 'tray' moves a tile into the sentence, 'answer' sends it back.
    selectTile(from, index) {
        if (this._locked) return;
        const i = Number(index);
        if (!Number.isInteger(i) || i < 0) return;

        if (from === 'tray') {
            if (i >= this.state.tray.length) return;
            this.state.assembled.push(this.state.tray.splice(i, 1)[0]);
        } else if (from === 'answer') {
            if (i >= this.state.assembled.length) return;
            this.state.tray.push(this.state.assembled.splice(i, 1)[0]);
        } else {
            return;
        }

        this.renderBuildTiles();

        const answer = this.state.exercise.sentence.tiles;
        if (this.state.assembled.length === answer.length) this.gradeBuild();
    }

    gradeBuild() {
        if (this._locked) return;
        this._locked = true;

        const sentence = this.state.exercise.sentence;
        const answer = sentence.tiles;
        const result = SentenceEngine.gradeArrangement(this.state.assembled, answer);
        const strip = document.getElementById('buildStrip');

        document.querySelectorAll('.build-tile').forEach(tile => { tile.disabled = true; });

        // After either outcome, name the machinery behind the hardest word in
        // the sentence: root + pattern = word.
        const morph = this.sentenceMorphWord(sentence);
        if (morph) this.showRootNote(morph);

        if (result.correct) {
            this.state.correctThisSession++;
            this.addXp(10);
            if (strip) strip.classList.add('correct');
            this.dom.feedbackText.textContent = 'Correct';
            this.dom.feedbackArea.className = 'feedback-area feedback-correct';
            this.autoAdvance(ADVANCE_CORRECT_MS, true);
            return;
        }

        if (strip) strip.classList.add('wrong');
        this.dom.feedbackText.textContent = `Correct answer: ${sentence.ar || answer.join(' ')}`;
        this.dom.feedbackText.setAttribute('dir', 'rtl');
        this.dom.feedbackArea.className = 'feedback-area feedback-wrong';
        this.autoAdvance(ADVANCE_WRONG_MS, false);
    }

    updateQuestionProgress() {
        const total = this.state.questions.length;
        this.dom.currentQ.textContent = this.state.currentQuestionIndex + 1;
        this.dom.lessonProgressFill.style.width =
            (total ? (this.state.currentQuestionIndex / total) * 100 : 0) + '%';
    }

    resetFeedback() {
        this.dom.feedbackText.textContent = '';
        this.dom.feedbackText.removeAttribute('dir');
        this.clearRootNote();
        this.dom.feedbackArea.className = 'feedback-area';
        this.dom.autoTimer.hidden = true;
        this.dom.autoTimerFill.classList.remove('correct', 'wrong');
        this.dom.autoTimerFill.style.transition = 'none';
        this.dom.autoTimerFill.style.transform = 'scaleX(0)';
    }

    selectChoice(option, btn) {
        if (this._locked) return;
        this._locked = true;

        const { answer, type, answerTranslit } = this.state.exercise;
        const isCorrect = option === answer;

        document.querySelectorAll('.choice-btn').forEach(c => {
            c.disabled = true;
            const val = c.textContent;
            if (val === answer) {
                c.classList.add('correct');
            } else if (c === btn) {
                c.classList.add('wrong');
            }
        });

        this.recordWordStat(this.state.questions[this.state.currentQuestionIndex].word, isCorrect);

        if (isCorrect) {
            this.state.correctThisSession++;
            this.addXp(10);
            this.dom.feedbackText.textContent = 'Correct';
            this.dom.feedbackArea.className = 'feedback-area feedback-correct';
        } else {
            const hint = answerTranslit ? ` (${answerTranslit})` : '';
            this.dom.feedbackText.textContent = `Correct answer: ${answer}${hint}`;
            this.dom.feedbackArea.className = 'feedback-area feedback-wrong';
        }

        if (type === 'en-ar') this.speak(answer);

        // Show the machinery behind the word, so the word is a pattern and not
        // a one-off thing to memorise.
        this.showRootNote(this.state.questions[this.state.currentQuestionIndex].word);

        // Auto-advance: short pause on a hit, longer on a miss so the
        // correct answer can be read.
        this.autoAdvance(isCorrect ? ADVANCE_CORRECT_MS : ADVANCE_WRONG_MS, isCorrect);
    }

    // "ك-ت-ب (writing) + مَفْعَل (the place) = مكتب · desk / office"
    showRootNote(word) {
        const note = this.dom.rootNote;
        if (!note) return;
        if (!word || !word.root) { this.clearRootNote(); return; }
        note.hidden = false;
        note.textContent =
            `${word.root} (${word.rootMeaning}) + ${word.pattern} (${word.patternRole}) = ${word.ar} · ${word.en}`;
    }

    clearRootNote() {
        const note = this.dom.rootNote;
        if (!note) return;
        note.hidden = true;
        note.textContent = '';
    }

    autoAdvance(delay, isCorrect) {
        const fill = this.dom.autoTimerFill;
        this.dom.autoTimer.hidden = false;
        fill.classList.add(isCorrect ? 'correct' : 'wrong');

        // Restart the fill animation: reset instantly, then animate on the
        // next frame so the browser registers the change.
        fill.style.transition = 'none';
        fill.style.transform = 'scaleX(0)';
        this._raf = requestAnimationFrame(() => {
            fill.style.transition = `transform ${delay}ms linear`;
            fill.style.transform = 'scaleX(1)';
        });

        this._advanceTimer = setTimeout(() => {
            this.nextQuestion();
        }, delay);
    }

    nextQuestion() {
        this.clearTimers();
        this.state.currentQuestionIndex++;
        if (this.state.currentQuestionIndex >= this.state.questions.length) {
            this.completeSession();
        } else {
            this.renderQuestion();
        }
    }

    completeSession() {
        this.clearTimers();
        const total = this.state.questions.length;
        const correct = this.state.correctThisSession;
        const acc = total ? Math.round((correct / total) * 100) : 0;
        const isTest = this.state.mode === 'test';
        const isRoots = this.state.mode === 'roots';
        const isSentence = this.state.mode === 'sentence';

        if (isSentence) {
            this.recordSentenceStage();
        } else if (!isTest) {
            const dialectId = this.state.currentDialect.id;
            const unitId = this.state.currentLesson.id;
            const unit = (lessonData[dialectId] || []).find(u => u.id === unitId);
            const completedId = unit ? 'unit:' + unit.key : unitId;

            if (completedId != null) {
                if (!this.state.completedLessons[dialectId]) this.state.completedLessons[dialectId] = [];
                const done = this.state.completedLessons[dialectId];
                const alreadyDone = unit ? isUnitDone(done, unit) : done.includes(completedId);
                if (!alreadyDone) {
                    done.push(completedId);
                    this.addXp(50);
                }
                store.set('arabicLearn_completed', JSON.stringify(this.state.completedLessons));
            }
        }

        this.dom.lessonProgressFill.style.width = '100%';

        const title = isTest ? 'Test complete' : isRoots ? 'Drill complete' : 'Lesson complete';
        const emoji = isTest ? '📊' : isRoots ? '🌱' : '🎉';

        this.dom.questionArea.innerHTML = `
            <div class="complete-panel">
                <div class="complete-emoji" aria-hidden="true">${emoji}</div>
                <h2 class="complete-title">${title}</h2>
                <div class="complete-stats">
                    <div class="complete-stat">
                        <span class="complete-value">${acc}%</span>
                        <span class="complete-label">Accuracy</span>
                    </div>
                    <div class="complete-stat">
                        <span class="complete-value">${correct}/${total}</span>
                        <span class="complete-label">Correct</span>
                    </div>
                </div>
                <button class="btn btn-primary complete-btn" id="completeBtn">${isTest ? 'Back to test' : isRoots ? 'Back to roots' : 'Back to lessons'}</button>
            </div>
        `;

        this.dom.feedbackText.textContent = '';
        this.clearRootNote();
        this.dom.feedbackArea.className = 'feedback-area';
        this.dom.autoTimer.hidden = true;
        this.dom.skipBtn.hidden = true;

        document.getElementById('completeBtn').addEventListener('click', () => this.closeLesson());
    }

    // A sentence stage belongs to the bank, not the dialect: finishing it once
    // in any gulf dialect opens the next stage for every gulf dialect. Unit
    // progress is left alone, so the two ladders never overwrite each other.
    recordSentenceStage() {
        const lesson = this.state.currentLesson || {};
        let bank = lesson.bank;
        let stage = lesson.stage;

        if (typeof lesson.id === 'string') {
            const match = /^sentence:([^:]+):(\d+)$/.exec(lesson.id);
            if (match) {
                if (!bank) bank = match[1];
                if (stage === null || stage === undefined) stage = parseInt(match[2], 10);
            }
        }

        if (!bank) {
            const dialectId = this.state.currentDialect ? this.state.currentDialect.id : null;
            bank = sentenceBankFor(dialectId);
        }

        const stageNumber = typeof stage === 'number' ? stage : parseInt(stage, 10);
        if (!Number.isFinite(stageNumber)) return;

        if (!this.state.sentenceProgress) this.state.sentenceProgress = {};
        const done = this.state.sentenceProgress[bank] || [];
        if (!done.includes(stageNumber)) done.push(stageNumber);
        this.state.sentenceProgress[bank] = done;
        store.set('arabicLearn_sentenceProgress', JSON.stringify(this.state.sentenceProgress));
    }

    closeLesson() {
        this.clearTimers();
        this._locked = false;
        if (this.state.mode === 'test') {
            this.renderTestScreen();
            this.showScreen('testScreen');
            this.setNav('test');
        } else if (this.state.mode === 'roots') {
            this.renderRootsScreen();
        } else if (this.state.mode === 'sentence') {
            this.showHome();
        } else {
            this.showHome();
        }
    }

    // ---------- Word mastery ----------
    recordWordStat(word, isCorrect) {
        if (!word) return;
        const key = word.ar;
        const rec = this.state.wordStats[key] || { ar: word.ar, en: word.en, seen: 0, correct: 0 };
        rec.seen++;
        if (isCorrect) rec.correct++;
        rec.en = word.en;
        this.state.wordStats[key] = rec;
        store.set('arabicLearn_wordStats', JSON.stringify(this.state.wordStats));
    }

    // Words the learner has met. Weak words (low accuracy, or never seen in a
    // test) are weighted higher so a test keeps drilling what is shaky.
    learnedWords() {
        const dialectId = this.state.currentDialect ? this.state.currentDialect.id : null;
        const pool = [];
        const lessons = lessonData[dialectId] || [];
        const completed = this.state.completedLessons[dialectId] || [];
        lessons.forEach(u => {
            if (isUnitDone(completed, u)) pool.push(...u.words);
        });
        // Always include the dialect basics so a test is possible from day one.
        if (lessons[0]) pool.push(...lessons[0].words);
        // De-duplicate.
        const seen = new Set();
        return pool.filter(w => {
            if (seen.has(w.ar)) return false;
            seen.add(w.ar);
            return true;
        });
    }

    buildTestSet() {
        const pool = this.learnedWords();
        if (!pool.length) return [];
        const weighted = pool.map(w => {
            const rec = this.state.wordStats[w.ar];
            let weight = 1;
            if (rec && rec.seen > 0) {
                const acc = rec.correct / rec.seen;
                weight = 1 + (1 - acc) * 3; // weaker words come up more often
            } else {
                weight = 2; // never practised
            }
            return { w, weight };
        });

        const picked = [];
        const used = new Set();
        const n = Math.min(TEST_LENGTH, pool.length);
        let guard = 0;
        while (picked.length < n && guard < 5000) {
            guard++;
            const totalWeight = weighted.reduce((s, x) => s + (used.has(x.w.ar) ? 0 : x.weight), 0);
            if (totalWeight <= 0) break;
            let r = Math.random() * totalWeight;
            for (const x of weighted) {
                if (used.has(x.w.ar)) continue;
                r -= x.weight;
                if (r <= 0) {
                    picked.push(x.w);
                    used.add(x.w.ar);
                    break;
                }
            }
        }
        return picked;
    }

    // ---------- Root & Pattern ----------
    renderRootsScreen() {
        if (typeof ROOT_FAMILIES === 'undefined') {
            this.dom.patternList.innerHTML = '<p class="roots-empty">Root data failed to load.</p>';
            this.dom.familyList.innerHTML = '';
            this.dom.rootDrillBtn.disabled = true;
            this.showScreen('rootsScreen');
            this.setNav('roots');
            return;
        }
        this.renderPatternGuide();
        this.renderRootFamilies();
        this.dom.rootDrillBtn.disabled = this.rootDrillPool().length < 4;
        this.showScreen('rootsScreen');
        this.setNav('roots');
    }

    renderPatternGuide() {
        const list = this.dom.patternList;
        list.innerHTML = '';
        (typeof PATTERN_GUIDE !== 'undefined' ? PATTERN_GUIDE : []).forEach(p => {
            const row = document.createElement('div');
            row.className = 'pattern-row';
            row.innerHTML = `
                <span class="pattern-mould" dir="rtl">${p.pattern}</span>
                <span class="pattern-body">
                    <span class="pattern-role">${p.role}</span>
                    <span class="pattern-example">${p.example} · ${p.exampleEn}</span>
                </span>
            `;
            list.appendChild(row);
        });
    }

    renderRootFamilies() {
        const list = this.dom.familyList;
        list.innerHTML = '';
        ROOT_FAMILIES.forEach(family => {
            const card = document.createElement('div');
            card.className = 'family-card';
            const forms = family.forms.map(f => `
                <li class="form-row">
                    <button class="form-word" type="button" data-ar="${f.ar}" aria-label="Hear ${f.ar}">${f.ar}</button>
                    <span class="form-meta">
                        <span class="form-en">${f.en}</span>
                        <span class="form-pattern">${f.pattern}<span class="form-role"> · ${f.role}</span></span>
                    </span>
                </li>
            `).join('');
            card.innerHTML = `
                <div class="family-head">
                    <span class="family-root" dir="rtl">${family.root}</span>
                    <span class="family-meaning">${family.meaning}</span>
                </div>
                <ul class="form-list">${forms}</ul>
            `;
            card.querySelectorAll('.form-word').forEach(btn => {
                btn.addEventListener('click', () => this.speak(btn.dataset.ar));
            });
            list.appendChild(card);
        });
    }

    // Forms the learner has never met in this dialect make the best inference
    // questions: they have to use the root and pattern, not recall.
    rootDrillPool() {
        if (typeof ROOT_FORM_LIST === 'undefined') return [];
        const dialectId = this.state.currentDialect ? this.state.currentDialect.id : null;
        const known = new Set();
        (lessonData[dialectId] || []).forEach(unit => {
            unit.words.forEach(w => known.add(normArabic(w.ar)));
        });
        const unseen = ROOT_FORM_LIST.filter(w => !known.has(normArabic(w.ar)));
        return unseen.length >= 6 ? unseen : ROOT_FORM_LIST;
    }

    startRootDrill() {
        const pool = this.rootDrillPool();
        if (pool.length < 4) return;
        const words = this.shuffle(pool).slice(0, Math.min(ROOT_DRILL_LENGTH, pool.length));
        this.beginSession('roots', 'Root & Pattern', words, null, {
            showRoot: true,
            dirs: ['ar-en'],
            pool
        });
    }

    // ---------- Test screen ----------
    renderTestScreen() {
        const pool = this.learnedWords();
        const stats = Object.values(this.state.wordStats);
        const practised = stats.filter(s => s.seen > 0);
        const totalSeen = practised.reduce((s, r) => s + r.seen, 0);
        const totalCorrect = practised.reduce((s, r) => s + r.correct, 0);
        const acc = totalSeen ? Math.round((totalCorrect / totalSeen) * 100) : 0;

        this.dom.testWordsKnown.textContent = pool.length;
        this.dom.testAccuracy.textContent = acc + '%';
        this.dom.testPoolInfo.textContent = pool.length
            ? `${pool.length} words unlocked in this dialect. A test asks ${Math.min(TEST_LENGTH, pool.length)} questions, focusing on the words you get wrong.`
            : 'Finish a lesson first so there are words to test.';
        this.dom.testStartBtn.disabled = pool.length === 0;
    }

    startTest() {
        const words = this.buildTestSet();
        if (!words.length) return;
        this.beginSession('test', 'Test', words);
    }

    // ---------- Stats ----------
    addXp(amount) {
        this.state.xp += amount;
        store.set('arabicLearn_xp', String(this.state.xp));
        this.updateStats();
    }

    levelFromXp(xp) {
        return Math.floor(xp / 500) + 1;
    }

    updateStats() {
        this.dom.xpCount.textContent = this.state.xp;
        this.dom.streakCount.textContent = this.state.streak;

        const level = this.levelFromXp(this.state.xp);
        this.dom.userLevel.textContent = level;
        const pct = ((this.state.xp % 500) / 500) * 100;
        this.dom.xpBarFill.style.width = pct + '%';

        this.dom.profileXP.textContent = this.state.xp;
        this.dom.profileStreak.textContent = this.state.streak;
        this.dom.profileLevel.textContent = level;

        this.updateBadges();
    }

    updateBadges() {
        const totalLessons = Object.values(this.state.completedLessons).flat().length;
        const wordsKnown = Object.keys(this.state.wordStats).length;
        const rules = [totalLessons >= 5, wordsKnown >= 100, this.state.xp >= 1000];
        document.querySelectorAll('.badge-item').forEach((badge, i) => {
            badge.classList.toggle('locked', !rules[i]);
        });
    }

    // Streak: bump once per calendar day on first activity.
    updateLastActive() {
        const today = new Date().toDateString();
        if (this.state.lastActiveDate !== today) {
            const last = this.state.lastActiveDate ? new Date(this.state.lastActiveDate) : null;
            if (last) {
                const days = Math.round((new Date(today) - last) / 86400000);
                this.state.streak = days === 1 ? this.state.streak + 1 : 1;
            } else {
                this.state.streak = 1;
            }
            this.state.lastActiveDate = today;
            store.set('arabicLearn_streak', String(this.state.streak));
            store.set('arabicLearn_lastActive', today);
        }
    }

    renderDialectOptions() {
        const select = this.dom.dialectSelectProfile;
        select.innerHTML = '';
        dialects.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.id;
            opt.textContent = `${d.flag} ${d.nameEn}`;
            if (this.state.currentDialect && this.state.currentDialect.id === d.id) opt.selected = true;
            select.appendChild(opt);
        });
    }

    // ---------- Events ----------
    bindEvents() {
        this.dom.skipBtn.addEventListener('click', () => this.nextQuestion());
        this.dom.closeLesson.addEventListener('click', () => this.closeLesson());
        this.dom.testStartBtn.addEventListener('click', () => this.startTest());
        this.dom.rootDrillBtn.addEventListener('click', () => this.startRootDrill());

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.tab === 'profile') {
                    this.renderDialectOptions();
                    this.updateStats();
                    this.showScreen('profileScreen');
                    this.setNav('profile');
                } else if (btn.dataset.tab === 'test') {
                    this.renderTestScreen();
                    this.showScreen('testScreen');
                    this.setNav('test');
                } else if (btn.dataset.tab === 'roots') {
                    this.renderRootsScreen();
                } else {
                    this.showHome();
                }
            });
        });

        document.getElementById('backToOnboarding').addEventListener('click', () => {
            this.showScreen('onboardingScreen');
        });

        this.dom.dialectSelectProfile.addEventListener('change', e => {
            const dialect = dialects.find(d => d.id === e.target.value);
            if (dialect) this.selectDialect(dialect);
        });

        this.dom.resetProgressBtn.addEventListener('click', () => {
            if (confirm('Reset all progress? This cannot be undone.')) {
                store.clear();
                location.reload();
            }
        });

        document.addEventListener('keydown', e => {
            if (!this.dom.lessonScreen.classList.contains('active')) return;
            if (e.key === 'Enter') {
                if (this._locked) this.nextQuestion();
                return;
            }
            const n = parseInt(e.key, 10);
            if (n >= 1 && n <= 4) {
                const btn = document.querySelectorAll('.choice-btn:not(:disabled)')[n - 1];
                if (btn) btn.click();
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ArabicLearnApp());
} else {
    new ArabicLearnApp();
}
