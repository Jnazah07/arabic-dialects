// Lesson data - dialect-specific curriculum.
// Each dialect gets a small set of units built from a shared topic pool
// plus dialect-flavored vocabulary where it differs.

// Topic pool: generic Modern Standard Arabic + widely understood words.
const topicPool = {
    family: {
        title: 'Family & People',
        desc: 'Close family members',
        words: [
            { ar: 'أب', en: 'Father' },
            { ar: 'أم', en: 'Mother' },
            { ar: 'أخ', en: 'Brother' },
            { ar: 'أخت', en: 'Sister' },
            { ar: 'ابن', en: 'Son' },
            { ar: 'ابنة', en: 'Daughter' }
        ]
    },
    food: {
        title: 'Food & Drink',
        desc: 'Everyday food and drink',
        words: [
            { ar: 'ماء', en: 'Water' },
            { ar: 'خبز', en: 'Bread' },
            { ar: 'شاي', en: 'Tea' },
            { ar: 'قهوة', en: 'Coffee' },
            { ar: 'رز', en: 'Rice' },
            { ar: 'لحم', en: 'Meat' }
        ]
    },
    numbers: {
        title: 'Numbers',
        desc: 'Count from one to six',
        words: [
            { ar: 'واحد', en: 'One' },
            { ar: 'اثنين', en: 'Two' },
            { ar: 'ثلاثة', en: 'Three' },
            { ar: 'أربعة', en: 'Four' },
            { ar: 'خمسة', en: 'Five' },
            { ar: 'ستة', en: 'Six' }
        ]
    },
    places: {
        title: 'Places',
        desc: 'Around town',
        words: [
            { ar: 'بيت', en: 'House' },
            { ar: 'شارع', en: 'Street' },
            { ar: 'سوق', en: 'Market' },
            { ar: 'مدرسة', en: 'School' },
            { ar: 'مستشفى', en: 'Hospital' },
            { ar: 'مسجد', en: 'Mosque' }
        ]
    },
    time: {
        title: 'Time & Days',
        desc: 'Days of the week',
        words: [
            { ar: 'اليوم', en: 'Today' },
            { ar: 'غدا', en: 'Tomorrow' },
            { ar: 'أمس', en: 'Yesterday' },
            { ar: 'صباح', en: 'Morning' },
            { ar: 'مساء', en: 'Evening' },
            { ar: 'ليل', en: 'Night' }
        ]
    },
    colors: {
        title: 'Colors',
        desc: 'Basic colors',
        words: [
            { ar: 'أحمر', en: 'Red' },
            { ar: 'أزرق', en: 'Blue' },
            { ar: 'أخضر', en: 'Green' },
            { ar: 'أصفر', en: 'Yellow' },
            { ar: 'أسود', en: 'Black' },
            { ar: 'أبيض', en: 'White' }
        ]
    }
};

