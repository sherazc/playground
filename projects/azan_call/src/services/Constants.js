const SALAH_DURATION_MIN = 15; // 15 Min. Duration for "Salah in progress"
const MAGHRIB_LIMIT_MIN = 40; // 40 Min. Maghrib salah will end in.
module.exports = {
    SALAH_NAMES: ["Fajar", "Zuhar", "Asr", "Maghrib", "Isha", "Shurooq"],
    MAGHRIB_LIMIT_MILLIS: MAGHRIB_LIMIT_MIN * 1000 * 60, 
    SALAH_DURATION_MILLIS: SALAH_DURATION_MIN * 1000 * 60, 
    SALAH_DURATION_MIN,
    MAGHRIB_LIMIT_MIN,
    SERVICE_URL: 'http://dashboard.masjidhamzah.com/salat_time.php',
    FETCH_SALAH_TIME_INTERVAL_MILLIS: 30 * 60 * 1000,
    UPDATE_UI_INTERVAL_MILLIS: 1000,
    ALERT_RED: "ALERT_RED",
    ALERT_GREEN: "ALERT_GREEN",
    ALERT_BLACK: "ALERT_BLACK",
    MAGHRIB_IQAMAH_AFTER_AZAN_MINS: 5,
    AZAN_SALAH_STATUS: {
        AZAN_NOT_CALLED: "AZAN_NOT_CALLED",
        AZAN_CALLED: "AZAN_CALLED",
        SALAH_IN_PROGRESS: "SALAH_IN_PROGRESS",
        SALAH_DONE: "SALAH_DONE"
    },
};