const SALAH_DURATION_MIN = 15; // 15 Min. Duration for "Salah in progress"
const MAGHRIB_LIMIT_MIN = 40; // 40 Min. Maghrib salah will end in.
module.exports = {
    SALAH_NAMES: ["Fajar", "Zuhar", "Asr", "Maghrib", "Isha", "Shurooq"],
    MAGHRIB_LIMIT_MILLIS: MAGHRIB_LIMIT_MIN * 1000 * 60, 
    SALAH_DURATION_MILLIS: SALAH_DURATION_MIN * 1000 * 60, 
    SALAH_DURATION_MIN,
    MAGHRIB_LIMIT_MIN,
}