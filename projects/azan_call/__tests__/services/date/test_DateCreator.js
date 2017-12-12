const DateCreator = require("../../../src/services/date/DateCreator");

describe("DateCreator", () => {
    it("now should return current UTC Date", () => {
        let now = DateCreator.now();
        expect(now).toBeTruthy();
    });

    it("fromISO handle bad arguments", () => {
        expect(DateCreator.fromISO()).toBeFalsy();
    });

    it("fromISO handle string", () => {
        let date = DateCreator.fromISO("2016-02-29T18:40:50.000Z");
        // (new Date()).getUTCFullYear
        //console.log(getUTCFullYear())
        expect(date.getUTCFullYear()).toBe(2016);
        expect(date.getUTCMonth()).toBe(1);
        expect(date.getUTCDay()).toBe(29);
        
        expect(date.getUTCFullYear()).toBe(2016);
        expect(date.getUTCFullYear()).toBe(2016);
        expect(date.getUTCFullYear()).toBe(2016);
        
    });
});