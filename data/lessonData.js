// Lesson data: a large shared Arabic core plus dialect-specific vocabulary.
// Every word is [ar, en, tr] (Arabic, English, transliteration).
// The core set is standard Arabic that every speaker understands; the dialect
// sets hold the words and phrases that actually differ by region.

const coreUnits = [
    {
        key: 'greetings', title: 'Greetings', desc: 'Say hello and goodbye', words: [
            ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
            ['وعليكم السلام', 'And peace upon you too', 'wa alaykum as-salaam'],
            ['مرحبا', 'Hello', 'marhaban'],
            ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
            ['صباح الخير', 'Good morning', 'sabah al-khayr'],
            ['صباح النور', 'Good morning (reply)', 'sabah an-noor'],
            ['مساء الخير', 'Good evening', 'masaa al-khayr'],
            ['تصبح على خير', 'Good night', 'tusbih ala khayr'],
            ['مع السلامة', 'Goodbye', 'maa as-salaama'],
            ['إلى اللقاء', 'See you later', 'ila al-liqaa'],
            ['نعم', 'Yes', 'naam'],
            ['لا', 'No', 'laa']
        ]
    },
    {
        key: 'courtesy', title: 'Being Polite', desc: 'Thanks, please and manners', words: [
            ['شكرا', 'Thank you', 'shukran'],
            ['شكرا جزيلا', 'Thank you very much', 'shukran jazeelan'],
            ['عفوا', 'You are welcome', 'afwan'],
            ['من فضلك', 'Please', 'min fadlik'],
            ['لو سمحت', 'Excuse me', 'law samaht'],
            ['آسف', 'Sorry', 'aasif'],
            ['عذرا', 'Pardon me', 'audhran'],
            ['تفضل', 'Go ahead, please', 'tafaddal'],
            ['إن شاء الله', 'God willing', 'in shaa Allah'],
            ['ما شاء الله', 'God has willed it', 'maa shaa Allah'],
            ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
            ['بالتوفيق', 'Good luck', 'bit-tawfeeq']
        ]
    },
    {
        key: 'family', title: 'Family', desc: 'The closest family members', words: [
            ['أب', 'Father', 'ab'],
            ['أم', 'Mother', 'umm'],
            ['أخ', 'Brother', 'akh'],
            ['أخت', 'Sister', 'ukht'],
            ['ابن', 'Son', 'ibn'],
            ['ابنة', 'Daughter', 'ibna'],
            ['ولد', 'Boy', 'walad'],
            ['بنت', 'Girl', 'bint'],
            ['طفل', 'Child', 'tifl'],
            ['رجل', 'Man', 'rajul'],
            ['امرأة', 'Woman', 'imraa'],
            ['عائلة', 'Family', 'aaila']
        ]
    },
    {
        key: 'people', title: 'People and Relations', desc: 'Relatives and friends', words: [
            ['جد', 'Grandfather', 'jadd'],
            ['جدة', 'Grandmother', 'jadda'],
            ['عم', 'Uncle (father side)', 'amm'],
            ['خال', 'Uncle (mother side)', 'khaal'],
            ['عمة', 'Aunt (father side)', 'amma'],
            ['خالة', 'Aunt (mother side)', 'khaala'],
            ['زوج', 'Husband', 'zawj'],
            ['زوجة', 'Wife', 'zawja'],
            ['صديق', 'Friend', 'sadeeq'],
            ['جار', 'Neighbour', 'jaar'],
            ['قريب', 'Relative', 'qareeb'],
            ['ضيف', 'Guest', 'dayf']
        ]
    },
    {
        key: 'food', title: 'Food', desc: 'Everyday food', words: [
            ['خبز', 'Bread', 'khubz'],
            ['أرز', 'Rice', 'aruz'],
            ['لحم', 'Meat', 'lahm'],
            ['دجاج', 'Chicken', 'dajaaj'],
            ['سمك', 'Fish', 'samak'],
            ['بيض', 'Egg', 'bayd'],
            ['جبن', 'Cheese', 'jubn'],
            ['لبن', 'Yoghurt', 'laban'],
            ['زبدة', 'Butter', 'zubda'],
            ['سكر', 'Sugar', 'sukkar'],
            ['ملح', 'Salt', 'milh'],
            ['زيت', 'Oil', 'zayt']
        ]
    },
    {
        key: 'fruitveg', title: 'Fruit and Vegetables', desc: 'Produce from the market', words: [
            ['تفاح', 'Apple', 'tuffaah'],
            ['موز', 'Banana', 'mawz'],
            ['برتقال', 'Orange', 'burtuqaal'],
            ['عنب', 'Grapes', 'inab'],
            ['بطيخ', 'Watermelon', 'batteekh'],
            ['ليمون', 'Lemon', 'laymoon'],
            ['بصل', 'Onion', 'basal'],
            ['ثوم', 'Garlic', 'thawm'],
            ['طماطم', 'Tomato', 'tamaatim'],
            ['بطاطا', 'Potato', 'bataata'],
            ['جزر', 'Carrot', 'jazar'],
            ['خيار', 'Cucumber', 'khiyaar']
        ]
    },
    {
        key: 'drinks', title: 'Drinks', desc: 'What you drink', words: [
            ['ماء', 'Water', 'maa'],
            ['شاي', 'Tea', 'shaay'],
            ['قهوة', 'Coffee', 'qahwa'],
            ['حليب', 'Milk', 'haleeb'],
            ['عصير', 'Juice', 'aseer'],
            ['كوب', 'Cup', 'koob'],
            ['ماء بارد', 'Cold water', 'maa baarid'],
            ['شاي بالنعنع', 'Tea with mint', 'shaay bin-nana'],
            ['مشروب', 'Drink', 'mashroob'],
            ['قنينة', 'Bottle', 'qinneena'],
            ['ساخن', 'Hot', 'saakhin'],
            ['ثلج', 'Ice', 'thalj']
        ]
    },
    {
        key: 'numbers1', title: 'Numbers 1 to 10', desc: 'Count from one to ten', words: [
            ['واحد', 'One', 'waahid'],
            ['اثنان', 'Two', 'ithnaan'],
            ['ثلاثة', 'Three', 'thalaatha'],
            ['أربعة', 'Four', 'arbaa'],
            ['خمسة', 'Five', 'khamsa'],
            ['ستة', 'Six', 'sitta'],
            ['سبعة', 'Seven', 'sabaa'],
            ['ثمانية', 'Eight', 'thamaaniya'],
            ['تسعة', 'Nine', 'tisaa'],
            ['عشرة', 'Ten', 'ashara'],
            ['صفر', 'Zero', 'sifr'],
            ['نصف', 'Half', 'nisf']
        ]
    },
    {
        key: 'numbers2', title: 'Numbers 11 to 1000', desc: 'Bigger numbers', words: [
            ['أحد عشر', 'Eleven', 'ahada ashar'],
            ['اثنا عشر', 'Twelve', 'ithnaa ashar'],
            ['خمسة عشر', 'Fifteen', 'khamsata ashar'],
            ['عشرون', 'Twenty', 'ishroon'],
            ['ثلاثون', 'Thirty', 'thalathoon'],
            ['خمسون', 'Fifty', 'khamsoon'],
            ['مئة', 'One hundred', 'mia'],
            ['ألف', 'One thousand', 'alf'],
            ['مليون', 'One million', 'milyoon'],
            ['الأول', 'First', 'al-awwal'],
            ['الثاني', 'Second', 'ath-thaani'],
            ['الأخير', 'Last', 'al-akheer']
        ]
    },
    {
        key: 'time', title: 'Time', desc: 'Talking about time', words: [
            ['اليوم', 'Today', 'al-yawm'],
            ['غدا', 'Tomorrow', 'ghadan'],
            ['أمس', 'Yesterday', 'ams'],
            ['الآن', 'Now', 'al-aan'],
            ['صباح', 'Morning', 'sabaah'],
            ['ظهر', 'Noon', 'duhr'],
            ['مساء', 'Evening', 'masaa'],
            ['ليل', 'Night', 'layl'],
            ['ساعة', 'Hour', 'saaa'],
            ['دقيقة', 'Minute', 'daqeeqa'],
            ['أسبوع', 'Week', 'usboo'],
            ['سنة', 'Year', 'sana']
        ]
    },
    {
        key: 'days', title: 'Days of the Week', desc: 'Name the days', words: [
            ['السبت', 'Saturday', 'as-sabt'],
            ['الأحد', 'Sunday', 'al-ahad'],
            ['الاثنين', 'Monday', 'al-ithnayn'],
            ['الثلاثاء', 'Tuesday', 'ath-thulathaa'],
            ['الأربعاء', 'Wednesday', 'al-arbiaa'],
            ['الخميس', 'Thursday', 'al-khamees'],
            ['الجمعة', 'Friday', 'al-jumaa'],
            ['اليوم', 'Today', 'al-yawm'],
            ['بكرة', 'Tomorrow', 'bukra'],
            ['الأسبوع القادم', 'Next week', 'al-usboo al-qaadim'],
            ['عطلة', 'Weekend or holiday', 'utla'],
            ['موعد', 'Appointment', 'mawid']
        ]
    },
    {
        key: 'months', title: 'Months and Seasons', desc: 'The calendar', words: [
            ['يناير', 'January', 'yanayir'],
            ['فبراير', 'February', 'fibrayir'],
            ['مارس', 'March', 'maaris'],
            ['أبريل', 'April', 'abreel'],
            ['مايو', 'May', 'maayo'],
            ['يونيو', 'June', 'yooniyo'],
            ['يوليو', 'July', 'yooliyo'],
            ['أغسطس', 'August', 'aghustus'],
            ['سبتمبر', 'September', 'sibtambar'],
            ['الربيع', 'Spring', 'ar-rabee'],
            ['الصيف', 'Summer', 'as-sayf'],
            ['الشتاء', 'Winter', 'ash-shitaa']
        ]
    },
    {
        key: 'colors', title: 'Colors', desc: 'Describe with color', words: [
            ['أحمر', 'Red', 'ahmar'],
            ['أزرق', 'Blue', 'azraq'],
            ['أخضر', 'Green', 'akhdar'],
            ['أصفر', 'Yellow', 'asfar'],
            ['أسود', 'Black', 'aswad'],
            ['أبيض', 'White', 'abyad'],
            ['برتقالي', 'Orange', 'burtuqaali'],
            ['بنفسجي', 'Purple', 'banafsaji'],
            ['وردي', 'Pink', 'wardi'],
            ['بني', 'Brown', 'bunni'],
            ['رمادي', 'Grey', 'ramaadi'],
            ['ذهبي', 'Gold', 'dhahabi']
        ]
    },
    {
        key: 'body', title: 'The Body', desc: 'Head to hands', words: [
            ['رأس', 'Head', 'raas'],
            ['عين', 'Eye', 'ayn'],
            ['أذن', 'Ear', 'udhun'],
            ['أنف', 'Nose', 'anf'],
            ['فم', 'Mouth', 'fam'],
            ['يد', 'Hand', 'yad'],
            ['إصبع', 'Finger', 'isba'],
            ['قلب', 'Heart', 'qalb'],
            ['بطن', 'Stomach', 'batn'],
            ['ظهر', 'Back', 'dahr'],
            ['شعر', 'Hair', 'shaar'],
            ['رقبة', 'Neck', 'raqaba']
        ]
    },
    {
        key: 'body2', title: 'Body and Health Words', desc: 'More body parts', words: [
            ['قدم', 'Foot', 'qadam'],
            ['كتف', 'Shoulder', 'katif'],
            ['ركبة', 'Knee', 'rukba'],
            ['لسان', 'Tongue', 'lisaan'],
            ['سن', 'Tooth', 'sinn'],
            ['دم', 'Blood', 'dam'],
            ['جلد', 'Skin', 'jild'],
            ['عظم', 'Bone', 'adm'],
            ['عضلة', 'Muscle', 'adala'],
            ['دماغ', 'Brain', 'dimagh'],
            ['معدة', 'Stomach organ', 'mida'],
            ['رئة', 'Lung', 'ria']
        ]
    },
    {
        key: 'clothes', title: 'Clothes', desc: 'What you wear', words: [
            ['قميص', 'Shirt', 'qamees'],
            ['بنطال', 'Trousers', 'bantal'],
            ['حذاء', 'Shoes', 'hidhaa'],
            ['ثوب', 'Long robe', 'thawb'],
            ['عباءة', 'Cloak', 'abaaya'],
            ['حجاب', 'Headscarf', 'hijaab'],
            ['قبعة', 'Hat', 'qubbaa'],
            ['جوارب', 'Socks', 'jawaarib'],
            ['معطف', 'Coat', 'mitaf'],
            ['فستان', 'Dress', 'fustaan'],
            ['نظارة', 'Glasses', 'naddara'],
            ['ساعة يد', 'Wristwatch', 'saa yad']
        ]
    },
    {
        key: 'home', title: 'The Home', desc: 'Inside the house', words: [
            ['بيت', 'House', 'bayt'],
            ['غرفة', 'Room', 'ghurfa'],
            ['باب', 'Door', 'baab'],
            ['نافذة', 'Window', 'naafidha'],
            ['مطبخ', 'Kitchen', 'matbakh'],
            ['حمام', 'Bathroom', 'hammaam'],
            ['سرير', 'Bed', 'sareer'],
            ['كرسي', 'Chair', 'kursi'],
            ['طاولة', 'Table', 'taawila'],
            ['مفتاح', 'Key', 'miftaah'],
            ['مصباح', 'Lamp', 'misbaah'],
            ['مرآة', 'Mirror', 'miraa']
        ]
    },
    {
        key: 'city', title: 'City and Places', desc: 'Around town', words: [
            ['مدينة', 'City', 'madeena'],
            ['قرية', 'Village', 'qarya'],
            ['شارع', 'Street', 'shaari'],
            ['سوق', 'Market', 'sooq'],
            ['مدرسة', 'School', 'madrasa'],
            ['مستشفى', 'Hospital', 'mustashfa'],
            ['مسجد', 'Mosque', 'masjid'],
            ['بنك', 'Bank', 'bank'],
            ['مطعم', 'Restaurant', 'matam'],
            ['فندق', 'Hotel', 'funduq'],
            ['مطار', 'Airport', 'mataar'],
            ['حديقة', 'Park or garden', 'hadeeqa']
        ]
    },
    {
        key: 'directions', title: 'Directions', desc: 'Find your way', words: [
            ['يمين', 'Right', 'yameen'],
            ['يسار', 'Left', 'yasaar'],
            ['أمام', 'In front', 'amaam'],
            ['خلف', 'Behind', 'khalf'],
            ['فوق', 'Above', 'fawq'],
            ['تحت', 'Under', 'taht'],
            ['قريب', 'Near', 'qareeb'],
            ['بعيد', 'Far', 'baaeed'],
            ['هنا', 'Here', 'huna'],
            ['هناك', 'There', 'hunaak'],
            ['شمال', 'North', 'shimaal'],
            ['جنوب', 'South', 'janoob']
        ]
    },
    {
        key: 'transport', title: 'Getting Around', desc: 'Transport and travel', words: [
            ['سيارة', 'Car', 'sayyaara'],
            ['حافلة', 'Bus', 'haafila'],
            ['قطار', 'Train', 'qitaar'],
            ['طائرة', 'Airplane', 'taaira'],
            ['دراجة', 'Bicycle', 'darraaja'],
            ['قارب', 'Boat', 'qaarib'],
            ['تاكسي', 'Taxi', 'taaksi'],
            ['طريق', 'Road', 'tareeq'],
            ['جسر', 'Bridge', 'jisr'],
            ['تذكرة', 'Ticket', 'tadhkira'],
            ['محطة', 'Station', 'mahatta'],
            ['رحلة', 'Trip', 'rihla']
        ]
    },
    {
        key: 'nature', title: 'Nature and Weather', desc: 'The world outside', words: [
            ['شمس', 'Sun', 'shams'],
            ['قمر', 'Moon', 'qamar'],
            ['نجم', 'Star', 'najm'],
            ['سماء', 'Sky', 'samaa'],
            ['مطر', 'Rain', 'matar'],
            ['ريح', 'Wind', 'reeh'],
            ['سحاب', 'Clouds', 'sahaab'],
            ['بحر', 'Sea', 'bahr'],
            ['نهر', 'River', 'nahr'],
            ['جبل', 'Mountain', 'jabal'],
            ['شجرة', 'Tree', 'shajara'],
            ['زهرة', 'Flower', 'zahra']
        ]
    },
    {
        key: 'animals', title: 'Animals', desc: 'Common animals', words: [
            ['كلب', 'Dog', 'kalb'],
            ['قط', 'Cat', 'qitt'],
            ['حصان', 'Horse', 'hisaan'],
            ['جمل', 'Camel', 'jamal'],
            ['بقرة', 'Cow', 'baqara'],
            ['خروف', 'Sheep', 'kharoof'],
            ['دجاجة', 'Hen', 'dajaaja'],
            ['طير', 'Bird', 'tayr'],
            ['سمكة', 'Fish (animal)', 'samaka'],
            ['أسد', 'Lion', 'asad'],
            ['فيل', 'Elephant', 'feel'],
            ['ذئب', 'Wolf', 'dhib']
        ]
    },
    {
        key: 'school', title: 'School and Learning', desc: 'Study words', words: [
            ['كتاب', 'Book', 'kitaab'],
            ['قلم', 'Pen', 'qalam'],
            ['ورقة', 'Paper', 'waraqa'],
            ['درس', 'Lesson', 'dars'],
            ['امتحان', 'Exam', 'imtihaan'],
            ['طالب', 'Student', 'taalib'],
            ['أستاذ', 'Teacher', 'ustaadh'],
            ['جامعة', 'University', 'jaamia'],
            ['علم', 'Knowledge or science', 'ilm'],
            ['سؤال', 'Question', 'suaal'],
            ['جواب', 'Answer', 'jawaab'],
            ['كلمة', 'Word', 'kalima']
        ]
    },
    {
        key: 'work', title: 'Work and Jobs', desc: 'Talking about work', words: [
            ['عمل', 'Work', 'amal'],
            ['وظيفة', 'Job', 'wazeefa'],
            ['شركة', 'Company', 'sharika'],
            ['مكتب', 'Office', 'maktab'],
            ['مدير', 'Manager', 'mudeer'],
            ['موظف', 'Employee', 'muwaddaf'],
            ['راتب', 'Salary', 'raatib'],
            ['اجتماع', 'Meeting', 'ijtimaa'],
            ['مشروع', 'Project', 'mashroo'],
            ['مهندس', 'Engineer', 'muhandis'],
            ['طبيب', 'Doctor', 'tabeeb'],
            ['معلم', 'Teacher', 'muallim']
        ]
    },
    {
        key: 'tech', title: 'Technology', desc: 'Phones and computers', words: [
            ['هاتف', 'Phone', 'haatif'],
            ['حاسوب', 'Computer', 'haasoob'],
            ['إنترنت', 'Internet', 'internet'],
            ['رسالة', 'Message', 'risaala'],
            ['بريد', 'Mail', 'bareed'],
            ['تطبيق', 'App', 'tatbeeq'],
            ['شاشة', 'Screen', 'shaasha'],
            ['كاميرا', 'Camera', 'kaamera'],
            ['بطارية', 'Battery', 'battaariya'],
            ['شاحن', 'Charger', 'shaahin'],
            ['كلمة السر', 'Password', 'kalimat as-sirr'],
            ['شبكة', 'Network', 'shabaka']
        ]
    },
    {
        key: 'health', title: 'Health', desc: 'Feeling ill', words: [
            ['صحة', 'Health', 'sihha'],
            ['مرض', 'Illness', 'marad'],
            ['دواء', 'Medicine', 'dawaa'],
            ['ألم', 'Pain', 'alam'],
            ['حرارة', 'Fever', 'haraara'],
            ['صداع', 'Headache', 'sudaa'],
            ['علاج', 'Treatment', 'ilaaj'],
            ['تعب', 'Tiredness', 'taab'],
            ['إسعاف', 'Ambulance', 'is-aaf'],
            ['صيدلية', 'Pharmacy', 'saydaliya'],
            ['عيادة', 'Clinic', 'iyaada'],
            ['تحليل', 'Test or analysis', 'tahleel']
        ]
    },
    {
        key: 'emotions', title: 'Feelings', desc: 'How you feel', words: [
            ['سعيد', 'Happy', 'saeed'],
            ['حزين', 'Sad', 'hazeen'],
            ['غاضب', 'Angry', 'ghaadib'],
            ['خائف', 'Afraid', 'khaaif'],
            ['متعب', 'Tired', 'mutab'],
            ['جوعان', 'Hungry', 'jooaan'],
            ['عطشان', 'Thirsty', 'atshaan'],
            ['فرحان', 'Joyful', 'farhaan'],
            ['قلق', 'Worried', 'qaliq'],
            ['مشغول', 'Busy', 'mashghool'],
            ['هادئ', 'Calm', 'haadi'],
            ['مندهش', 'Surprised', 'mundahish']
        ]
    },
    {
        key: 'adjectives', title: 'Describing Things', desc: 'Common adjectives', words: [
            ['كبير', 'Big', 'kabeer'],
            ['صغير', 'Small', 'sagheer'],
            ['جديد', 'New', 'jadeed'],
            ['قديم', 'Old', 'qadeem'],
            ['جميل', 'Beautiful', 'jameel'],
            ['سهل', 'Easy', 'sahl'],
            ['صعب', 'Difficult', 'saab'],
            ['سريع', 'Fast', 'saree'],
            ['بطيء', 'Slow', 'batee'],
            ['طويل', 'Long or tall', 'taweel'],
            ['قصير', 'Short', 'qaseer'],
            ['نظيف', 'Clean', 'nadeef']
        ]
    },
    {
        key: 'adjectives2', title: 'More Describing Words', desc: 'More adjectives', words: [
            ['قوي', 'Strong', 'qawi'],
            ['ضعيف', 'Weak', 'daeef'],
            ['غني', 'Rich', 'ghani'],
            ['فقير', 'Poor', 'faqeer'],
            ['ذكي', 'Smart', 'dhaki'],
            ['غبي', 'Stupid', 'ghabi'],
            ['حار', 'Hot (spicy)', 'haar'],
            ['بارد', 'Cold', 'baarid'],
            ['مفتوح', 'Open', 'maftooh'],
            ['مغلق', 'Closed', 'mughlaq'],
            ['مهم', 'Important', 'muhim'],
            ['جاهز', 'Ready', 'jaahiz']
        ]
    },
    {
        key: 'verbs', title: 'Everyday Verbs', desc: 'Actions you do', words: [
            ['يذهب', 'He goes', 'yadhhab'],
            ['يأكل', 'He eats', 'yaakul'],
            ['يشرب', 'He drinks', 'yashrab'],
            ['ينام', 'He sleeps', 'yanaam'],
            ['يستيقظ', 'He wakes up', 'yastayqidh'],
            ['يعمل', 'He works', 'yaamal'],
            ['يدرس', 'He studies', 'yadrus'],
            ['يقرأ', 'He reads', 'yaqra'],
            ['يكتب', 'He writes', 'yaktub'],
            ['يتكلم', 'He speaks', 'yatakallam'],
            ['يسمع', 'He hears', 'yasma'],
            ['يرى', 'He sees', 'yaraa']
        ]
    },
    {
        key: 'verbs2', title: 'More Verbs', desc: 'More actions', words: [
            ['يريد', 'He wants', 'yureed'],
            ['يحب', 'He loves', 'yuhibb'],
            ['يعرف', 'He knows', 'yaarif'],
            ['يفهم', 'He understands', 'yafham'],
            ['يشتري', 'He buys', 'yashtari'],
            ['يبيع', 'He sells', 'yabee'],
            ['يفتح', 'He opens', 'yaftah'],
            ['يغلق', 'He closes', 'yughliq'],
            ['يجلس', 'He sits', 'yajlis'],
            ['يقف', 'He stands', 'yaqif'],
            ['يمشي', 'He walks', 'yamshi'],
            ['يعطي', 'He gives', 'yuti']
        ]
    },
    {
        key: 'questions', title: 'Question Words', desc: 'Ask anything', words: [
            ['ماذا', 'What', 'maadha'],
            ['من', 'Who', 'man'],
            ['أين', 'Where', 'ayna'],
            ['متى', 'When', 'mataa'],
            ['لماذا', 'Why', 'limaadha'],
            ['كيف', 'How', 'kayfa'],
            ['كم', 'How many', 'kam'],
            ['أي', 'Which', 'ayy'],
            ['هل', 'Is it (yes or no)', 'hal'],
            ['ماذا تريد؟', 'What do you want?', 'maadha tureed'],
            ['أين أنت؟', 'Where are you?', 'ayna anta'],
            ['كم الساعة؟', 'What time is it?', 'kam as-saaa']
        ]
    },
    {
        key: 'pronouns', title: 'Pronouns', desc: 'I, you, he, she', words: [
            ['أنا', 'I', 'ana'],
            ['أنت', 'You (male)', 'anta'],
            ['أنتِ', 'You (female)', 'anti'],
            ['هو', 'He', 'huwa'],
            ['هي', 'She', 'hiya'],
            ['نحن', 'We', 'nahnu'],
            ['أنتم', 'You (plural)', 'antum'],
            ['هم', 'They', 'hum'],
            ['لي', 'Mine or to me', 'lee'],
            ['لك', 'Yours', 'lak'],
            ['له', 'His', 'lahu'],
            ['لها', 'Hers', 'lahaa']
        ]
    },
    {
        key: 'prepositions', title: 'Little Words', desc: 'Prepositions and connectors', words: [
            ['في', 'In', 'fee'],
            ['على', 'On', 'ala'],
            ['من', 'From', 'min'],
            ['إلى', 'To', 'ila'],
            ['مع', 'With', 'maa'],
            ['عن', 'About', 'an'],
            ['بلا', 'Without', 'bila'],
            ['و', 'And', 'wa'],
            ['أو', 'Or', 'aw'],
            ['لكن', 'But', 'laakin'],
            ['لأن', 'Because', 'lianna'],
            ['إذا', 'If', 'idha']
        ]
    },
    {
        key: 'timeexp', title: 'Time Expressions', desc: 'Always, never, sometimes', words: [
            ['دائما', 'Always', 'daaiman'],
            ['أبدا', 'Never', 'abadan'],
            ['أحيانا', 'Sometimes', 'ahyaanan'],
            ['غالبا', 'Often', 'ghaaliban'],
            ['قريبا', 'Soon', 'qareeban'],
            ['لاحقا', 'Later', 'laahiqan'],
            ['مبكرا', 'Early', 'mubakkiran'],
            ['متأخرا', 'Late', 'mutaakhkhiran'],
            ['كل يوم', 'Every day', 'kull yawm'],
            ['أمس', 'Yesterday', 'ams'],
            ['قبل', 'Before', 'qabl'],
            ['بعد', 'After', 'baad']
        ]
    },
    {
        key: 'shopping', title: 'Shopping and Money', desc: 'Buying things', words: [
            ['نقود', 'Money', 'nuqood'],
            ['سعر', 'Price', 'sir'],
            ['ريال', 'Riyal', 'riyaal'],
            ['دينار', 'Dinar', 'deenaar'],
            ['درهم', 'Dirham', 'dirham'],
            ['جنيه', 'Pound', 'juneh'],
            ['خصم', 'Discount', 'khasm'],
            ['فاتورة', 'Bill', 'faatoora'],
            ['بائع', 'Seller', 'baai'],
            ['بضاعة', 'Goods', 'bidaa'],
            ['غالي', 'Expensive', 'ghaali'],
            ['رخيص', 'Cheap', 'rakhees']
        ]
    },
    {
        key: 'hobbies', title: 'Hobbies and Sport', desc: 'Free time', words: [
            ['رياضة', 'Sport', 'riyaada'],
            ['كرة القدم', 'Football', 'kurat al-qadam'],
            ['سباحة', 'Swimming', 'sibaaha'],
            ['موسيقى', 'Music', 'moo seeqa'],
            ['أغنية', 'Song', 'ughniya'],
            ['فيلم', 'Film', 'film'],
            ['لعبة', 'Game', 'luba'],
            ['سفر', 'Travel', 'safar'],
            ['قراءة', 'Reading', 'qiraa'],
            ['رسم', 'Drawing', 'rasm'],
            ['طبخ', 'Cooking', 'tabkh'],
            ['مشي', 'Walking', 'mashy']
        ]
    }
];

