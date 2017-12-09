let getCurrentSalahPeriod = require("../src/services/getCurrentSalahPeriod");

const TODAY_DATE_STR = "2016-02-29";

describe("getCurrentSalahPeriod", () => {
    it("handle bad arguments", () => {
        expect(getCurrentSalahPeriod()).toBeFalsy();
    });

    it("now time after fajar and before isha azan", () => {
        // Setup
        let fakeSalahs = makeFakeSalahs();
        // Call and Assert
        assertTimeBetween(new Date(TODAY_DATE_STR + "T07:00"), fakeSalahs);
        assertTimeBetween(new Date(TODAY_DATE_STR + "T14:00"), fakeSalahs);
        assertTimeBetween(new Date(TODAY_DATE_STR + "T18:00"), fakeSalahs);
        assertTimeBetween(new Date(TODAY_DATE_STR + "T20:00"), fakeSalahs);
    });

    it("now time before fajar", () => {
        // Setup
        let getCurrentSalahPeriod_local = require("../src/services/getCurrentSalahPeriod");
        let now = new Date(TODAY_DATE_STR + "T04:00");
        let fakeSalahs = makeFakeSalahs();
        let yesterday = new Date(TODAY_DATE_STR + "T00:00");
        yesterday.setDate(yesterday.getDate() - 1);

        // Call
        let salahPeriod = getCurrentSalahPeriod_local(now.getTime(), fakeSalahs);

        // Assert
        expect(salahPeriod[0].azan.getTime()).toBeLessThan(now.getTime());
        expect(salahPeriod[1].azan.getTime()).toBeGreaterThan(now.getTime());
        // Asserting yesterday's isha
        expect(salahPeriod[0].azan.toLocaleDateString()).toBe(yesterday.toLocaleDateString());
        expect(salahPeriod[1].azan.toLocaleDateString()).toBe(now.toLocaleDateString());
    });

    it("now time after isha", () => {
        // Setup
        let getCurrentSalahPeriod_local = require("../src/services/getCurrentSalahPeriod");
        let now = new Date(TODAY_DATE_STR + "T22:00");
        let fakeSalahs = makeFakeSalahs();
        let tomorrow = new Date(TODAY_DATE_STR + "T00:00");
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Call
        let salahPeriod = getCurrentSalahPeriod_local(now.getTime(), fakeSalahs);
        
        // Assert
        expect(salahPeriod[0].azan.getTime()).toBeLessThan(now.getTime());
        expect(salahPeriod[1].azan.getTime()).toBeGreaterThan(now.getTime());
        expect(salahPeriod[0].azan.toLocaleDateString()).toBe(now.toLocaleDateString());
        // Asserting tomorrow's fajar
        expect(salahPeriod[1].azan.toLocaleDateString()).toBe(tomorrow.toLocaleDateString());
    });
});

function assertTimeBetween(now, salahTimes) {
    // Call
    let salahPeriod = getCurrentSalahPeriod(now.getTime(), salahTimes);
    //console.log(salahPeriod)
    // Verify
    expect(salahPeriod[0].azan.getTime()).toBeLessThan(now.getTime());
    expect(salahPeriod[1].azan.getTime()).toBeGreaterThan(now.getTime());
    expect(salahPeriod[0].azan.toLocaleDateString()).toBe(now.toLocaleDateString());
    expect(salahPeriod[1].azan.toLocaleDateString()).toBe(now.toLocaleDateString());
}

function makeFakeSalahs() {
    return [
        {name: "Fajar", azan: new Date(TODAY_DATE_STR + "T06:00"), iqmah: new Date(TODAY_DATE_STR + "T06:30")},
        {name: "Zuhar", azan: new Date(TODAY_DATE_STR + "T13:00"), iqmah: new Date(TODAY_DATE_STR + "T13:30")},
        {name: "Asr", azan: new Date(TODAY_DATE_STR + "T17:00"), iqmah: new Date(TODAY_DATE_STR + "T17:30")},
        {name: "Maghrib", azan: new Date(TODAY_DATE_STR + "T19:00"), iqmah: new Date(TODAY_DATE_STR + "T19:30")},
        {name: "Isha", azan: new Date(TODAY_DATE_STR + "T21:00"), iqmah: new Date(TODAY_DATE_STR + "T21:30")},
    ];
}