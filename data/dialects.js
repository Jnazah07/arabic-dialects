// All requested Arabic dialects + comprehensive set
const dialects = [
    // Gulf/Mashriq (Eastern) - requested
    { id: 'emirati', nameAr: 'اللهجة الإماراتية', nameEn: 'Emirati (UAE)', flag: '🇦🇪', region: 'Gulf' },
    { id: 'saudi', nameAr: 'اللهجة السعودية', nameEn: 'Saudi (Hijazi/Najdi)', flag: '🇸🇦', region: 'Gulf' },
    { id: 'omani', nameAr: 'اللهجة العمانية', nameEn: 'Omani', flag: '🇴🇲', region: 'Gulf' },
    { id: 'yemeni', nameAr: 'اللهجة اليمنية', nameEn: 'Yemeni', flag: '🇾🇪', region: 'Gulf' },
    { id: 'kuwaiti', nameAr: 'اللهجة الكويتية', nameEn: 'Kuwaiti', flag: '🇰🇼', region: 'Gulf' },
    { id: 'qatari', nameAr: 'اللهجة القطرية', nameEn: 'Qatari', flag: '🇶🇦', region: 'Gulf' },
    { id: 'bahraini', nameAr: 'اللهجة البحرينية', nameEn: 'Bahraini', flag: '🇧🇭', region: 'Gulf' },
    
    // West African (Sahel) - requested
    { id: 'mali', nameAr: 'اللهجة المالاوية العربية', nameEn: 'Malian Arabic', flag: '🇲🇱', region: 'West Africa' },
    { id: 'niger', nameAr: 'العربية النيجيرية', nameEn: 'Nigerien Arabic', flag: '🇳🇪', region: 'West Africa' },
    { id: 'senegal', nameAr: 'العربية السنغالية', nameEn: 'Senegalese Arabic', flag: '🇸🇳', region: 'West Africa' },
    
    // Iraq - requested
    { id: 'iraqi', nameAr: 'اللهجة العراقية', nameEn: 'Iraqi (Mesopotamian)', flag: '🇮🇶', region: 'Iraq' },
    
    // Levantine - requested
    { id: 'jordanian', nameAr: 'اللهجة الأردنية', nameEn: 'Jordanian', flag: '🇯🇴', region: 'Levant' },
    { id: 'lebanese', nameAr: 'اللهجة اللبنانية', nameEn: 'Lebanese', flag: '🇱🇧', region: 'Levant' },
    { id: 'palestinian', nameAr: 'اللهجة الفلسطينية', nameEn: 'Palestinian', flag: '🇵🇸', region: 'Levant' },
    { id: 'syrian', nameAr: 'اللهجة السورية', nameEn: 'Syrian', flag: '🇸🇾', region: 'Levant' },
    
    // Maghreb - requested
    { id: 'algerian', nameAr: 'اللهجة الجزائرية', nameEn: 'Algerian Darija', flag: '🇩🇿', region: 'Maghreb' },
    { id: 'egyptian', nameAr: 'اللهجة المصرية', nameEn: 'Egyptian (Masri)', flag: '🇪🇬', region: 'Nile Valley' },
    { id: 'libyan', nameAr: 'اللهجة الليبية', nameEn: 'Libyan', flag: '🇱🇾', region: 'Maghreb' },
    { id: 'mauritanian', nameAr: 'الحسانية الموريتانية', nameEn: 'Mauritanian Hassaniya', flag: '🇲🇷', region: 'Maghreb' },
    { id: 'moroccan', nameAr: 'اللهجة المغربية', nameEn: 'Moroccan Darija', flag: '🇲🇦', region: 'Maghreb' },
    { id: 'sudanese', nameAr: 'اللهجة السودانية', nameEn: 'Sudanese', flag: '🇸🇩', region: 'Nile Valley' },
    { id: 'tunisian', nameAr: 'اللهجة التونسية', nameEn: 'Tunisian Darija', flag: '🇹🇳', region: 'Maghreb' },
    
    // Horn of Africa - requested
    { id: 'comorian', nameAr: 'العربية القمرية', nameEn: 'Comorian Arabic', flag: '🇰🇲', region: 'Horn' },
    { id: 'djiboutian', nameAr: 'اللهجة الجيبوتية', nameEn: 'Djiboutian Arabic', flag: '🇩🇯', region: 'Horn' },
    { id: 'somalian', nameAr: 'اللهجة الصومالية', nameEn: 'Somali Arabic', flag: '🇸🇴', region: 'Horn' },
];