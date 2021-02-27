const today = new Date();
const yearStartGregorian = today.getFullYear() - 2;
const yearStartHijri = today.getFullYear() - 581;

export const calendarTypes = ["Gregorian", "Hijri"];

export const monthsGregorian = ["All Months", "1 - January", "2 - February", "3 - March", "4 - April", "5 - May", "6 - June",
    "7 - July", "8 - August", "9 - September", "10 - October", "11 - November", "12 - December"];

export const monthsHijri = ["All Months", "1 - Al-Muḥarram - ٱلْمُحَرَّم", "2 - Ṣafar - صَفَر", "3 - Rabīʿ al-ʾAwwal - رَبِيع ٱلْأَوَّل",
    "4 - Rabīʿ ath-Thānī - رَبِيع ٱلثَّانِي", "5 - Jumadā al-ʾŪlā - جُمَادَىٰ ٱلْأُولَىٰ",
    "6 - Jumādā ath-Thāniyah - جُمَادَىٰ ٱلثَّانِيَة", "7 - Rajab - رَجَب", "8 - Shaʿbān - شَعْبَان",
    "9 - Ramaḍān - رَمَضَان", "10 - Shawwāl - شَوَّال", "11 - Ḏū al-Qaʿdah - ذُو ٱلْقَعْدَة",
    "12 - Ḏū al-Ḥijjah - ذُو ٱلْحِجَّة"];

export const yearsGregorian = Array(10)
    .fill(yearStartGregorian)
    .map((v, i) => i + v);

export const yearsHijri = Array(10)
    .fill(yearStartHijri)
    .map((v, i) => i + v);

