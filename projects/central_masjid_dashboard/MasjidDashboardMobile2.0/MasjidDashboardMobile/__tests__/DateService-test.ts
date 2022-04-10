import { isSameMonthDate, getSystemTimezone, getSystemTimezoneDateIsoString, DATE_TIME_REGX, createExpirationDate2, isoDateFixToSystemTimezone, getCurrentSystemDate } from "../src/services/DateService";

describe("Compare dates", () => {
    it("isSameMonthDate", () => {
        expect(isSameMonthDate()).toBe(false);
        expect(isSameMonthDate(1)).toBe(false);
        expect(isSameMonthDate(1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1, 1)).toBe(true);
    });
});

describe("Date", () => {

    it("Create Now Date - getCurrentSystemDate()", () => {
        const date = new Date();
        const currentSystemDate = getCurrentSystemDate();

        expect(date.getFullYear()).toBe(currentSystemDate.getFullYear());
        expect(date.getMonth()).toBe(currentSystemDate.getMonth());
        expect(date.getDate()).toBe(currentSystemDate.getDate());
        expect(date.getHours()).toBe(currentSystemDate.getHours());
        expect(date.getMinutes()).toBe(currentSystemDate.getMinutes());
        expect(date.getSeconds()).toBe(currentSystemDate.getSeconds());
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
        const systemTimezone = getSystemTimezone();
        const dateString = '2022-04-01T00:00:00.000' + systemTimezone;
        const date = new Date(dateString);
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString(date);
        expect(systemTimezoneDateIsoString).toBe(dateString);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });

    it("getSystemTimezoneIsoString() No timezone", () => {
        const systemTimezone = getSystemTimezone();
        const dateString = '2022-04-01T00:00:00.000';
        const date = new Date(dateString);
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString(date);
    
        expect(systemTimezoneDateIsoString.startsWith(dateString)).toBe(true);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });


    it("isoDateFixToSystemTimezone() invalid argument", () => {
        expect(isoDateFixToSystemTimezone()).toBeUndefined();
        expect(isoDateFixToSystemTimezone(null)).toBeUndefined();
        expect(isoDateFixToSystemTimezone("")).toBeUndefined();
        expect(isoDateFixToSystemTimezone("ABC")).toBeUndefined();
        expect(isoDateFixToSystemTimezone("2022-04-01ABC")).toBeUndefined();
        expect(isoDateFixToSystemTimezone("22022-04-01")).toBeUndefined();
    });


    it("isoDateFixToSystemTimezone()", () => {
        let isoDate = isoDateFixToSystemTimezone("2022-04-01");
        expect(isoDate?.startsWith("2022-04-01T00:00:00.000")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone())).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01Z");
        expect(isoDate?.startsWith("2022-04-01T00:00:00.000")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone())).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12");
        expect(isoDate?.startsWith("2022-04-01T12:00:00.000")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone())).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12:12:12.123");
        expect(isoDate?.startsWith("2022-04-01T12:12:12.123")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone())).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12:12:12.123Z");
        expect(isoDate?.startsWith("2022-04-01T12:12:12.123")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone())).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12:12:12.123+12:00");
        expect(isoDate?.startsWith("2022-04-01T12:12:12.123")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone())).toBe(true)
    });
});


describe.skip("Expiration", () => {
    it("createExpirationDate()", () => {
        const expirationDate = createExpirationDate2();
        console.log(expirationDate)
    }); 
});