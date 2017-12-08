let getCurrentSalahPeriod = require("../src/services/getCurrentSalahPeriod");

describe("getCurrentSalahPeriod", () => {
    it.skip("handle bad arguments", () => {
        expect(getCurrentSalahPeriod()).toBeFalsy();
    });

    it("now within Fajar", () => {
        let now = new Date("2016-02-29T06:15:00");
        let fakeSalahs = makeFakeSalahs();
        let salahPeriod = getCurrentSalahPeriod(now.getTime(), fakeSalahs);
        console.log(salahPeriod);

    });
});

function makeFakeSalahs() {
    return [
        {name: "Fajar", azan: new Date("2016-02-29T06:00:00"), iqmah: new Date("2016-02-29T06:30:00")},
        {name: "Zuhar", azan: new Date("2016-02-29T13:00:00"), iqmah: new Date("2016-02-29T13:30:00")},
        {name: "Asr", azan: new Date("2016-02-29T17:00:00"), iqmah: new Date("2016-02-29T17:30:00")},
        {name: "Maghrib", azan: new Date("2016-02-29T19:00:00"), iqmah: new Date("2016-02-29T19:30:00")},
        {name: "Isha", azan: new Date("2016-02-29T21:00:00"), iqmah: new Date("2016-02-29T21:30:00")},
    ];
}