// Dialect basics: greetings and everyday talk as people actually say them.
const dialectBasics = {
    emirati: [
        ['مرحبا الساع', 'Welcome', 'marhaba as-saa'],
        ['شحالك؟', 'How are you?', 'shhaalak'],
        ['شخبارك؟', 'What is new?', 'shkhabaarak'],
        ['زين', 'Good', 'zayn'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['شكرا', 'Thank you', 'shukran'],
        ['على راسي', 'With pleasure', 'ala raasi'],
        ['حياك الله', 'God welcome you', 'hayyaak Allah'],
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['نعم', 'Yes', 'naam'],
        ['لا', 'No', 'laa'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama']
    ],
    saudi: [
        ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['وش أخبارك؟', 'What is new?', 'wish akhbaarak'],
        ['الحمد لله بخير', 'Fine, praise God', 'al-hamdu lillah bi-khayr'],
        ['صباح الخير', 'Good morning', 'sabah al-khayr'],
        ['مساء الخير', 'Good evening', 'masaa al-khayr'],
        ['شكرا', 'Thank you', 'shukran'],
        ['الله يعطيك العافية', 'May God give you health', 'Allah yaateek al-aafiya'],
        ['نعم', 'Yes', 'naam'],
        ['لا', 'No', 'laa'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama']
    ],
    omani: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['بخير', 'Fine', 'bi-khayr'],
        ['شكرا جزيلا', 'Thank you very much', 'shukran jazeelan'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['مو مشكلة', 'No problem', 'moo mushkila'],
        ['زين', 'Good', 'zayn'],
        ['حياك الله', 'God welcome you', 'hayyaak Allah'],
        ['نعم', 'Yes', 'naam'],
        ['لا', 'No', 'laa'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['على راسي', 'With pleasure', 'ala raasi']
    ],
    yemeni: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['بخير الحمد لله', 'Fine, praise God', 'bi-khayr al-hamdu lillah'],
        ['شكرا', 'Thank you', 'shukran'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['على راسي', 'With pleasure', 'ala raasi'],
        ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['نعم', 'Yes', 'naam'],
        ['لا', 'No', 'laa'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['تبارك الله', 'Blessed be God', 'tabaarak Allah']
    ],
    kuwaiti: [
        ['شلونك؟', 'How are you?', 'shloonak'],
        ['شخبارك؟', 'What is new?', 'shkhabaarak'],
        ['زين', 'Good', 'zayn'],
        ['مشكور', 'Thank you', 'mashkoor'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['على راسي', 'With pleasure', 'ala raasi'],
        ['نعم', 'Yes', 'naam'],
        ['لا', 'No', 'laa'],
        ['حياك الله', 'God welcome you', 'hayyaak Allah'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['يا هلا', 'Hi there', 'ya hala']
    ],
    qatari: [
        ['شلونك؟', 'How are you?', 'shloonak'],
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['زين', 'Good', 'zayn'],
        ['مشكور', 'Thank you', 'mashkoor'],
        ['شخبارك؟', 'What is new?', 'shkhabaarak'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['حياك الله', 'God welcome you', 'hayyaak Allah'],
        ['نعم', 'Yes', 'naam'],
        ['لا', 'No', 'laa'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['على راسي', 'With pleasure', 'ala raasi']
    ],
    bahraini: [
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['شلونك؟', 'How are you?', 'shloonak'],
        ['زين الحمد لله', 'Fine, praise God', 'zayn al-hamdu lillah'],
        ['شكرا', 'Thank you', 'shukran'],
        ['شخبارك؟', 'What is new?', 'shkhabaarak'],
        ['حياك الله', 'God welcome you', 'hayyaak Allah'],
        ['نعم', 'Yes', 'naam'],
        ['لا', 'No', 'laa'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['على راسي', 'With pleasure', 'ala raasi']
    ],
    iraqi: [
        ['شلونك؟', 'How are you? (to a man)', 'shloonak'],
        ['شلونج؟', 'How are you? (to a woman)', 'shloonich'],
        ['زين', 'Good', 'zayn'],
        ['مو زين', 'Not good', 'moo zayn'],
        ['ممنون', 'Thank you', 'mamnoon'],
        ['هلا بيك', 'Welcome', 'hala beek'],
        ['شخبارك؟', 'What is new?', 'shkhabaarak'],
        ['عيني', 'My dear', 'ayni'],
        ['أكيد', 'Of course', 'akeed'],
        ['ماكو مشكلة', 'No problem', 'maako mushkila'],
        ['فدوة', 'You are precious to me', 'fidwa'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama']
    ],
    jordanian: [
        ['أهلا', 'Hello', 'ahlan'],
        ['كيفك؟', 'How are you?', 'keefak'],
        ['ممتاز', 'Excellent', 'mumtaaz'],
        ['شكرا', 'Thank you', 'shukran'],
        ['لو سمحت', 'Excuse me', 'law samaht'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['منيح', 'Good', 'mneeH'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['يعطيك العافية', 'May God give you health', 'yaateek al-aafiya'],
        ['أكيد', 'Of course', 'akeed'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['خلص', 'That is enough', 'khalaS']
    ],
    lebanese: [
        ['مرحبا', 'Hello', 'marhaba'],
        ['كيفك؟', 'How are you?', 'keefak'],
        ['منيح', 'Good', 'mneeH'],
        ['شكرا', 'Thank you', 'shukran'],
        ['الله يبارك فيك', 'God bless you', 'Allah ybaarek feek'],
        ['يلا', 'Let us go', 'yalla'],
        ['أكيد', 'Of course', 'akeed'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['تفضل', 'Go ahead', 'tfaddal'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['تكرم', 'You are welcome', 'tikram']
    ],
    palestinian: [
        ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
        ['كيفك؟', 'How are you?', 'keefak'],
        ['بخير الحمد لله', 'Fine, praise God', 'bi-khayr al-hamdu lillah'],
        ['شكرا', 'Thank you', 'shukran'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['يا هلا', 'Welcome', 'ya hala'],
        ['منيح', 'Good', 'mneeH'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['يعطيك العافية', 'May God give you health', 'yaateek al-aafiya'],
        ['أكيد', 'Of course', 'akeed'],
        ['خلص', 'That is enough', 'khalaS'],
        ['تفضل', 'Go ahead', 'tfaddal']
    ],
    syrian: [
        ['أهلا', 'Hello', 'ahlan'],
        ['كيفك؟', 'How are you?', 'keefak'],
        ['منيح', 'Good', 'mneeH'],
        ['شكرا', 'Thank you', 'shukran'],
        ['تكرم', 'You are welcome', 'tikram'],
        ['شو أخبارك؟', 'What is new?', 'shu akhbaarak'],
        ['يلا', 'Let us go', 'yalla'],
        ['أكيد', 'Of course', 'akeed'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['تكرم عينك', 'At your service', 'tikram aynak']
    ],
    egyptian: [
        ['أهلا', 'Hi', 'ahlan'],
        ['عامل إيه؟', 'How are you?', 'aamil eeh'],
        ['كويس', 'Good', 'kwayyis'],
        ['شكرا', 'Thank you', 'shukran'],
        ['عفوا', 'You are welcome', 'afwan'],
        ['يا جماعة', 'Everyone, folks', 'ya gamaa'],
        ['تمام', 'Perfect, fine', 'tamaam'],
        ['معلش', 'Never mind', 'maalish'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['ربنا يكرمك', 'May God honour you', 'rabbena yikrimak'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['يا باشا', 'Sir, boss', 'ya baasha']
    ],
    libyan: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['كويس', 'Good', 'kwayyis'],
        ['شكرا', 'Thank you', 'shukran'],
        ['نعم', 'Yes', 'naam'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['لاباس', 'Fine', 'laabas'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['مليح', 'Good', 'mleeH'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['على راسي', 'With pleasure', 'ala raasi']
    ],
    tunisian: [
        ['أهلا', 'Hi', 'ahlan'],
        ['كيفاش؟', 'How are you?', 'kifaash'],
        ['مزيان', 'Good', 'mizyaan'],
        ['بارك الله فيك', 'Thank you', 'baarak Allahu feek'],
        ['نعم', 'Yes', 'naam'],
        ['باهي', 'Okay', 'baahi'],
        ['لاباس', 'Fine', 'laabas'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['يعيشك', 'Thank you, please', 'yeeshek'],
        ['بسلامة', 'Goodbye', 'b-slaama'],
        ['عيشك', 'Please, thank you', 'ayshek'],
        ['صحة', 'Cheers, health', 'sahha']
    ],
    algerian: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['واش راك؟', 'How are you?', 'waash raak'],
        ['لاباس', 'Fine', 'laabas'],
        ['شكرا', 'Thank you', 'shukran'],
        ['أهلا', 'Welcome', 'ahlan'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['مليح', 'Good', 'mleeH'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['بصحتك', 'Enjoy, to your health', 'b-sahtek'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['صحيت', 'Thank you', 'sahheet'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ],
    moroccan: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['لاباس؟', 'How are you?', 'laabas'],
        ['لاباس', 'I am fine', 'laabas'],
        ['شكرا', 'Thank you', 'shukran'],
        ['صافي', 'Okay, that is it', 'saafi'],
        ['بسلامة', 'Goodbye', 'b-slaama'],
        ['مزيان', 'Good', 'mizyaan'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الله يخليك', 'Please, may God keep you', 'Allah ykhalleek'],
        ['خويا', 'My brother', 'khoya'],
        ['واخا', 'Okay', 'waakha'],
        ['بصحة', 'To your health', 'b-sahha']
    ],
    mauritanian: [
        ['أهلا', 'Hello', 'ahlan'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['لاباس', 'I am fine', 'laabas'],
        ['شكرا', 'Thank you', 'shukran'],
        ['نعم', 'Yes', 'naam'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['زين', 'Good', 'zayn'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ],
    sudanese: [
        ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
        ['كيف حالك؟', 'How are you?', 'kayf haalak'],
        ['كويس الحمد لله', 'Fine, praise God', 'kwayyis al-hamdu lillah'],
        ['شكرا', 'Thank you', 'shukran'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['زين', 'Good', 'zayn'],
        ['يا زول', 'Hey, you', 'ya zool'],
        ['شديد', 'Very', 'shadeed'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['أكيد', 'Of course', 'akeed']
    ],
    mali: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['لاباس', 'I am fine', 'laabas'],
        ['شكرا', 'Thank you', 'shukran'],
        ['نعم', 'Yes', 'naam'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['زين', 'Good', 'zayn'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ],
    niger: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['لاباس الحمد لله', 'Fine, praise God', 'laabas al-hamdu lillah'],
        ['شكرا', 'Thank you', 'shukran'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['نعم', 'Yes', 'naam'],
        ['زين', 'Good', 'zayn'],
        ['أهلا', 'Hello', 'ahlan'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ],
    senegal: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['بخير', 'Fine', 'bi-khayr'],
        ['شكرا', 'Thank you', 'shukran'],
        ['نعم', 'Yes', 'naam'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ],
    comorian: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['بخير', 'Fine', 'bi-khayr'],
        ['شكرا', 'Thank you', 'shukran'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['أهلا', 'Hello', 'ahlan'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['مرحبا', 'Hello', 'marhaban'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['نعم', 'Yes', 'naam'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek']
    ],
    djiboutian: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['بخير الحمد لله', 'Fine, praise God', 'bi-khayr al-hamdu lillah'],
        ['شكرا', 'Thank you', 'shukran'],
        ['نعم', 'Yes', 'naam'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['مرحبا', 'Hello', 'marhaban'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['أكيد', 'Of course', 'akeed'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek']
    ],
    somalian: [
        ['السلام عليكم', 'Peace be upon you', 'as-salaamu alaykum'],
        ['كيف الحال؟', 'How are you?', 'kayf al-haal'],
        ['بخير', 'Fine', 'bi-khayr'],
        ['شكرا', 'Thank you', 'shukran'],
        ['مع السلامة', 'Goodbye', 'maa as-salaama'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['أهلا وسهلا', 'Welcome', 'ahlan wa sahlan'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['مرحبا', 'Hello', 'marhaban'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['نعم', 'Yes', 'naam'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek']
    ]
};

// Local words: the everyday vocabulary that marks each dialect out.
const dialectWords = {
    emirati: [
        ['شحالك', 'How are you', 'shhaalak'],
        ['شخبارك', 'How are things', 'shkhabaarak'],
        ['واجد', 'A lot', 'waajid'],
        ['مب', 'Not', 'mub'],
        ['الحين', 'Now', 'alHeen'],
        ['سيدا', 'Straight ahead', 'seedah'],
        ['توه', 'Just now', 'tawwuh'],
        ['عيل', 'So, then', 'ayl'],
        ['دكان', 'Small shop', 'dukkaan'],
        ['خاشوقة', 'Spoon', 'khaashooga'],
        ['يزا', 'Enough, stop', 'yizza'],
        ['غاوي', 'Nice, good', 'ghaawi']
    ],
    saudi: [
        ['وش', 'What', 'wish'],
        ['ايش', 'What', 'aysh'],
        ['ابغى', 'I want', 'abgha'],
        ['الحين', 'Now', 'alHeen'],
        ['دحين', 'Now (Hijazi)', 'daHeen'],
        ['مرة', 'Very', 'marra'],
        ['كذا', 'Like this', 'kitha'],
        ['وين', 'Where', 'wayn'],
        ['ليش', 'Why', 'laysh'],
        ['خلاص', 'Enough, done', 'khalaaS'],
        ['طيب', 'Okay', 'tayyib'],
        ['ما فيه', 'There is none', 'maa feeh']
    ],
    omani: [
        ['غاوي', 'Good, nice', 'ghaawi'],
        ['واجد', 'A lot', 'waajid'],
        ['تو', 'Now', 'taw'],
        ['عاد', 'Then, also', 'aad'],
        ['هيه', 'Yes', 'heeh'],
        ['سير', 'Go', 'seer'],
        ['مو', 'Not', 'moo'],
        ['شو', 'What', 'shu'],
        ['زين', 'Good', 'zayn'],
        ['يالله', 'Come on', 'yallah'],
        ['حالمو', 'How about', 'haalmu'],
        ['ما شي', 'There is nothing', 'maa shay']
    ],
    yemeni: [
        ['يشتي', 'Do you want', 'yashti'],
        ['ما شي', 'There is nothing', 'maa shay'],
        ['وين', 'Where', 'wayn'],
        ['الحين', 'Now', 'alHeen'],
        ['زين', 'Good', 'zayn'],
        ['على راسي', 'With pleasure', 'ala raasi'],
        ['شو', 'What', 'shu'],
        ['كيف', 'How', 'kayf'],
        ['عشان', 'Because, for', 'ashaAN'],
        ['يالله', 'Come on', 'yallah'],
        ['سمح', 'Excuse me', 'smaH'],
        ['قد', 'Already, since', 'qad']
    ],
    kuwaiti: [
        ['شنو', 'What', 'shinu'],
        ['وايد', 'A lot', 'waayid'],
        ['چذي', 'Like this', 'chithi'],
        ['اكو', 'There is', 'aku'],
        ['ماكو', 'There is none', 'maaku'],
        ['يبه', 'Dad', 'yuba'],
        ['يمة', 'Mum', 'yumma'],
        ['عيل', 'So, then', 'ayl'],
        ['توه', 'Just now', 'tawwuh'],
        ['الحين', 'Now', 'alHeen'],
        ['ليش', 'Why', 'laysh'],
        ['خلاص', 'Enough, done', 'khalaaS']
    ],
    qatari: [
        ['شنو', 'What', 'shinu'],
        ['وايد', 'A lot', 'waayid'],
        ['چذي', 'Like this', 'chithi'],
        ['اكو', 'There is', 'aku'],
        ['ماكو', 'There is none', 'maaku'],
        ['ابغي', 'I want', 'abghi'],
        ['شخبارك', 'How are things', 'shkhabaarak'],
        ['الحين', 'Now', 'alHeen'],
        ['عيل', 'So, then', 'ayl'],
        ['يبه', 'Dad', 'yuba'],
        ['ليش', 'Why', 'laysh'],
        ['زين', 'Good', 'zayn']
    ],
    bahraini: [
        ['شنو', 'What', 'shinu'],
        ['وايد', 'A lot', 'waayid'],
        ['چذي', 'Like this', 'chithi'],
        ['اكو', 'There is', 'aku'],
        ['ماكو', 'There is none', 'maaku'],
        ['عيل', 'So, then', 'ayl'],
        ['توه', 'Just now', 'tawwuh'],
        ['الحين', 'Now', 'alHeen'],
        ['شخبارك', 'How are things', 'shkhabaarak'],
        ['زين', 'Good', 'zayn'],
        ['ليش', 'Why', 'laysh'],
        ['ابغي', 'I want', 'abghi']
    ],
    iraqi: [
        ['شنو', 'What', 'shinu'],
        ['مو', 'Not', 'moo'],
        ['هسه', 'Now', 'hassa'],
        ['ليش', 'Why', 'laysh'],
        ['اكو', 'There is', 'aku'],
        ['ماكو', 'There is none', 'maaku'],
        ['هواية', 'A lot', 'hwaaya'],
        ['شوية', 'A little', 'shwayya'],
        ['خوش', 'Good, nice', 'khosh'],
        ['عيني', 'My dear', 'ayni'],
        ['ترة', 'So, then', 'tara'],
        ['فدوة', 'You are precious', 'fidwa']
    ],
    jordanian: [
        ['شو', 'What', 'shu'],
        ['وين', 'Where', 'wayn'],
        ['هسع', 'Now', 'hassa'],
        ['ليش', 'Why', 'laysh'],
        ['كتير', 'A lot', 'kteer'],
        ['شوي', 'A little', 'shway'],
        ['منيح', 'Good', 'mneeH'],
        ['زلمة', 'Man, guy', 'zalame'],
        ['عال العال', 'Excellent', 'aal al-aal'],
        ['خلص', 'Enough, done', 'khalaS'],
        ['مبلا', 'Yes indeed', 'mabla'],
        ['يعطيك العافية', 'May God give you health', 'yaateek al-aafiya']
    ],
    lebanese: [
        ['شو', 'What', 'shu'],
        ['وين', 'Where', 'wayn'],
        ['هلق', 'Now', 'halla'],
        ['ليش', 'Why', 'laysh'],
        ['كتير', 'A lot', 'kteer'],
        ['شوي', 'A little', 'shway'],
        ['منيح', 'Good', 'mneeH'],
        ['عنجد', 'Really', 'anjad'],
        ['خيي', 'My brother', 'khayye'],
        ['يلا', 'Let us go', 'yalla'],
        ['مبلا', 'Yes indeed', 'mabla'],
        ['تيب', 'Okay then', 'teeb']
    ],
    palestinian: [
        ['شو', 'What', 'shu'],
        ['وين', 'Where', 'wayn'],
        ['هسا', 'Now', 'hassa'],
        ['ليش', 'Why', 'laysh'],
        ['كتير', 'A lot', 'kteer'],
        ['شوي', 'A little', 'shway'],
        ['منيح', 'Good', 'mneeH'],
        ['زلمة', 'Man, guy', 'zalame'],
        ['عنجد', 'Really', 'anjad'],
        ['خلص', 'Enough, done', 'khalaS'],
        ['يعطيك العافية', 'May God give you health', 'yaateek al-aafiya'],
        ['دار', 'House, home', 'daar']
    ],
    syrian: [
        ['شو', 'What', 'shu'],
        ['وين', 'Where', 'wayn'],
        ['هلق', 'Now', 'halla'],
        ['ليش', 'Why', 'laysh'],
        ['كتير', 'A lot', 'kteer'],
        ['شوي', 'A little', 'shway'],
        ['منيح', 'Good', 'mneeH'],
        ['عنجد', 'Really', 'anjad'],
        ['خيي', 'My brother', 'khayye'],
        ['تكرم', 'You are welcome', 'tikram'],
        ['يلا', 'Let us go', 'yalla'],
        ['شغل', 'Work', 'shughl']
    ],
    egyptian: [
        ['ايه', 'What', 'eeh'],
        ['فين', 'Where', 'feen'],
        ['ازاي', 'How', 'ezzay'],
        ['ليه', 'Why', 'leeh'],
        ['دلوقتي', 'Now', 'dilwaqti'],
        ['كتير', 'A lot', 'keteer'],
        ['شوية', 'A little', 'shwayya'],
        ['عايز', 'I want', 'aayiz'],
        ['اوي', 'Very', 'awi'],
        ['خلاص', 'Enough, done', 'khalaas'],
        ['حلو', 'Nice, sweet', 'Helw'],
        ['معلش', 'Never mind', 'maalish']
    ],
    libyan: [
        ['شني', 'What', 'shni'],
        ['فين', 'Where', 'feen'],
        ['دروك', 'Now', 'darwak'],
        ['برشة', 'A lot', 'barsha'],
        ['شوية', 'A little', 'shwayya'],
        ['كويس', 'Good', 'kwayyis'],
        ['لاباس', 'Fine', 'laabas'],
        ['مليح', 'Good', 'mleeH'],
        ['علاش', 'Why', 'alaash'],
        ['هكا', 'Like this', 'hakka'],
        ['ياسر', 'A lot', 'yaaser'],
        ['توحشتك', 'I missed you', 'tawaHashtak']
    ],
    tunisian: [
        ['شنوة', 'What', 'shnuwa'],
        ['وين', 'Where', 'ween'],
        ['توة', 'Now', 'tawa'],
        ['برشة', 'A lot', 'barsha'],
        ['شوية', 'A little', 'shwayya'],
        ['باهي', 'Good, okay', 'baahi'],
        ['مزيان', 'Good', 'mizyaan'],
        ['لاباس', 'Fine', 'laabas'],
        ['علاش', 'Why', 'alaash'],
        ['ياخي', 'Is it not so', 'yaakhi'],
        ['عيشك', 'Please, thank you', 'ayshek'],
        ['برشا', 'A lot', 'barsha']
    ],
    algerian: [
        ['واش', 'What', 'waash'],
        ['وين', 'Where', 'ween'],
        ['دروك', 'Now', 'darwak'],
        ['بزاف', 'A lot', 'bezzaaf'],
        ['شوية', 'A little', 'shwayya'],
        ['مليح', 'Good', 'mleeH'],
        ['لاباس', 'Fine', 'laabas'],
        ['علاش', 'Why', 'alaash'],
        ['صحيت', 'Thank you', 'sahheet'],
        ['كاش', 'Is there any', 'kaash'],
        ['ياخي', 'Is it not so', 'yaakhi'],
        ['بصحتك', 'To your health', 'b-sahtek']
    ],
    moroccan: [
        ['شنو', 'What', 'shnu'],
        ['فين', 'Where', 'feen'],
        ['دابا', 'Now', 'daba'],
        ['بزاف', 'A lot', 'bezzaaf'],
        ['شوية', 'A little', 'shwiya'],
        ['مزيان', 'Good', 'mizyaan'],
        ['لاباس', 'Fine', 'laabas'],
        ['علاش', 'Why', 'alaash'],
        ['واخا', 'Okay', 'waakha'],
        ['صافي', 'That is it', 'saafi'],
        ['خويا', 'My brother', 'khoya'],
        ['زعما', 'Meaning, so to speak', 'zaama']
    ],
    mauritanian: [
        ['أش', 'What', 'ash'],
        ['وين', 'Where', 'ween'],
        ['وكتاه', 'When', 'waktaah'],
        ['كيفاش', 'How', 'kifaash'],
        ['لاباس', 'Fine', 'laabas'],
        ['زين', 'Good', 'zayn'],
        ['بزاف', 'A lot', 'bezzaaf'],
        ['شوية', 'A little', 'shwiya'],
        ['أحمد الله', 'Praise God', 'ahmad Allah'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['صافي', 'That is it', 'saafi']
    ],
    sudanese: [
        ['شنو', 'What', 'shinu'],
        ['وين', 'Where', 'ween'],
        ['زول', 'Person', 'zool'],
        ['شديد', 'Very', 'shadeed'],
        ['كويس', 'Good', 'kwayyis'],
        ['قاعد', 'In the process of', 'gaaid'],
        ['عشان', 'Because, for', 'ashaAN'],
        ['ياخ', 'Hey you', 'yaakh'],
        ['كيفنك', 'How are you', 'keefnak'],
        ['دحين', 'Now', 'daHeen'],
        ['عليك الله', 'Please, for God', 'alayk Allah'],
        ['مافي', 'There is none', 'maafi']
    ],
    mali: [
        ['لاباس', 'Fine', 'laabas'],
        ['زين', 'Good', 'zayn'],
        ['بزاف', 'A lot', 'bezzaaf'],
        ['شوية', 'A little', 'shwiya'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['أش', 'What', 'ash'],
        ['وين', 'Where', 'ween'],
        ['كيفاش', 'How', 'kifaash'],
        ['سمحلي', 'Excuse me', 'samhili'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['صافي', 'That is it', 'saafi']
    ],
    niger: [
        ['لاباس', 'Fine', 'laabas'],
        ['زين', 'Good', 'zayn'],
        ['بزاف', 'A lot', 'bezzaaf'],
        ['شوية', 'A little', 'shwiya'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['أش', 'What', 'ash'],
        ['وين', 'Where', 'ween'],
        ['كيفاش', 'How', 'kifaash'],
        ['سمحلي', 'Excuse me', 'samhili'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['صافي', 'That is it', 'saafi']
    ],
    senegal: [
        ['لاباس', 'Fine', 'laabas'],
        ['زين', 'Good', 'zayn'],
        ['شوية', 'A little', 'shwiya'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['أش', 'What', 'ash'],
        ['وين', 'Where', 'ween'],
        ['كيفاش', 'How', 'kifaash'],
        ['سمحلي', 'Excuse me', 'samhili'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['صافي', 'That is it', 'saafi'],
        ['يا هلا', 'Hi there', 'ya hala']
    ],
    comorian: [
        ['زين', 'Good', 'zayn'],
        ['لاباس', 'Fine', 'laabas'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['وين', 'Where', 'ween'],
        ['شوية', 'A little', 'shwiya'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['صافي', 'That is it', 'saafi'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['مرحبا', 'Hello', 'marhaba'],
        ['أكيد', 'Of course', 'akeed'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ],
    djiboutian: [
        ['زين', 'Good', 'zayn'],
        ['لاباس', 'Fine', 'laabas'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['وين', 'Where', 'ween'],
        ['شوية', 'A little', 'shwiya'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['صافي', 'That is it', 'saafi'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['مرحبا', 'Hello', 'marhaba'],
        ['أكيد', 'Of course', 'akeed'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ],
    somalian: [
        ['زين', 'Good', 'zayn'],
        ['لاباس', 'Fine', 'laabas'],
        ['إن شاء الله', 'God willing', 'in shaa Allah'],
        ['الحمد لله', 'Praise God', 'al-hamdu lillah'],
        ['وين', 'Where', 'ween'],
        ['شوية', 'A little', 'shwiya'],
        ['بارك الله فيك', 'God bless you', 'baarak Allahu feek'],
        ['صافي', 'That is it', 'saafi'],
        ['يا هلا', 'Hi there', 'ya hala'],
        ['مرحبا', 'Hello', 'marhaba'],
        ['أكيد', 'Of course', 'akeed'],
        ['بسلامة', 'Goodbye', 'b-slaama']
    ]
};

// Keep the shared core available for the review/test pool.
const topicPool = {};
coreUnits.forEach(u => { topicPool[u.key] = { title: u.title, desc: u.desc, words: u.words }; });

const toWord = t => ({ ar: t[0], en: t[1], tr: t[2] || '' });

// Every word that exists anywhere, used to build distractors and reviews.
const allWords = coreUnits.flatMap(u => u.words.map(toWord))
    .concat(Object.values(dialectBasics).flat().map(toWord))
    .concat(Object.values(dialectWords).flat().map(toWord));

const lessonData = {};

Object.keys(dialectBasics).forEach(dialectId => {
    const units = [];
    units.push({
        id: 1,
        title: 'Basics',
        desc: 'Greetings and everyday talk',
        words: dialectBasics[dialectId].map(toWord)
    });
    units.push({
        id: 2,
        title: 'Local Words',
        desc: 'What people actually say here',
        words: (dialectWords[dialectId] || []).map(toWord)
    });
    coreUnits.forEach((unit, i) => {
        units.push({
            id: i + 3,
            title: unit.title,
            desc: unit.desc,
            words: unit.words.map(toWord)
        });
    });
    lessonData[dialectId] = units;
});
