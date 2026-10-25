// Sentence data schema, Gulf stage 1, and coverage validator.
// Loaded as a plain <script> in the browser and via require() in Node tests.

const STAGE_ANCHORS = ['family', 'numbers2', 'clothes', 'work', 'adjectives2', 'hobbies'];

const DIALECT_BANK = {
    emirati: 'gulf',
    saudi: 'gulf',
    omani: 'gulf',
    yemeni: 'gulf',
    kuwaiti: 'gulf',
    qatari: 'gulf',
    bahraini: 'gulf',
    mali: 'general',
    niger: 'general',
    senegal: 'general',
    iraqi: 'general',
    jordanian: 'levantine',
    lebanese: 'levantine',
    palestinian: 'levantine',
    syrian: 'levantine',
    algerian: 'maghrebi',
    egyptian: 'egyptian',
    libyan: 'maghrebi',
    mauritanian: 'maghrebi',
    moroccan: 'maghrebi',
    sudanese: 'general',
    tunisian: 'maghrebi',
    comorian: 'general',
    djiboutian: 'general',
    somalian: 'general'
};

const DIALECT_SWAPS = {};

const SENTENCE_BANKS = {
    gulf: [
        {
            id: 'gulf-s1-01',
            stage: 1,
            ar: 'أنا زين',
            en: 'I am fine',
            tr: 'ana zayn',
            tiles: ['أنا', 'زين'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s1-02',
            stage: 1,
            ar: 'أنا تعب',
            en: 'I am tired',
            tr: 'ana ta3ab',
            tiles: ['أنا', 'تعب'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'تعب', en: 'tired', kind: 'new' }
            ],
            roots: [{ ar: 'تعب' }]
        },
        {
            id: 'gulf-s1-03',
            stage: 1,
            ar: 'أنت زين',
            en: 'You are fine',
            tr: 'anta zayn',
            tiles: ['أنت', 'زين'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s1-04',
            stage: 1,
            ar: 'أنت تعب',
            en: 'You are tired',
            tr: 'anta ta3ab',
            tiles: ['أنت', 'تعب'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'تعب', en: 'tired', kind: 'new' }
            ],
            roots: [{ ar: 'تعب' }]
        },
        {
            id: 'gulf-s1-05',
            stage: 1,
            ar: 'هو زين',
            en: 'He is fine',
            tr: 'huwa zayn',
            tiles: ['هو', 'زين'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s1-06',
            stage: 1,
            ar: 'هي زين',
            en: 'She is fine',
            tr: 'hiya zayn',
            tiles: ['هي', 'زين'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s1-07',
            stage: 1,
            ar: 'أنا جوعان',
            en: 'I am hungry',
            tr: 'ana jo3an',
            tiles: ['أنا', 'جوعان'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'gulf-s1-08',
            stage: 1,
            ar: 'هو جوعان',
            en: 'He is hungry',
            tr: 'huwa jo3an',
            tiles: ['هو', 'جوعان'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'gulf-s1-09',
            stage: 1,
            ar: 'هو كاتب',
            en: 'He is a writer',
            tr: 'huwa kaatib',
            tiles: ['هو', 'كاتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'gulf-s2-01',
            stage: 2,
            ar: 'أنا درس',
            en: 'I study',
            tr: 'ana dars',
            tiles: ['أنا', 'درس'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'درس', en: 'lesson/study', kind: 'new' }
            ],
            roots: [{ ar: 'درس' }]
        },
        {
            id: 'gulf-s3-01',
            stage: 3,
            ar: 'هو كتاب',
            en: 'He has a book',
            tr: 'huwa kitab',
            tiles: ['هو', 'كتاب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كتاب', en: 'book', kind: 'new' }
            ],
            roots: [{ ar: 'كتاب' }]
        },
        {
            id: 'gulf-s4-01',
            stage: 4,
            ar: 'أنت مدرس',
            en: 'You are a teacher',
            tr: 'anta mudarris',
            tiles: ['أنت', 'مدرس'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s5-01',
            stage: 5,
            ar: 'هو كبير',
            en: 'He is big',
            tr: 'huwa kabir',
            tiles: ['هو', 'كبير'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كبير', en: 'big', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        },
        {
            id: 'gulf-s6-01',
            stage: 6,
            ar: 'أنا عالم',
            en: 'I am a scholar',
            tr: 'ana alim',
            tiles: ['أنا', 'عالم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'عالم', en: 'scholar', kind: 'new' }
            ],
            roots: [{ ar: 'عالم' }]
        }
,
        {
            id: 'gulf-s2-02',
            stage: 2,
            ar: 'أنا زين اليوم',
            en: 'I am fine today',
            tr: 'ana zayn al-yawm',
            tiles: ['أنا', 'زين', 'اليوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s2-03',
            stage: 2,
            ar: 'أنت تعب اليوم',
            en: 'You are tired today',
            tr: 'anta ta3ab al-yawm',
            tiles: ['أنت', 'تعب', 'اليوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'تعب', en: 'tired', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'تعب' }]
        },
        {
            id: 'gulf-s2-04',
            stage: 2,
            ar: 'هو زين دوم',
            en: 'He is always fine',
            tr: 'huwa zayn dawm',
            tiles: ['هو', 'زين', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s2-05',
            stage: 2,
            ar: 'هي جوعان اليوم',
            en: 'She is hungry today',
            tr: 'hiya jo3an al-yawm',
            tiles: ['هي', 'جوعان', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'gulf-s2-06',
            stage: 2,
            ar: 'أنا مدرس اليوم',
            en: 'I am a teacher today',
            tr: 'ana mudarris al-yawm',
            tiles: ['أنا', 'مدرس', 'اليوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s2-07',
            stage: 2,
            ar: 'هو كاتب دوم',
            en: 'He is always a writer',
            tr: 'huwa kaatib dawm',
            tiles: ['هو', 'كاتب', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'gulf-s2-08',
            stage: 2,
            ar: 'أنت زين دوم',
            en: 'You are always fine',
            tr: 'anta zayn dawm',
            tiles: ['أنت', 'زين', 'دوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s3-02',
            stage: 3,
            ar: 'هو كتاب كبير',
            en: 'He has a big book',
            tr: 'huwa kitab kabir',
            tiles: ['هو', 'كتاب', 'كبير'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كتاب', en: 'book', kind: 'new' },
                { ar: 'كبير', en: 'big', kind: 'new' }
            ],
            roots: [{ ar: 'كتاب' }, { ar: 'كبير' }]
        },
        {
            id: 'gulf-s3-03',
            stage: 3,
            ar: 'أنا مدرس جيد',
            en: 'I am a good teacher',
            tr: 'ana mudarris jayyid',
            tiles: ['أنا', 'مدرس', 'جيد'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'جيد', en: 'good', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s3-04',
            stage: 3,
            ar: 'أنت كاتب مشهور',
            en: 'You are a famous writer',
            tr: 'anta kaatib mashhoor',
            tiles: ['أنت', 'كاتب', 'مشهور'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'gulf-s3-05',
            stage: 3,
            ar: 'هي جوعان اليوم',
            en: 'She is hungry today',
            tr: 'hiya jo3an al-yawm',
            tiles: ['هي', 'جوعان', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'gulf-s3-06',
            stage: 3,
            ar: 'هو تعب اليوم',
            en: 'He is tired today',
            tr: 'huwa ta3ab al-yawm',
            tiles: ['هو', 'تعب', 'اليوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعب', en: 'tired', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'تعب' }]
        },
        {
            id: 'gulf-s3-07',
            stage: 3,
            ar: 'أنا زين دوم',
            en: 'I am always fine',
            tr: 'ana zayn dawm',
            tiles: ['أنا', 'زين', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s3-08',
            stage: 3,
            ar: 'أنت زين دوم',
            en: 'You are always fine',
            tr: 'anta zayn dawm',
            tiles: ['أنت', 'زين', 'دوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s4-02',
            stage: 4,
            ar: 'أنا مدرس في المدرسة',
            en: 'I teach at the school',
            tr: 'ana mudarris fi al-madrasa',
            tiles: ['أنا', 'مدرس', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s4-03',
            stage: 4,
            ar: 'هو كاتب في المكتب',
            en: 'He writes at the office',
            tr: 'huwa kaatib fi al-maktab',
            tiles: ['هو', 'كاتب', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'gulf-s4-04',
            stage: 4,
            ar: 'أنت مدرس جيد اليوم',
            en: 'You are a good teacher today',
            tr: 'anta mudarris jayyid al-yawm',
            tiles: ['أنت', 'مدرس', 'جيد', 'اليوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'جيد', en: 'good', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s4-05',
            stage: 4,
            ar: 'هي كاتب مشهور',
            en: 'She is a famous writer',
            tr: 'hiya kaatiba mashhoora',
            tiles: ['هي', 'كاتب', 'مشهور'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'gulf-s4-06',
            stage: 4,
            ar: 'هو كبير وذكي',
            en: 'He is big and smart',
            tr: 'huwa kabir wa dhaki',
            tiles: ['هو', 'كبير', 'وذكي'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كبير', en: 'big', kind: 'new' },
                { ar: 'وذكي', en: 'and smart', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        },
        {
            id: 'gulf-s4-07',
            stage: 4,
            ar: 'أنا زين دوم',
            en: 'I am always fine',
            tr: 'ana zayn dawm',
            tiles: ['أنا', 'زين', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s4-08',
            stage: 4,
            ar: 'أنت تعب اليوم',
            en: 'You are tired today',
            tr: 'anta ta3ab al-yawm',
            tiles: ['أنت', 'تعب', 'اليوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'تعب', en: 'tired', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'تعب' }]
        },
        {
            id: 'gulf-s5-02',
            stage: 5,
            ar: 'أنا مدرس في المدرسة دوم',
            en: 'I always teach at the school',
            tr: 'ana mudarris fi al-madrasa dawm',
            tiles: ['أنا', 'مدرس', 'في', 'المدرسة', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s5-03',
            stage: 5,
            ar: 'هو كاتب مشهور في المكتب',
            en: 'He is a famous writer at the office',
            tr: 'huwa kaatib mashhoor fi al-maktab',
            tiles: ['هو', 'كاتب', 'مشهور', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'gulf-s5-04',
            stage: 5,
            ar: 'أنا زين دوم في البيت',
            en: 'I am always fine at home',
            tr: 'ana zayn dawm fi al-bayt',
            tiles: ['أنا', 'زين', 'دوم', 'في', 'البيت'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s5-05',
            stage: 5,
            ar: 'أنت مدرس جيد دوم',
            en: 'You are always a good teacher',
            tr: 'anta mudarris jayyid dawm',
            tiles: ['أنت', 'مدرس', 'جيد', 'دوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'جيد', en: 'good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s5-06',
            stage: 5,
            ar: 'هي جوعان اليوم في البيت',
            en: 'She is hungry today at home',
            tr: 'hiya jo3an al-yawm fi al-bayt',
            tiles: ['هي', 'جوعان', 'اليوم', 'في', 'البيت'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'gulf-s5-07',
            stage: 5,
            ar: 'هو تعب اليوم في المكتب',
            en: 'He is tired today at the office',
            tr: 'huwa ta3ab al-yawm fi al-maktab',
            tiles: ['هو', 'تعب', 'اليوم', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعب', en: 'tired', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'تعب' }]
        },
        {
            id: 'gulf-s5-08',
            stage: 5,
            ar: 'أنا كبير وذكي',
            en: 'I am big and smart',
            tr: 'ana kabir wa dhaki',
            tiles: ['أنا', 'كبير', 'وذكي'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'كبير', en: 'big', kind: 'new' },
                { ar: 'وذكي', en: 'and smart', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        },
        {
            id: 'gulf-s6-02',
            stage: 6,
            ar: 'أنا مدرس جيد في المدرسة دوم',
            en: 'I am always a good teacher at the school',
            tr: 'ana mudarris jayyid fi al-madrasa dawm',
            tiles: ['أنا', 'مدرس', 'جيد', 'في', 'المدرسة', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'جيد', en: 'good', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s6-03',
            stage: 6,
            ar: 'هو كاتب مشهور في المكتب دوم',
            en: 'He is always a famous writer at the office',
            tr: 'huwa kaatib mashhoor fi al-maktab dawm',
            tiles: ['هو', 'كاتب', 'مشهور', 'في', 'المكتب', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'gulf-s6-04',
            stage: 6,
            ar: 'أنا زين دوم في البيت اليوم',
            en: 'I am always fine at home today',
            tr: 'ana zayn dawm fi al-bayt al-yawm',
            tiles: ['أنا', 'زين', 'دوم', 'في', 'البيت', 'اليوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'gulf-s6-05',
            stage: 6,
            ar: 'أنت مدرس جيد دوم في المدرسة',
            en: 'You are always a good teacher at the school',
            tr: 'anta mudarris jayyid dawm fi al-madrasa',
            tiles: ['أنت', 'مدرس', 'جيد', 'دوم', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'جيد', en: 'good', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'gulf-s6-06',
            stage: 6,
            ar: 'هي جوعان اليوم في البيت دوم',
            en: 'She is always hungry today at home',
            tr: 'hiya jo3an al-yawm fi al-bayt dawm',
            tiles: ['هي', 'جوعان', 'اليوم', 'في', 'البيت', 'دوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'gulf-s6-07',
            stage: 6,
            ar: 'هو تعب اليوم في المكتب دوم',
            en: 'He is always tired today at the office',
            tr: 'huwa ta3ab al-yawm fi al-maktab dawm',
            tiles: ['هو', 'تعب', 'اليوم', 'في', 'المكتب', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعب', en: 'tired', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'تعب' }]
        },
        {
            id: 'gulf-s6-08',
            stage: 6,
            ar: 'أنا كبير وذكي دوم',
            en: 'I am always big and smart',
            tr: 'ana kabir wa dhaki dawm',
            tiles: ['أنا', 'كبير', 'وذكي', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'كبير', en: 'big', kind: 'new' },
                { ar: 'وذكي', en: 'and smart', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        }
    ],
    levantine: [
        {
            id: 'levantine-s1-01',
            stage: 1,
            ar: 'أنا بخير',
            en: 'I am fine',
            tr: 'ana bikhayr',
            tiles: ['أنا', 'بخير'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s1-02',
            stage: 1,
            ar: 'أنا تعبان',
            en: 'I am tired',
            tr: 'ana ta3ban',
            tiles: ['أنا', 'تعبان'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'levantine-s1-03',
            stage: 1,
            ar: 'أنت منيح',
            en: 'You are good',
            tr: 'anta mnih',
            tiles: ['أنت', 'منيح'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s1-04',
            stage: 1,
            ar: 'هو منيح',
            en: 'He is good',
            tr: 'huwa mnih',
            tiles: ['هو', 'منيح'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s1-05',
            stage: 1,
            ar: 'هي تعبانة',
            en: 'She is tired',
            tr: 'hiya ta3bana',
            tiles: ['هي', 'تعبانة'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'تعبانة', en: 'tired (f)', kind: 'new' }
            ],
            roots: [{ ar: 'تعبانة' }]
        },
        {
            id: 'levantine-s1-06',
            stage: 1,
            ar: 'أنا جوعان',
            en: 'I am hungry',
            tr: 'ana jo3an',
            tiles: ['أنا', 'جوعان'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'levantine-s1-07',
            stage: 1,
            ar: 'هو جوعان',
            en: 'He is hungry',
            tr: 'huwa jo3an',
            tiles: ['هو', 'جوعان'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'levantine-s1-08',
            stage: 1,
            ar: 'هو كاتب',
            en: 'He is a writer',
            tr: 'huwa kaatib',
            tiles: ['هو', 'كاتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'levantine-s2-01',
            stage: 2,
            ar: 'أنا بدي ماء',
            en: 'I want water',
            tr: 'ana bidi maa',
            tiles: ['أنا', 'بدي', 'ماء'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بدي', en: 'I want', kind: 'new' },
                { ar: 'ماء', en: 'water', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s2-02',
            stage: 2,
            ar: 'أنت بدي قهوة',
            en: 'You want coffee',
            tr: 'anta bidi qahwa',
            tiles: ['أنت', 'بدي', 'قهوة'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بدي', en: 'I want', kind: 'new' },
                { ar: 'قهوة', en: 'coffee', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s2-03',
            stage: 2,
            ar: 'هو بدي بيت',
            en: 'He wants a house',
            tr: 'huwa bidi bayt',
            tiles: ['هو', 'بدي', 'بيت'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'بدي', en: 'I want', kind: 'new' },
                { ar: 'بيت', en: 'house', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s2-04',
            stage: 2,
            ar: 'أنا جوعان اليوم',
            en: 'I am hungry today',
            tr: 'ana jo3an al-yawm',
            tiles: ['أنا', 'جوعان', 'اليوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'levantine-s2-05',
            stage: 2,
            ar: 'هي تعبانة اليوم',
            en: 'She is tired today',
            tr: 'hiya ta3bana al-yawm',
            tiles: ['هي', 'تعبانة', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'تعبانة', en: 'tired (f)', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'تعبانة' }]
        },
        {
            id: 'levantine-s2-06',
            stage: 2,
            ar: 'هو منيح دوم',
            en: 'He is always good',
            tr: 'huwa mnih dawm',
            tiles: ['هو', 'منيح', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s2-07',
            stage: 2,
            ar: 'أنت زين هلق',
            en: 'You are fine now',
            tr: 'anta zayn halag',
            tiles: ['أنت', 'زين', 'هلق'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'زين', en: 'fine/good', kind: 'new' },
                { ar: 'هلق', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s2-08',
            stage: 2,
            ar: 'أنا بخير هلق',
            en: 'I am fine now',
            tr: 'ana bikhayr halag',
            tiles: ['أنا', 'بخير', 'هلق'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'هلق', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s3-01',
            stage: 3,
            ar: 'هو كتاب كبير',
            en: 'He has a big book',
            tr: 'huwa kitab kabir',
            tiles: ['هو', 'كتاب', 'كبير'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كتاب', en: 'book', kind: 'new' },
                { ar: 'كبير', en: 'big', kind: 'new' }
            ],
            roots: [{ ar: 'كتاب' }, { ar: 'كبير' }]
        },
        {
            id: 'levantine-s3-02',
            stage: 3,
            ar: 'أنا مدرس في المدرسة',
            en: 'I teach at the school',
            tr: 'ana mudarris fi al-madrasa',
            tiles: ['أنا', 'مدرس', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'levantine-s3-03',
            stage: 3,
            ar: 'أنت كاتب مشهور',
            en: 'You are a famous writer',
            tr: 'anta kaatib mashhoor',
            tiles: ['أنت', 'كاتب', 'مشهور'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'levantine-s3-04',
            stage: 3,
            ar: 'هي جوعانة اليوم',
            en: 'She is hungry today',
            tr: 'hiya jo3ana al-yawm',
            tiles: ['هي', 'جوعانة', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعانة', en: 'hungry (f)', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعانة' }]
        },
        {
            id: 'levantine-s3-05',
            stage: 3,
            ar: 'هو تعبان هلق',
            en: 'He is tired now',
            tr: 'huwa ta3ban halag',
            tiles: ['هو', 'تعبان', 'هلق'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'هلق', en: 'now', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'levantine-s3-06',
            stage: 3,
            ar: 'أنا بخير دوم',
            en: 'I am always fine',
            tr: 'ana bikhayr dawm',
            tiles: ['أنا', 'بخير', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s3-07',
            stage: 3,
            ar: 'أنت منيح هلق',
            en: 'You are good now',
            tr: 'anta mnih halag',
            tiles: ['أنت', 'منيح', 'هلق'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' },
                { ar: 'هلق', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s3-08',
            stage: 3,
            ar: 'هي منيح دوم',
            en: 'She is always good',
            tr: 'hiya mnih dawm',
            tiles: ['هي', 'منيح', 'دوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s4-01',
            stage: 4,
            ar: 'هو كاتب في المكتب',
            en: 'He writes at the office',
            tr: 'huwa kaatib fi al-maktab',
            tiles: ['هو', 'كاتب', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'levantine-s4-02',
            stage: 4,
            ar: 'أنا مدرس في المدرسة',
            en: 'I teach at the school',
            tr: 'ana mudarris fi al-madrasa',
            tiles: ['أنا', 'مدرس', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'levantine-s4-03',
            stage: 4,
            ar: 'أنت بدي قهوة هلق',
            en: 'You want coffee now',
            tr: 'anta bidi qahwa halag',
            tiles: ['أنت', 'بدي', 'قهوة', 'هلق'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بدي', en: 'I want', kind: 'new' },
                { ar: 'قهوة', en: 'coffee', kind: 'new' },
                { ar: 'هلق', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s4-04',
            stage: 4,
            ar: 'هي منيح دوم في البيت',
            en: 'She is always good at home',
            tr: 'hiya mnih dawm fi al-bayt',
            tiles: ['هي', 'منيح', 'دوم', 'في', 'البيت'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s4-05',
            stage: 4,
            ar: 'هو تعبان اليوم في العمل',
            en: 'He is tired today at work',
            tr: 'huwa ta3ban al-yawm fi al-3amal',
            tiles: ['هو', 'تعبان', 'اليوم', 'في', 'العمل'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'العمل', en: 'the work', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'levantine-s4-06',
            stage: 4,
            ar: 'أنا جوعان في البيت',
            en: 'I am hungry at home',
            tr: 'ana jo3an fi al-bayt',
            tiles: ['أنا', 'جوعان', 'في', 'البيت'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'levantine-s4-07',
            stage: 4,
            ar: 'أنت كاتب مشهور',
            en: 'You are a famous writer',
            tr: 'anta kaatib mashhoor',
            tiles: ['أنت', 'كاتب', 'مشهور'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'levantine-s4-08',
            stage: 4,
            ar: 'هي منيح دوم',
            en: 'She is always good',
            tr: 'hiya mnih dawm',
            tiles: ['هي', 'منيح', 'دوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s5-01',
            stage: 5,
            ar: 'أنا بدي بيت كبير',
            en: 'I want a big house',
            tr: 'ana bidi bayt kabir',
            tiles: ['أنا', 'بدي', 'بيت', 'كبير'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بدي', en: 'I want', kind: 'new' },
                { ar: 'بيت', en: 'house', kind: 'new' },
                { ar: 'كبير', en: 'big', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        },
        {
            id: 'levantine-s5-02',
            stage: 5,
            ar: 'هو مدرس في المدرسة دوم',
            en: 'He always teaches at the school',
            tr: 'huwa mudarris fi al-madrasa dawm',
            tiles: ['هو', 'مدرس', 'في', 'المدرسة', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'levantine-s5-03',
            stage: 5,
            ar: 'أنت بدي قهوة هلق',
            en: 'You want coffee now',
            tr: 'anta bidi qahwa halag',
            tiles: ['أنت', 'بدي', 'قهوة', 'هلق'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بدي', en: 'I want', kind: 'new' },
                { ar: 'قهوة', en: 'coffee', kind: 'new' },
                { ar: 'هلق', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s5-04',
            stage: 5,
            ar: 'هي جوعانة في البيت اليوم',
            en: 'She is hungry at home today',
            tr: 'hiya jo3ana fi al-bayt al-yawm',
            tiles: ['هي', 'جوعانة', 'في', 'البيت', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعانة', en: 'hungry (f)', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعانة' }]
        },
        {
            id: 'levantine-s5-05',
            stage: 5,
            ar: 'هو تعبان دوم في العمل',
            en: 'He is always tired at work',
            tr: 'huwa ta3ban dawm fi al-3amal',
            tiles: ['هو', 'تعبان', 'دوم', 'في', 'العمل'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'العمل', en: 'the work', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'levantine-s5-06',
            stage: 5,
            ar: 'أنا بخير دوم في البيت',
            en: 'I am always fine at home',
            tr: 'ana bikhayr dawm fi al-bayt',
            tiles: ['أنا', 'بخير', 'دوم', 'في', 'البيت'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s5-07',
            stage: 5,
            ar: 'أنت منيح دوم في المدرسة',
            en: 'You are always good at the school',
            tr: 'anta mnih dawm fi al-madrasa',
            tiles: ['أنت', 'منيح', 'دوم', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s5-08',
            stage: 5,
            ar: 'هو كاتب مشهور في المكتب',
            en: 'He is a famous writer at the office',
            tr: 'huwa kaatib mashhoor fi al-maktab',
            tiles: ['هو', 'كاتب', 'مشهور', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'levantine-s6-01',
            stage: 6,
            ar: 'أنا بدي بيت كبير في المدينة',
            en: 'I want a big house in the city',
            tr: 'ana bidi bayt kabir fi al-madina',
            tiles: ['أنا', 'بدي', 'بيت', 'كبير', 'في', 'المدينة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بدي', en: 'I want', kind: 'new' },
                { ar: 'بيت', en: 'house', kind: 'new' },
                { ar: 'كبير', en: 'big', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدينة', en: 'the city', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        },
        {
            id: 'levantine-s6-02',
            stage: 6,
            ar: 'هو مدرس جيد في المدرسة دوم',
            en: 'He is always a good teacher at the school',
            tr: 'huwa mudarris jayyid fi al-madrasa dawm',
            tiles: ['هو', 'مدرس', 'جيد', 'في', 'المدرسة', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'جيد', en: 'good', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'levantine-s6-03',
            stage: 6,
            ar: 'أنت كاتب مشهور في المكتب دوم',
            en: 'You are always a famous writer at the office',
            tr: 'anta kaatib mashhoor fi al-maktab dawm',
            tiles: ['أنت', 'كاتب', 'مشهور', 'في', 'المكتب', 'دوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'levantine-s6-04',
            stage: 6,
            ar: 'هي جوعانة في البيت اليوم دوم',
            en: 'She is always hungry at home today',
            tr: 'hiya jo3ana fi al-bayt al-yawm dawm',
            tiles: ['هي', 'جوعانة', 'في', 'البيت', 'اليوم', 'دوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعانة', en: 'hungry (f)', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'جوعانة' }]
        },
        {
            id: 'levantine-s6-05',
            stage: 6,
            ar: 'هو تعبان دوم في العمل اليوم',
            en: 'He is always tired at work today',
            tr: 'huwa ta3ban dawm fi al-3amal al-yawm',
            tiles: ['هو', 'تعبان', 'دوم', 'في', 'العمل', 'اليوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'العمل', en: 'the work', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'levantine-s6-06',
            stage: 6,
            ar: 'أنا بخير دوم في البيت اليوم',
            en: 'I am always fine at home today',
            tr: 'ana bikhayr dawm fi al-bayt al-yawm',
            tiles: ['أنا', 'بخير', 'دوم', 'في', 'البيت', 'اليوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s6-07',
            stage: 6,
            ar: 'أنت منيح دوم في المدرسة اليوم',
            en: 'You are always good at the school today',
            tr: 'anta mnih dawm fi al-madrasa al-yawm',
            tiles: ['أنت', 'منيح', 'دوم', 'في', 'المدرسة', 'اليوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'منيح', en: 'good/fine', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'levantine-s6-08',
            stage: 6,
            ar: 'هو كاتب مشهور دوم في المكتب',
            en: 'He is always a famous writer at the office',
            tr: 'huwa kaatib mashhoor dawm fi al-maktab',
            tiles: ['هو', 'كاتب', 'مشهور', 'دوم', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        }
    ],
    egyptian: [],
    maghrebi: [],
    general: [
        {
            id: 'general-s1-01',
            stage: 1,
            ar: 'أنا بخير',
            en: 'I am fine',
            tr: 'ana bikhayr',
            tiles: ['أنا', 'بخير'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s1-02',
            stage: 1,
            ar: 'أنا تعبان',
            en: 'I am tired',
            tr: 'ana ta3ban',
            tiles: ['أنا', 'تعبان'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'general-s1-03',
            stage: 1,
            ar: 'أنت بخير',
            en: 'You are fine',
            tr: 'anta bikhayr',
            tiles: ['أنت', 'بخير'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s1-04',
            stage: 1,
            ar: 'هو بخير',
            en: 'He is fine',
            tr: 'huwa bikhayr',
            tiles: ['هو', 'بخير'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s1-05',
            stage: 1,
            ar: 'هي تعبانة',
            en: 'She is tired',
            tr: 'hiya ta3bana',
            tiles: ['هي', 'تعبانة'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'تعبانة', en: 'tired (f)', kind: 'new' }
            ],
            roots: [{ ar: 'تعبانة' }]
        },
        {
            id: 'general-s1-06',
            stage: 1,
            ar: 'أنا جوعان',
            en: 'I am hungry',
            tr: 'ana jo3an',
            tiles: ['أنا', 'جوعان'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'general-s1-07',
            stage: 1,
            ar: 'هو جوعان',
            en: 'He is hungry',
            tr: 'huwa jo3an',
            tiles: ['هو', 'جوعان'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'general-s1-08',
            stage: 1,
            ar: 'هو كاتب',
            en: 'He is a writer',
            tr: 'huwa kaatib',
            tiles: ['هو', 'كاتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'general-s2-01',
            stage: 2,
            ar: 'أنا أريد ماء',
            en: 'I want water',
            tr: 'ana uridu maa',
            tiles: ['أنا', 'أريد', 'ماء'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'أريد', en: 'I want', kind: 'new' },
                { ar: 'ماء', en: 'water', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s2-02',
            stage: 2,
            ar: 'أنا أريد قهوة',
            en: 'I want coffee',
            tr: 'ana uridu qahwa',
            tiles: ['أنا', 'أريد', 'قهوة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'أريد', en: 'I want', kind: 'new' },
                { ar: 'قهوة', en: 'coffee', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s2-03',
            stage: 2,
            ar: 'هو جوعان اليوم',
            en: 'He is hungry today',
            tr: 'huwa jo3an al-yawm',
            tiles: ['هو', 'جوعان', 'اليوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'general-s2-04',
            stage: 2,
            ar: 'هي تعبانة اليوم',
            en: 'She is tired today',
            tr: 'hiya ta3bana al-yawm',
            tiles: ['هي', 'تعبانة', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'تعبانة', en: 'tired (f)', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'تعبانة' }]
        },
        {
            id: 'general-s2-05',
            stage: 2,
            ar: 'أنت بخير الآن',
            en: 'You are fine now',
            tr: 'anta bikhayr al-aan',
            tiles: ['أنت', 'بخير', 'الآن'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'الآن', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s2-06',
            stage: 2,
            ar: 'أنا مدرس اليوم',
            en: 'I am a teacher today',
            tr: 'ana mudarris al-yawm',
            tiles: ['أنا', 'مدرس', 'اليوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'general-s2-07',
            stage: 2,
            ar: 'هو كاتب دوم',
            en: 'He is always a writer',
            tr: 'huwa kaatib dawm',
            tiles: ['هو', 'كاتب', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'general-s2-08',
            stage: 2,
            ar: 'أنا بخير دوم',
            en: 'I am always fine',
            tr: 'ana bikhayr dawm',
            tiles: ['أنا', 'بخير', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s3-01',
            stage: 3,
            ar: 'هو كتاب كبير',
            en: 'He has a big book',
            tr: 'huwa kitab kabir',
            tiles: ['هو', 'كتاب', 'كبير'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كتاب', en: 'book', kind: 'new' },
                { ar: 'كبير', en: 'big', kind: 'new' }
            ],
            roots: [{ ar: 'كتاب' }, { ar: 'كبير' }]
        },
        {
            id: 'general-s3-02',
            stage: 3,
            ar: 'أنا مدرس في المدرسة',
            en: 'I teach at the school',
            tr: 'ana mudarris fi al-madrasa',
            tiles: ['أنا', 'مدرس', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'general-s3-03',
            stage: 3,
            ar: 'أنت كاتب مشهور',
            en: 'You are a famous writer',
            tr: 'anta kaatib mashhoor',
            tiles: ['أنت', 'كاتب', 'مشهور'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'general-s3-04',
            stage: 3,
            ar: 'هي جوعانة اليوم',
            en: 'She is hungry today',
            tr: 'hiya jo3ana al-yawm',
            tiles: ['هي', 'جوعانة', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعانة', en: 'hungry (f)', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعانة' }]
        },
        {
            id: 'general-s3-05',
            stage: 3,
            ar: 'هو تعبان الآن',
            en: 'He is tired now',
            tr: 'huwa ta3ban al-aan',
            tiles: ['هو', 'تعبان', 'الآن'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'الآن', en: 'now', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'general-s3-06',
            stage: 3,
            ar: 'أنا بخير دوم',
            en: 'I am always fine',
            tr: 'ana bikhayr dawm',
            tiles: ['أنا', 'بخير', 'دوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s3-07',
            stage: 3,
            ar: 'أنت بخير الآن',
            en: 'You are fine now',
            tr: 'anta bikhayr al-aan',
            tiles: ['أنت', 'بخير', 'الآن'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'الآن', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s3-08',
            stage: 3,
            ar: 'هي بخير دوم',
            en: 'She is always fine',
            tr: 'hiya bikhayr dawm',
            tiles: ['هي', 'بخير', 'دوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s4-01',
            stage: 4,
            ar: 'هو كاتب في المكتب',
            en: 'He writes at the office',
            tr: 'huwa kaatib fi al-maktab',
            tiles: ['هو', 'كاتب', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'general-s4-02',
            stage: 4,
            ar: 'أنا مدرس في المدرسة',
            en: 'I teach at the school',
            tr: 'ana mudarris fi al-madrasa',
            tiles: ['أنا', 'مدرس', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'general-s4-03',
            stage: 4,
            ar: 'أنت أريد قهوة الآن',
            en: 'You want coffee now',
            tr: 'anta uridu qahwa al-aan',
            tiles: ['أنت', 'أريد', 'قهوة', 'الآن'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'أريد', en: 'I want', kind: 'new' },
                { ar: 'قهوة', en: 'coffee', kind: 'new' },
                { ar: 'الآن', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s4-04',
            stage: 4,
            ar: 'هي بخير دوم في البيت',
            en: 'She is always fine at home',
            tr: 'hiya bikhayr dawm fi al-bayt',
            tiles: ['هي', 'بخير', 'دوم', 'في', 'البيت'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s4-05',
            stage: 4,
            ar: 'هو تعبان اليوم في العمل',
            en: 'He is tired today at work',
            tr: 'huwa ta3ban al-yawm fi al-3amal',
            tiles: ['هو', 'تعبان', 'اليوم', 'في', 'العمل'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'العمل', en: 'the work', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'general-s4-06',
            stage: 4,
            ar: 'أنا جوعان في البيت',
            en: 'I am hungry at home',
            tr: 'ana jo3an fi al-bayt',
            tiles: ['أنا', 'جوعان', 'في', 'البيت'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'جوعان', en: 'hungry', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: [{ ar: 'جوعان' }]
        },
        {
            id: 'general-s4-07',
            stage: 4,
            ar: 'أنت كاتب مشهور',
            en: 'You are a famous writer',
            tr: 'anta kaatib mashhoor',
            tiles: ['أنت', 'كاتب', 'مشهور'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'general-s4-08',
            stage: 4,
            ar: 'هي بخير دوم',
            en: 'She is always fine',
            tr: 'hiya bikhayr dawm',
            tiles: ['هي', 'بخير', 'دوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s5-01',
            stage: 5,
            ar: 'أنا أريد بيت كبير',
            en: 'I want a big house',
            tr: 'ana uridu bayt kabir',
            tiles: ['أنا', 'أريد', 'بيت', 'كبير'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'أريد', en: 'I want', kind: 'new' },
                { ar: 'بيت', en: 'house', kind: 'new' },
                { ar: 'كبير', en: 'big', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        },
        {
            id: 'general-s5-02',
            stage: 5,
            ar: 'هو مدرس في المدرسة دوم',
            en: 'He always teaches at the school',
            tr: 'huwa mudarris fi al-madrasa dawm',
            tiles: ['هو', 'مدرس', 'في', 'المدرسة', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'general-s5-03',
            stage: 5,
            ar: 'أنت أريد قهوة الآن',
            en: 'You want coffee now',
            tr: 'anta uridu qahwa al-aan',
            tiles: ['أنت', 'أريد', 'قهوة', 'الآن'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'أريد', en: 'I want', kind: 'new' },
                { ar: 'قهوة', en: 'coffee', kind: 'new' },
                { ar: 'الآن', en: 'now', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s5-04',
            stage: 5,
            ar: 'هي جوعانة في البيت اليوم',
            en: 'She is hungry at home today',
            tr: 'hiya jo3ana fi al-bayt al-yawm',
            tiles: ['هي', 'جوعانة', 'في', 'البيت', 'اليوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعانة', en: 'hungry (f)', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'جوعانة' }]
        },
        {
            id: 'general-s5-05',
            stage: 5,
            ar: 'هو تعبان دوم في العمل',
            en: 'He is always tired at work',
            tr: 'huwa ta3ban dawm fi al-3amal',
            tiles: ['هو', 'تعبان', 'دوم', 'في', 'العمل'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'العمل', en: 'the work', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'general-s5-06',
            stage: 5,
            ar: 'أنا بخير دوم في البيت',
            en: 'I am always fine at home',
            tr: 'ana bikhayr dawm fi al-bayt',
            tiles: ['أنا', 'بخير', 'دوم', 'في', 'البيت'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s5-07',
            stage: 5,
            ar: 'أنت بخير دوم في المدرسة',
            en: 'You are always fine at the school',
            tr: 'anta bikhayr dawm fi al-madrasa',
            tiles: ['أنت', 'بخير', 'دوم', 'في', 'المدرسة'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s5-08',
            stage: 5,
            ar: 'هو كاتب مشهور في المكتب',
            en: 'He is a famous writer at the office',
            tr: 'huwa kaatib mashhoor fi al-maktab',
            tiles: ['هو', 'كاتب', 'مشهور', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'general-s6-01',
            stage: 6,
            ar: 'أنا أريد بيت كبير في المدينة',
            en: 'I want a big house in the city',
            tr: 'ana uridu bayt kabir fi al-madina',
            tiles: ['أنا', 'أريد', 'بيت', 'كبير', 'في', 'المدينة'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'أريد', en: 'I want', kind: 'new' },
                { ar: 'بيت', en: 'house', kind: 'new' },
                { ar: 'كبير', en: 'big', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدينة', en: 'the city', kind: 'new' }
            ],
            roots: [{ ar: 'كبير' }]
        },
        {
            id: 'general-s6-02',
            stage: 6,
            ar: 'هو مدرس جيد في المدرسة دوم',
            en: 'He is always a good teacher at the school',
            tr: 'huwa mudarris jayyid fi al-madrasa dawm',
            tiles: ['هو', 'مدرس', 'جيد', 'في', 'المدرسة', 'دوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'مدرس', en: 'teacher', kind: 'new' },
                { ar: 'جيد', en: 'good', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'مدرس' }]
        },
        {
            id: 'general-s6-03',
            stage: 6,
            ar: 'أنت كاتب مشهور في المكتب دوم',
            en: 'You are always a famous writer at the office',
            tr: 'anta kaatib mashhoor fi al-maktab dawm',
            tiles: ['أنت', 'كاتب', 'مشهور', 'في', 'المكتب', 'دوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        },
        {
            id: 'general-s6-04',
            stage: 6,
            ar: 'هي جوعانة في البيت اليوم دوم',
            en: 'She is always hungry at home today',
            tr: 'hiya jo3ana fi al-bayt al-yawm dawm',
            tiles: ['هي', 'جوعانة', 'في', 'البيت', 'اليوم', 'دوم'],
            teach: [
                { ar: 'هي', en: 'she', kind: 'glue' },
                { ar: 'جوعانة', en: 'hungry (f)', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' }
            ],
            roots: [{ ar: 'جوعانة' }]
        },
        {
            id: 'general-s6-05',
            stage: 6,
            ar: 'هو تعبان دوم في العمل اليوم',
            en: 'He is always tired at work today',
            tr: 'huwa ta3ban dawm fi al-3amal al-yawm',
            tiles: ['هو', 'تعبان', 'دوم', 'في', 'العمل', 'اليوم'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'تعبان', en: 'tired', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'العمل', en: 'the work', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: [{ ar: 'تعبان' }]
        },
        {
            id: 'general-s6-06',
            stage: 6,
            ar: 'أنا بخير دوم في البيت اليوم',
            en: 'I am always fine at home today',
            tr: 'ana bikhayr dawm fi al-bayt al-yawm',
            tiles: ['أنا', 'بخير', 'دوم', 'في', 'البيت', 'اليوم'],
            teach: [
                { ar: 'أنا', en: 'I', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'البيت', en: 'the house', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s6-07',
            stage: 6,
            ar: 'أنت بخير دوم في المدرسة اليوم',
            en: 'You are always fine at the school today',
            tr: 'anta bikhayr dawm fi al-madrasa al-yawm',
            tiles: ['أنت', 'بخير', 'دوم', 'في', 'المدرسة', 'اليوم'],
            teach: [
                { ar: 'أنت', en: 'you (m)', kind: 'glue' },
                { ar: 'بخير', en: 'fine/well', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المدرسة', en: 'the school', kind: 'new' },
                { ar: 'اليوم', en: 'today', kind: 'new' }
            ],
            roots: []
        },
        {
            id: 'general-s6-08',
            stage: 6,
            ar: 'هو كاتب مشهور دوم في المكتب',
            en: 'He is always a famous writer at the office',
            tr: 'huwa kaatib mashhoor dawm fi al-maktab',
            tiles: ['هو', 'كاتب', 'مشهور', 'دوم', 'في', 'المكتب'],
            teach: [
                { ar: 'هو', en: 'he', kind: 'glue' },
                { ar: 'كاتب', en: 'writer', kind: 'new' },
                { ar: 'مشهور', en: 'famous', kind: 'new' },
                { ar: 'دوم', en: 'always', kind: 'new' },
                { ar: 'في', en: 'in/at', kind: 'glue' },
                { ar: 'المكتب', en: 'the office', kind: 'new' }
            ],
            roots: [{ ar: 'كاتب' }]
        }
    ],

};

function validateBanks(options) {
    options = options || {};
    const banks = options.banks || {};
    const dialectBank = options.dialectBank || {};
    const swaps = options.swaps || {};
    const taughtByDialect = options.taughtByDialect || {};
    const hasMorphology = typeof options.hasMorphology === 'function' ? options.hasMorphology : function() { return false; };

    const errors = [];

    // ensure every dialect maps
    const dialectIds = options.dialectIds || null;
    if (Array.isArray(dialectIds)) {
        for (let i = 0; i < dialectIds.length; i += 1) {
            const id = dialectIds[i];
            if (!Object.prototype.hasOwnProperty.call(dialectBank, id) || !dialectBank[id]) {
                errors.push('missing bank for ' + id);
            }
        }
    }

    // check each sentence in each bank
    for (const bankName of Object.keys(banks)) {
        const bank = banks[bankName] || [];
        for (let s = 0; s < bank.length; s += 1) {
            const sent = bank[s];
            if (!Array.isArray(sent.teach)) {
                continue;
            }
            // keep empty-gloss rejection for teach entries themselves
            for (let t = 0; t < sent.teach.length; t += 1) {
                const te = sent.teach[t];
                if (!te) continue;
                if (typeof te.en !== 'string' || te.en === '') {
                    errors.push('empty gloss for ' + (te.ar || sent.id));
                    continue;
                }
            }

            // check tiles per dialect
            for (const did of Object.keys(dialectBank)) {
                if (dialectBank[did] !== bankName) continue;
                const swapMap = (swaps && swaps[did]) || {};
                const taughtExplicit = Array.isArray(taughtByDialect[did]) ? taughtByDialect[did] : [];
                if (!Array.isArray(sent.tiles)) continue;
                for (let i = 0; i < sent.tiles.length; i += 1) {
                    const origTile = sent.tiles[i];
                    let eff = origTile;
                    // Apply DIALECT_SWAPS per dialect before any tile validation
                    if (swapMap && Object.prototype.hasOwnProperty.call(swapMap, origTile)) {
                        eff = swapMap[origTile];
                    }

                    let ok = false;

                    // (a) checking if glossed in that sentence's teach with non-empty en (effective form)
                    if (Array.isArray(sent.teach)) {
                        for (let tt = 0; tt < sent.teach.length; tt += 1) {
                            const tentry = sent.teach[tt];
                            if (!tentry) continue;
                            // consider effective form - check both original and effective
                            if (tentry.ar === eff || tentry.ar === origTile) {
                                if (typeof tentry.en === 'string' && tentry.en !== '') {
                                    ok = true;
                                    break;
                                }
                            }
                        }
                    }

                    // (b) appears in taughtByDialect[did] (effective form, explicit)
                    if (!ok) {
                        for (let ti = 0; ti < taughtExplicit.length; ti += 1) {
                            if (taughtExplicit[ti] === eff || taughtExplicit[ti] === origTile) {
                                ok = true;
                                break;
                            }
                        }
                    }

                    // (c) hasMorphology(eff) returns true (effective form)
                    if (!ok && hasMorphology && hasMorphology(eff)) {
                        ok = true;
                    }

                    if (!ok) {
                        errors.push('untaught/un glossed tile ' + origTile + ' in ' + sent.id);
                    }
                }
            }
        }
    }

    // root-bearing coverage: per bank, for each stage 1-6, if that bank has no sentences for that stage, skip the check for (bank,stage)
    // Only require "at least one root-bearing sentence" when the bank actually contains sentences for that stage.
    for (const bankName of Object.keys(banks)) {
        const bank = banks[bankName] || [];
        for (let stage = 1; stage <= 6; stage += 1) {
            // check if this bank has any sentences for this stage
            let hasSentenceForStage = false;
            for (let s = 0; s < bank.length; s += 1) {
                if (bank[s].stage === stage) {
                    hasSentenceForStage = true;
                    break;
                }
            }
            if (!hasSentenceForStage) {
                continue;
            }
            // require at least one root-bearing sentence in this bank for this stage
            let foundRootBearing = false;
            for (let s = 0; s < bank.length; s += 1) {
                const sent = bank[s];
                if (sent.stage === stage && Array.isArray(sent.roots) && sent.roots.length > 0) {
                    foundRootBearing = true;
                    break;
                }
            }
            if (!foundRootBearing) {
                errors.push('no root-bearing sentence for stage ' + stage);
            }
        }
    }

    return errors;
}

const SentenceData = { SENTENCE_BANKS, DIALECT_BANK, DIALECT_SWAPS, STAGE_ANCHORS, validateBanks };
if (typeof module !== 'undefined') {
    module.exports = SentenceData;
}
