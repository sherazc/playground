const processSalahs = require("../src/services/processSalahs");
const makeFakeSalahs = require("./fakes/makeFake").makeFakeSalahs;
const Constants = require("../src/services/Constants");

const TODAY_DATE_STR = "2016-02-29";

describe.skip("processSalahs", () => {
    it("be Thruthy", () => {
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

    it(`${Constants.SALAH_NAMES[2]} azan not called. No azan time. Now passed iqmah`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T17:45");

        // Call
        let result = processSalahs(now, fakeSalahs);

        // Assert
        expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[2]} azan not called`);
    });


    it(`${Constants.SALAH_NAMES[2]} azan not called. azanCalledDateTime still ${Constants.SALAH_NAMES[1]}.`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T17:15");
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T14:00");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);

        // Assert
        expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[2]} azan not called`);
    });

    it(`${Constants.SALAH_NAMES[2]} azan called. azanCalledDateTime after azan and before iqamah. now before iqmah`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T17:15");
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T17:05");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);
        // Assert
        expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[2]} azan called`);
    });

    it(`${Constants.SALAH_NAMES[2]} salah in progress. azanCalledDateTime after azan and before iqamah. now after iqamah and before progress limit.`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(fakeSalahs[2].iqmah);
        now.setMinutes(now.getMinutes() + Constants.SALAH_DURATION_MIN - 1);
        
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T17:05");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);
        // Assert
        expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[2]} in progress`);
    });

    it(`Next salah ${Constants.SALAH_NAMES[3]}. azanCalledDateTime after azan and before iqamah. now after iqamah and after progress limit.`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(fakeSalahs[2].iqmah);
        now.setMinutes(now.getMinutes() + Constants.SALAH_DURATION_MIN + 1);
        
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T17:05");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);
        // Assert
        expect(result.mainMessage).toBe(`Next salah: ${Constants.SALAH_NAMES[3]}`);
    });
});


describe("processSalahs 2", () => {
    it(`Fajar manual`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T23:00");
        //now.toLocaleString
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T21:05");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);
        // Assert
        //expect(result.mainMessage).toBe(`Next salah: ${Constants.SALAH_NAMES[3]}`);
        console.log(result);
    });


});