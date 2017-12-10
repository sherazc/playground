const processSalahs = require("../src/services/processSalahs");
const makeFakeSalahs = require("./fakes/makeFake").makeFakeSalahs;
const Constants = require("../src/services/Constants");

const TODAY_DATE_STR = "2016-02-29";

describe("processSalahs", () => {
    it.skip("be Thruthy", () => {
        let result = processSalahs();
        expect(result).toBeTruthy();
        expect(result.mainMessage).toBeDefined();
        expect(result.subMessage).toBeDefined();
    });

    it(`${Constants.SALAH_NAMES[2]} azan not called. No azan time.`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T17:15");

        // Call
        let result = processSalahs(now, fakeSalahs);

        // Assert
        expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[2]} azan not called`);
    });


    it(`${Constants.SALAH_NAMES[2]} azan not called. Azan time still ${Constants.SALAH_NAMES[1]}.`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T17:15");
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T14:00");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);

        // Assert
        expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[2]} azan not called`);
    });

    it.skip(`${Constants.SALAH_NAMES[0]} azan called`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T06:15");
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T06:05");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);

        // Assert
        //expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[0]} azan called`);
    });
});