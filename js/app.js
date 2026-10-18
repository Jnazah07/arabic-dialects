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

class ArabicLearnApp {
    constructor() {
        this.state = {
            currentDialect: store.json('arabicLearn_currentDialect', null),
            xp: parseInt(store.get('arabicLearn_xp', '0')) || 0,
            streak: parseInt(store.get('arabicLearn_streak', '0')) || 0,
            lastActiveDate: store.get('arabicLearn_lastActive', null),
            completedLessons: store.json('arabicLearn_completed', {}),
            wordStats: store.json('arabicLearn_wordStats', {}),
            mode: 'lesson',
            currentLesson: null,
            questions: [],
            currentQuestionIndex: 0,
            correctThisSession: 0,
            exercise: null,
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
            'dialectGrid', 'dialectSelectProfile', 'headerDialectName',
            'streakCount', 'xpCount', 'userLevel', 'xpBarFill', 'unitsList',
            'lessonProgressFill', 'currentQ', 'totalQ', 'questionArea',
            'feedbackArea', 'feedbackText', 'autoTimer', 'autoTimerFill',
            'skipBtn', 'closeLesson', 'lessonTitle', 'profileStreak', 'profileXP',
            'profileLevel', 'resetProgressBtn', 'bottomNav',
            'testWordsKnown', 'testAccuracy', 'testPoolInfo', 'testStartBtn'
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
        ['onboardingScreen', 'homeScreen', 'lessonScreen', 'profileScreen', 'testScreen'].forEach(id => {
            this.dom[id].classList.toggle('active', id === name);
        });
        const showNav = name === 'homeScreen' || name === 'profileScreen' || name === 'testScreen';
        this.dom.bottomNav.hidden = !showNav;
        document.body.classList.toggle('has-nav', showNav);
        window.scrollTo(0, 0);
    }

    showHome() {
        this.dom.headerDialectName.textContent =
            `${this.state.currentDialect.flag} ${this.state.currentDialect.nameEn}`;
        this.renderUnits();
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

    // ---------- Units ----------
    renderUnits() {
        const list = this.dom.unitsList;
        list.innerHTML = '';
        const dialectId = this.state.currentDialect.id;
        const lessons = lessonData[dialectId] || [];
        const completed = this.state.completedLessons[dialectId] || [];

        lessons.forEach((unit, index) => {
            const isCompleted = completed.includes(unit.id);
            const prevCompleted = index === 0 || completed.includes(lessons[index - 1].id);
            const isLocked = !isCompleted && !prevCompleted;

            const card = document.createElement('div');
            card.className = `unit-card${isLocked ? ' locked' : ''}${isCompleted ? ' completed' : ''}`;
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', isLocked ? '-1' : '0');
            card.setAttribute('aria-disabled', isLocked ? 'true' : 'false');

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

            if (!isLocked) {
                const activate = () => this.startLesson(unit);
                card.addEventListener('click', activate);
                card.addEventListener('keydown', e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        activate();
                    }
                });
            }

            list.appendChild(card);
        });
    }

    // ---------- Lesson engine ----------
    startLesson(unit) {
        this.beginSession('lesson', unit.title, unit.words, unit.id);
    }

    // unitId must survive into currentLesson: completeSession() reads it to mark
    // the unit done, which is what unlocks the next one. Tests pass no id.
    beginSession(mode, title, words, unitId = null) {
        this.state.mode = mode;
        this.state.currentLesson = { id: unitId, title, words };
        this.state.questions = this.buildQuestions(words);
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
    // so the learner cannot predict the order.
    buildQuestions(words) {
        const questions = [];
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

    buildExercise(word, dir) {
        const pool = allWords.filter(w => w.en !== word.en && w.ar !== word.ar);
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

        const q = this.state.questions[this.state.currentQuestionIndex];
        const total = this.state.questions.length;

        this.dom.currentQ.textContent = this.state.currentQuestionIndex + 1;
        this.dom.lessonProgressFill.style.width =
            (this.state.currentQuestionIndex / total) * 100 + '%';

        const exercise = this.buildExercise(q.word, q.dir);
        this.state.exercise = exercise;

        const area = this.dom.questionArea;
        area.innerHTML = `
            <p class="question-instruction">${exercise.instruction}</p>
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

        this.dom.feedbackText.textContent = '';
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

        // Auto-advance: short pause on a hit, longer on a miss so the
        // correct answer can be read.
        this.autoAdvance(isCorrect ? 900 : 1800, isCorrect);
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

        if (!isTest) {
            const dialectId = this.state.currentDialect.id;
            const unitId = this.state.currentLesson.id;
            if (unitId != null) {
                if (!this.state.completedLessons[dialectId]) this.state.completedLessons[dialectId] = [];
                if (!this.state.completedLessons[dialectId].includes(unitId)) {
                    this.state.completedLessons[dialectId].push(unitId);
                    this.addXp(50);
                }
                store.set('arabicLearn_completed', JSON.stringify(this.state.completedLessons));
            }
        }

        this.dom.lessonProgressFill.style.width = '100%';

        const title = isTest ? 'Test complete' : 'Lesson complete';
        const emoji = isTest ? '📊' : '🎉';

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
                <button class="btn btn-primary complete-btn" id="completeBtn">${isTest ? 'Back to test' : 'Back to lessons'}</button>
            </div>
        `;

        this.dom.feedbackText.textContent = '';
        this.dom.feedbackArea.className = 'feedback-area';
        this.dom.autoTimer.hidden = true;
        this.dom.skipBtn.hidden = true;

        document.getElementById('completeBtn').addEventListener('click', () => this.closeLesson());
    }

    closeLesson() {
        this.clearTimers();
        this._locked = false;
        if (this.state.mode === 'test') {
            this.renderTestScreen();
            this.showScreen('testScreen');
            this.setNav('test');
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
            if (completed.includes(u.id)) pool.push(...u.words);
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
