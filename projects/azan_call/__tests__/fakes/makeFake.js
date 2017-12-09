function makeFakeSalahs(TODAY_DATE_STR) {
    return [
        {name: "Fajar", azan: new Date(TODAY_DATE_STR + "T06:00"), iqmah: new Date(TODAY_DATE_STR + "T06:30")},
        {name: "Zuhar", azan: new Date(TODAY_DATE_STR + "T13:00"), iqmah: new Date(TODAY_DATE_STR + "T13:30")},
        {name: "Asr", azan: new Date(TODAY_DATE_STR + "T17:00"), iqmah: new Date(TODAY_DATE_STR + "T17:30")},
        {name: "Maghrib", azan: new Date(TODAY_DATE_STR + "T19:00"), iqmah: new Date(TODAY_DATE_STR + "T19:30")},
        {name: "Isha", azan: new Date(TODAY_DATE_STR + "T21:00"), iqmah: new Date(TODAY_DATE_STR + "T21:30")},
    ];
}

module.exports = {
    makeFakeSalahs
};

describe("makeFake", () => {
    it("work")
});