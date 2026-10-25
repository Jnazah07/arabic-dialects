// Sentence engine - dialect bank resolution and word-arrangement grading.
// Loaded as a plain <script> in the browser and via require() in Node tests.

const GENERAL_BANK = 'general';

// Pick the sentence bank a dialect reads from, falling back to the shared bank
// when the dialect has no entry of its own.
function resolveBank(dialectId, map) {
    if (map && Object.prototype.hasOwnProperty.call(map, dialectId)) {
        return map[dialectId];
    }
    return GENERAL_BANK;
}

// Grade a placed word order against the expected answer. The first index where
// the two arrays disagree is reported; a placement that is too short reports
// its own length, and an exact match reports -1.
function gradeArrangement(placed, answer) {
    const placedWords = placed || [];
    const answerWords = answer || [];
    const shared = Math.min(placedWords.length, answerWords.length);

    for (let i = 0; i < shared; i += 1) {
        if (placedWords[i] !== answerWords[i]) {
            return { correct: false, firstWrongIndex: i };
        }
    }

    if (placedWords.length !== answerWords.length) {
        return { correct: false, firstWrongIndex: shared };
    }

    return { correct: true, firstWrongIndex: -1 };
}

// Stable, bank-scoped id for a sentence stage. Two dialects that read the same
// bank resolve to the same key, which is what lets them share stage progress.
function sentenceKey(bank, stage) {
    return 'sentence:' + bank + ':' + stage;
}

// One saved completed-lesson entry -> the stable `unit:<key>` id the path uses.
// Strings that already look stable are kept, bare unit keys are upgraded, and a
// number is matched against the unit's recorded id first and its position
// second. An id with no unit behind it is preserved rather than dropped, so a
// course edit never silently erases progress.
function migrateUnitId(entry, units) {
    if (typeof entry === 'string' && entry.indexOf('unit:') === 0) return entry;
    if (entry === null || entry === undefined) return null;

    const numeric = typeof entry === 'number'
        ? entry
        : (typeof entry === 'string' && /^\d+$/.test(entry) ? parseInt(entry, 10) : null);

    if (numeric === null) {
        for (let i = 0; i < units.length; i += 1) {
            if (units[i] && units[i].key === entry) return 'unit:' + entry;
        }
        return String(entry);
    }

    for (let i = 0; i < units.length; i += 1) {
        const unit = units[i];
        if (unit && unit.id === numeric) return 'unit:' + unit.key;
    }

    const byPosition = units[numeric - 1];
    if (byPosition) return 'unit:' + byPosition.key;

    return 'unit:' + numeric;
}

// Convert saved progress from numeric unit ids to stable ids. Order is kept and
// duplicates collapse, so running this on already-migrated data changes nothing.
function migrateCompleted(raw, unitsByDialect) {
    const source = raw || {};
    const byDialect = unitsByDialect || {};
    const migrated = {};

    Object.keys(source).forEach(dialectId => {
        const entries = Array.isArray(source[dialectId]) ? source[dialectId] : [];
        const units = byDialect[dialectId] || [];
        const seen = {};
        const ids = [];

        for (let i = 0; i < entries.length; i += 1) {
            const id = migrateUnitId(entries[i], units);
            if (id === null || seen[id]) continue;
            seen[id] = true;
            ids.push(id);
        }

        migrated[dialectId] = ids;
    });

    return migrated;
}

// Build the ordered course path. Every unit appears once, in order, keyed by
// its stable id; a sentence stage follows the unit that anchors it. Anchors are
// listed in stage order, so anchors[0] carries stage 1, and only stages the
// bank has authored produce a node.
function buildPath(options) {
    options = options || {};
    const units = options.units || [];
    const bank = options.bank || GENERAL_BANK;
    const anchors = options.anchors || (typeof STAGE_ANCHORS !== 'undefined' ? STAGE_ANCHORS : []);
    const sentenceStages = options.sentenceStages || [];

    const authored = {};
    for (let i = 0; i < sentenceStages.length; i += 1) {
        authored[sentenceStages[i]] = true;
    }

    const path = [];
    for (let u = 0; u < units.length; u += 1) {
        const unit = units[u];
        path.push({ kind: 'unit', id: 'unit:' + unit.key, unit: unit });

        for (let a = 0; a < anchors.length; a += 1) {
            const stage = a + 1;
            if (anchors[a] !== unit.key || !authored[stage]) continue;
            path.push({ kind: 'sentence', id: sentenceKey(bank, stage), stage: stage, bank: bank });
        }
    }

    return path;
}

// A stage counts as done only for the bank it was played in. `sentenceProgress`
// is the saved `{ [bank]: number[] }` map, so two gulf dialects share stages and
// a learner on another bank starts its ladder from the top.
function isStageDone(sentenceProgress, bank, stage) {
    const done = sentenceProgress && sentenceProgress[bank];
    return Array.isArray(done) && done.indexOf(stage) !== -1;
}

// Whether a single path node is behind the learner. Unit nodes read the saved
// completed ids; sentence nodes read the bank's stage list. A sentence id in the
// completed list is accepted too, and so is a legacy numeric unit id, so a path
// built before or after the id migration answers the same way.
function isNodeCompleted(node, completedIds, sentenceProgress, fallbackBank) {
    if (!node) return false;

    const ids = completedIds || [];
    if (node.kind === 'sentence') {
        if (isStageDone(sentenceProgress, node.bank || fallbackBank, node.stage)) return true;
    } else if (node.unit && typeof node.unit.key === 'string'
        && ids.indexOf('unit:' + node.unit.key) !== -1) {
        return true;
    } else if (node.unit && node.unit.id !== undefined && ids.indexOf(node.unit.id) !== -1) {
        return true;
    }

    return ids.indexOf(node.id) !== -1;
}

