const CONSTANTS = require("../../src/services/Constants");

function makeFakeSalahs(TODAY_DATE_STR) {
    return [
        {name: CONSTANTS.SALAH_NAMES[0], azan: new Date(TODAY_DATE_STR + "T06:00"), iqmah: new Date(TODAY_DATE_STR + "T06:30")},
        {name: CONSTANTS.SALAH_NAMES[1], azan: new Date(TODAY_DATE_STR + "T13:00"), iqmah: new Date(TODAY_DATE_STR + "T13:30")},
        {name: CONSTANTS.SALAH_NAMES[2], azan: new Date(TODAY_DATE_STR + "T17:00"), iqmah: new Date(TODAY_DATE_STR + "T17:30")},
        {name: CONSTANTS.SALAH_NAMES[3], azan: new Date(TODAY_DATE_STR + "T19:00"), iqmah: new Date(TODAY_DATE_STR + "T19:05")}, // Maghrib Jamah 5 min
        {name: CONSTANTS.SALAH_NAMES[4], azan: new Date(TODAY_DATE_STR + "T21:00"), iqmah: new Date(TODAY_DATE_STR + "T21:30")},
        {name: CONSTANTS.SALAH_NAMES[5], time: new Date(TODAY_DATE_STR + "T08:00")},
    ];
}

let makeFakeSalatTime = () => {
    return {
        "id": "336",
        "prayer_date": "2013-12-02",
        "fajr_athan": "0000-00-00 06:12:00",
        "fajr_iqama": "0000-00-00 06:30:00",
        "thuhr_athan": "0000-00-00 12:27:00",
        "thuhr_iqama": "0000-00-00 14:00:00",
        "asr_athan": "0000-00-00 15:09:00",
        "asr_iqama": "0000-00-00 16:00:00",
        "maghrib_athan": "0000-00-00 17:28:00",
        "maghrib_iqama": "5 Min",
        "isha_athan": "0000-00-00 18:41:00",
        "isha_iqama": "0000-00-00 19:30:00",
        "shurooq": "0000-00-00 07:24:00",
        "maghrib_change": "0000-00-00 17:29:00",
        "maghrib_change_date": "2017-12-12",
        "fajr_change": "0000-00-00 06:45:00",
        "fajr_change_date": "2017-12-13",
        "isha_change": "0000-00-00 19:45:00",
        "isha_change_date": "2018-01-11",
        "asr_change": "0000-00-00 16:30:00",
        "asr_change_date": "2018-01-26"
    };
}

module.exports = {
    makeFakeSalahs, makeFakeSalatTime
};

describe.skip("makeFake", () => {
    it("work");
});