const DateCreator = require("../../../src/services/date/DateCreator");

describe("DateCreator", () => {
    it("now should return current UTC Date", () => {
        let now = DateCreator.now();
        expect(now).toBeTruthy();
    });

    it("fromISO handle bad arguments", () => {
        expect(DateCreator.fromISO()).toBeFalsy();
    });

    it("fromISO handle full date time string", () => {
        let date = DateCreator.fromISO("2016-02-29 18:40:50.123");
        
        expect(date.getUTCFullYear()).toBe(2016);
        expect(date.getUTCMonth()).toBe(1);
        expect(date.getUTCDate()).toBe(29);
        expect(date.getUTCHours()).toBe(18);
        expect(date.getUTCMinutes()).toBe(40);
        expect(date.getUTCSeconds()).toBe(50);
        expect(date.getUTCMilliseconds()).toBe(123);
        expect(date.toISOString()).toBe("2016-02-29T18:40:50.123Z");
    });

    it("fromISO handle date string", () => {
        let date = DateCreator.fromISO("2016-02-29");
        
        expect(date.getUTCFullYear()).toBe(2016);
        expect(date.getUTCMonth()).toBe(1);
        expect(date.getUTCDate()).toBe(29);
        
        expect(date.getUTCHours()).toBe(0);
        expect(date.getUTCMinutes()).toBe(0);
        expect(date.getUTCSeconds()).toBe(0);
        expect(date.getUTCMilliseconds()).toBe(0);
        expect(date.toISOString()).toBe("2016-02-29T00:00:00.000Z");
    });

    it("fromISO handle falsy", () => {
        expect(DateCreator.fromISO("0000-01-01")).toBeFalsy();
        expect(DateCreator.fromISO("1899-01-01")).toBeFalsy();
        expect(DateCreator.fromISO("3000-01-01")).toBeFalsy();
    });

    it("fromISO handle limits", () => {
        expect(DateCreator.fromISO("1900-01-01").toISOString()).toBe("1900-01-01T00:00:00.000Z");
        expect(DateCreator.fromISO("2999-12-31").toISOString()).toBe("2999-12-31T00:00:00.000Z");
    });
});