import { isSameMonthDate, getSystemTimezone, getSystemTimezoneDateIsoString, DATE_TIME_REGX } from "../src/services/DateService";

describe("Compare dates", () => {
    it("isSameMonthDate", () => {
        expect(isSameMonthDate()).toBe(false);
        expect(isSameMonthDate(1)).toBe(false);
        expect(isSameMonthDate(1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1, 1)).toBe(true);
    });
});


describe("Timezone", () => {

    it("getSystemTimezone()", () => {
        const systemTimezone = getSystemTimezone();
        const timeRegex = /^[+-]([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
        expect(systemTimezone).toMatch(timeRegex);
    });

    it("getSystemTimezoneIsoString() no date argument", () => {
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString();
        const systemTimezone = getSystemTimezone();
        expect(systemTimezoneDateIsoString).toMatch(DATE_TIME_REGX);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });

    it("getSystemTimezoneIsoString() date passed", () => {
        const dateString = '2022-04-01T00:00:00-04:00';
        const date = new Date(dateString);
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString(date);
        const systemTimezone = getSystemTimezone();
        expect(systemTimezoneDateIsoString).toBe(dateString);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });

});

