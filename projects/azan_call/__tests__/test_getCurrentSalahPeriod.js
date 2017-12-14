let getCurrentSalahPeriod = require("../src/services/getCurrentSalahPeriod");
let DateCreator = require("../src/services/date/DateCreator");

let makeFakeSalahs = require("./fakes/makeFake").makeFakeSalahs;
// TODO: create mocks of addDays() and makeSalahObject
const TODAY_DATE_STR = "2016-02-29";

describe("getCurrentSalahPeriod", () => {
    it("handle bad arguments", () => {
        expect(getCurrentSalahPeriod()).toBeFalsy();
    });

    it("now time after fajar and before isha azan", () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        // Call and Assert
        assertTimeBetween(DateCreator.fromISO(TODAY_DATE_STR + "T07:00"), fakeSalahs);
        assertTimeBetween(DateCreator.fromISO(TODAY_DATE_STR + "T14:00"), fakeSalahs);
        assertTimeBetween(DateCreator.fromISO(TODAY_DATE_STR + "T18:00"), fakeSalahs);
        assertTimeBetween(DateCreator.fromISO(TODAY_DATE_STR + "T20:00"), fakeSalahs);
    });

    it("now time before fajar", () => {
        // Setup
        let getCurrentSalahPeriod_local = require("../src/services/getCurrentSalahPeriod");
        let now = DateCreator.fromISO(TODAY_DATE_STR + "T04:00");
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let yesterday = DateCreator.fromISO(TODAY_DATE_STR + "T00:00");
        yesterday.setDate(yesterday.getUTCDate() - 1);

        // Call
        let salahPeriod = getCurrentSalahPeriod_local(now.getTime(), fakeSalahs);
        console.log(now.toISOString());
        console.log(now.toISOString());
        console.log(now.toLocaleDateString());
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
        let now = DateCreator.fromISO(TODAY_DATE_STR + "T22:00");
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let tomorrow = DateCreator.fromISO(TODAY_DATE_STR + "T00:00");
        tomorrow.setDate(tomorrow.getUTCDate() + 1);
        
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

