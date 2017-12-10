const processSalahs = require("../src/services/processSalahs");
const makeFakeSalahs = require("./fakes/makeFake").makeFakeSalahs;
const Constants = require("../src/services/Constants");

const TODAY_DATE_STR = "2016-02-29";

describe("processSalahs", () => {
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

    
});


describe("processSalahs 2", () => {
    it(`${Constants.SALAH_NAMES[2]} salah in progress. azanCalledDateTime after azan and before iqamah. now after iqamah and before progress limit.`, () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(fakeSalahs[2].iqmah);
        // now.setMinutes(now.)
        
        console.log(now.toLocaleString());
        
        let azanCalledDateTime = new Date(TODAY_DATE_STR + "T17:05");

        // Call
        let result = processSalahs(now, fakeSalahs, azanCalledDateTime);
        // Assert
        //expect(result.mainMessage).toBe(`${Constants.SALAH_NAMES[2]} in progress`);
    });

});