// Unlock rules for the mixed path. The first node is always open. Every other
// node waits for the node before it, which is what keeps units and sentence
// stages interleaved instead of letting a learner jump the queue. A sentence node
// waits on one more thing: the stage before it in the same bank, so stage 3
// cannot be played while stage 2 is unfinished even when every unit is done.
function isUnlocked(path, index, completedIds, bank, sentenceProgress) {
    const nodes = path || [];
    if (!Number.isInteger(index) || index < 0 || index >= nodes.length) return false;
    if (index === 0) return true;

    const node = nodes[index];
    if (!isNodeCompleted(nodes[index - 1], completedIds, sentenceProgress, bank)) return false;

    if (node.kind !== 'sentence') return true;

    const stage = node.stage;
    if (!Number.isFinite(stage) || stage <= 1) return true;

    return isStageDone(sentenceProgress, node.bank || bank, stage - 1);
}

// Copy-and-shuffle for the tray. Duplicates are kept, so a sentence that says
// a word twice needs two taps: the tray is a multiset, never a set.
function shuffleTiles(tiles) {
    const shuffled = tiles.slice();
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const swap = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = swap;
    }
    return shuffled;
}

// One tile-building question per sentence in a stage. The answer order lives on
// `sentence.tiles` and is never touched, so grading has a reference; the tray
// gets its own shuffled copy to keep the layout unrelated to the solution.
function buildSentenceQuestions(stageSentences) {
    const sentences = Array.isArray(stageSentences) ? stageSentences : [];

    return sentences
        .filter(sentence => sentence && Array.isArray(sentence.tiles))
        .map(sentence => ({
            kind: 'build',
            sentence: sentence,
            tiles: shuffleTiles(sentence.tiles)
        }));
}

// Normalise an Arabic spelling the same way data/roots.js does, with a local
// fallback so the engine works in Node without loading the roots script first.
function normalizeToken(value) {
    if (typeof normArabic === 'function') return normArabic(value);
    return String(value || '')
        .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, '')
        .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
        .replace(/\u0649/g, '\u064A')
        .replace(/\u0629/g, '\u0647')
        .replace(/\s+/g, ' ')
        .trim();
}

// Resolve a tile to the form record that carries its root and pattern. The flat
// ROOT_FORM_LIST is the source; WORD_MORPHOLOGY is the browser-side fallback so
// a token still shows its root even if the pool was not passed in.
function findMorphForm(token, patternPool) {
    if (!token) return null;
    const key = normalizeToken(token);
    const pool = Array.isArray(patternPool)
        ? patternPool
        : (typeof ROOT_FORM_LIST !== 'undefined' ? ROOT_FORM_LIST : []);

    for (let i = 0; i < pool.length; i += 1) {
        const form = pool[i];
        if (!form || !form.pattern) continue;
        if (normalizeToken(form.ar) !== key) continue;
        return {
            ar: token,
            en: form.en || '',
            root: form.root,
            rootMeaning: form.rootMeaning || '',
            pattern: form.pattern,
            patternLatin: form.patternLatin || '',
            patternRole: form.patternRole || form.role || ''
        };
    }

    if (typeof WORD_MORPHOLOGY !== 'undefined' && WORD_MORPHOLOGY) {
        const m = WORD_MORPHOLOGY[key];
        if (m) {
            return {
                ar: token,
                en: '',
                root: m.root,
                rootMeaning: m.rootMeaning || '',
                pattern: m.pattern,
                patternLatin: m.patternLatin || '',
                patternRole: m.role || ''
            };
        }
    }

    return null;
}

// One pattern question for a sentence that contains a word we can analyse. The
// answer is the token's own pattern; the three distractors are other patterns
// drawn from the same pool, so every choice is a mould the course knows.
function buildRootMoment(sentence, patternPool) {
    if (!sentence || !Array.isArray(sentence.tiles)) return null;

    const pool = Array.isArray(patternPool)
        ? patternPool
        : (typeof ROOT_FORM_LIST !== 'undefined' ? ROOT_FORM_LIST : []);
    let word = null;
    for (let i = 0; i < sentence.tiles.length; i += 1) {
        const form = findMorphForm(sentence.tiles[i], pool);
        if (form && form.pattern) {
            word = form;
            break;
        }
    }
    if (!word) return null;

    const seen = {};
    const patterns = [];
    for (let i = 0; i < pool.length; i += 1) {
        // The pool is normally ROOT_FORM_LIST (form records), but accepting a
        // bare list of pattern strings costs nothing and keeps the function
        // usable as a pure pattern source.
        const entry = pool[i];
        const pattern = typeof entry === 'string' ? entry : (entry && entry.pattern);
        if (!pattern || seen[pattern]) continue;
        seen[pattern] = true;
        patterns.push(pattern);
    }
    if (!seen[word.pattern]) patterns.push(word.pattern);

    const distractors = shuffleTiles(patterns.filter(p => p !== word.pattern)).slice(0, 3);
    const options = shuffleTiles([word.pattern].concat(distractors));

    return {
        word: word,
        root: word.root,
        pattern: word.pattern,
        options: options,
        answer: word.pattern
    };
}

const SentenceEngine = {
    resolveBank,
    gradeArrangement,
    buildPath,
    migrateCompleted,
    sentenceKey,
    isUnlocked,
    buildSentenceQuestions,
    findMorphForm,
    buildRootMoment
};
if (typeof module !== 'undefined') module.exports = SentenceEngine;
