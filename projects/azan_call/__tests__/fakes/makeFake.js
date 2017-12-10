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

module.exports = {
    makeFakeSalahs
};

describe("makeFake", () => {
    it("work")
});