// Dialect-specific greeting/basics set. This is where the dialects actually
// differ, so each one gets its own wording where it matters.
const dialectBasics = {
    emirati: [
        { ar: 'مرحبا', en: 'Hello' },
        { ar: 'شكرا', en: 'Thank you' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'لا', en: 'No' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'شو أخبارك؟', en: "What's new?" }
    ],
    saudi: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'صباح الخير', en: 'Good morning' },
        { ar: 'مساء الخير', en: 'Good evening' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'الحمد لله بخير', en: "I'm fine, thank God" },
        { ar: 'وش أخبارك؟', en: "What's new?" }
    ],
    omani: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'بخير', en: 'Fine' },
        { ar: 'شكرا جزيلا', en: 'Thank you very much' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'مو مشكلة', en: 'No problem' }
    ],
    yemeni: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'بخير الحمد لله', en: 'Fine, thank God' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'على راسي', en: 'With pleasure' }
    ],
    kuwaiti: [
        { ar: 'شلونك؟', en: 'How are you?' },
        { ar: 'زين', en: 'Good' },
        { ar: 'مشكور', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'لا', en: 'No' },
        { ar: 'شخبارك؟', en: "What's new?" }
    ],
    qatari: [
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'شلونك؟', en: 'How are you?' },
        { ar: 'زين', en: 'Good' },
        { ar: 'مشكور', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'مع السلامة', en: 'Goodbye' }
    ],
    bahraini: [
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'زين الحمد لله', en: 'Fine, thank God' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'شخبارك؟', en: "What's new?" }
    ],
    iraqi: [
        { ar: 'شلونك؟', en: 'How are you? (to a man)' },
        { ar: 'شلونج؟', en: 'How are you? (to a woman)' },
        { ar: 'زين', en: 'Good / fine' },
        { ar: 'مو زين', en: 'Not good' },
        { ar: 'ممنون', en: 'Thanks' },
        { ar: 'هلا بيك', en: 'Welcome' }
    ],
    jordanian: [
        { ar: 'أهلا', en: 'Hello' },
        { ar: 'كيفك؟', en: 'How are you?' },
        { ar: 'ممتاز', en: 'Excellent' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'لو سمحت', en: 'Excuse me / please' },
        { ar: 'مع السلامة', en: 'Goodbye' }
    ],
    lebanese: [
        { ar: 'مرحبا', en: 'Hello' },
        { ar: 'كيفك؟', en: 'How are you?' },
        { ar: 'منيح', en: 'Good' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'الله يبارك فيك', en: 'God bless you' },
        { ar: 'يلا', en: "Let's go" }
    ],
    palestinian: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'كيفك؟', en: 'How are you?' },
        { ar: 'بخير الحمد لله', en: 'Fine, thank God' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'يا هلا', en: 'Welcome / hi there' }
    ],
    syrian: [
        { ar: 'أهلا', en: 'Hello' },
        { ar: 'كيفك؟', en: 'How are you?' },
        { ar: 'منيح', en: 'Good' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'تكرم', en: 'You are welcome' },
        { ar: 'شو أخبارك؟', en: "What's new?" }
    ],
    egyptian: [
        { ar: 'أهلا', en: 'Hi' },
        { ar: 'عامل إيه؟', en: 'How are you?' },
        { ar: 'كويس', en: 'Good / fine' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'عفوا', en: "You're welcome" },
        { ar: 'يا جماعة', en: 'Everyone / folks' }
    ],
    libyan: [
        { ar: 'وعليكم السلام', en: 'Peace be upon you' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'كويس', en: 'Good' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'مع السلامة', en: 'Goodbye' }
    ],
    tunisian: [
        { ar: 'أهلا', en: 'Hi' },
        { ar: 'كيفاش؟', en: 'How are you?' },
        { ar: 'مزيان', en: 'Good' },
        { ar: 'بارك الله فيك', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'باهي', en: 'Okay' }
    ],
    algerian: [
        { ar: 'وعليكم السلام', en: 'Peace be upon you' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'لاباس', en: "I'm fine" },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'اهلا', en: 'Welcome' },
        { ar: 'واش راك؟', en: 'How are you?' }
    ],
    moroccan: [
        { ar: 'السلام عليكم', en: 'Peace be upon you' },
        { ar: 'لاباس؟', en: 'How are you?' },
        { ar: 'لاباس', en: "I'm fine" },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'صافي', en: 'Okay' },
        { ar: 'بسلامة', en: 'Goodbye' }
    ],
    mauritanian: [
        { ar: 'أهلا', en: 'Hello' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'لاباس', en: "I'm fine" },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'مع السلامة', en: 'Goodbye' }
    ],
    sudanese: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'كويس الحمد لله', en: 'Fine, thank God' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'إن شاء الله', en: 'God willing' }
    ],
    mali: [
        { ar: 'أهلا', en: 'Hello' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'لاباس', en: "I'm fine" },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'إن شاء الله', en: 'God willing' }
    ],
    niger: [
        { ar: 'وعليكم السلام', en: 'Peace be upon you' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'لاباس الحمد لله', en: 'Fine, thank God' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'إن شاء الله', en: 'God willing' }
    ],
    senegal: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'بخير', en: 'Fine' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'إن شاء الله', en: 'God willing' }
    ],
    comorian: [
        { ar: 'أهلا', en: 'Hello' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'بخير', en: 'Fine' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'إن شاء الله', en: 'God willing' }
    ],
    djiboutian: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'بخير الحمد لله', en: 'Fine, thank God' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'نعم', en: 'Yes' },
        { ar: 'مع السلامة', en: 'Goodbye' }
    ],
    somalian: [
        { ar: 'أهلا وسهلا', en: 'Welcome' },
        { ar: 'كيف الحال؟', en: 'How are you?' },
        { ar: 'بخير', en: 'Fine' },
        { ar: 'شكرا', en: 'Thanks' },
        { ar: 'مع السلامة', en: 'Goodbye' },
        { ar: 'إن شاء الله', en: 'God willing' }
    ]
};

// Curriculum order after Basics: which shared topics each dialect covers.
const curriculum = [
    'family',
    'food',
    'numbers',
    'places',
    'time',
    'colors'
];

const lessonData = {};

Object.keys(dialectBasics).forEach((dialectId, di) => {
    const units = [];
    // Unit 1: dialect-specific basics
    units.push({
        id: 1,
        title: 'Basics 1',
        desc: 'Greetings and everyday words',
        words: dialectBasics[dialectId].map((w, i) => ({ ...w, type: 'basics' }))
    });
    // Subsequent units: shared topics, offset per dialect so the order varies
    curriculum.forEach((topicKey, ti) => {
        const topic = topicPool[topicKey];
        units.push({
            id: ti + 2,
            title: `${topic.title}`,
            desc: topic.desc,
            words: topic.words.map(w => ({ ...w, type: topicKey }))
        });
    });
    lessonData[dialectId] = units;
});
