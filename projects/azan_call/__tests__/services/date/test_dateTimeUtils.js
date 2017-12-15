const {addDays, addMinutes, msToTime, isTimeBetweenAzans, toISODateString} = require("../../../src/services/date/dateTimeUtils");
const DateCreator = require("../../../src/services/date/DateCreator");

describe("dateTimeUtils", () => {
    const date = DateCreator.fromISO("2017-11-13T13:34:50");
    describe("addDays", () => {
        it("handle undefined", () => {
            expect(addDays()).toBeUndefined();
            expect(addDays(null)).toBeUndefined();
        });

        it("add 10 days", () => {
            let calcDate = addDays(date, 10);
            expect(calcDate.getUTCFullYear()).toBe(2017);
            expect(calcDate.getUTCMonth()).toBe(10);
            expect(calcDate.getUTCDate()).toBe(23);
        });

        it("subtract 10 days", () => {
            let calcDate = addDays(date, -10);
            expect(calcDate.getUTCFullYear()).toBe(2017);
            expect(calcDate.getUTCMonth()).toBe(10);
            expect(calcDate.getUTCDate()).toBe(3);
        });

        it("add 100 days", () => {
            let calcDate = addDays(date, 100);
            expect(calcDate.getUTCFullYear()).toBe(2018);
            expect(calcDate.getUTCMonth()).toBe(1);
            expect(calcDate.getUTCDate()).toBe(21);
        });

        it("subtract 100 days", () => {
            let calcDate = addDays(date, -100);
            expect(calcDate.getUTCFullYear()).toBe(2017);
            expect(calcDate.getUTCMonth()).toBe(7);
            expect(calcDate.getUTCDate()).toBe(5);
        });
    });

    describe("addMinutes", () => {
        it("handle undefined", () => {
            expect(addMinutes()).toBeUndefined();
            expect(addMinutes(null)).toBeUndefined();
        });

        it("add 10 minutes", () => {
            let calcDate = addMinutes(date, 10);
            expect(calcDate.getUTCHours()).toBe(13);
            expect(calcDate.getUTCMinutes()).toBe(44);
            expect(calcDate.getUTCSeconds()).toBe(50);
        });

        it("subtract 10 minutes", () => {
            let calcDate = addMinutes(date, -10);
            expect(calcDate.getUTCHours()).toBe(13);
            expect(calcDate.getUTCMinutes()).toBe(24);
            expect(calcDate.getUTCSeconds()).toBe(50);
        });

        it("add 100 minutes", () => {
            let calcDate = addMinutes(date, 100);
            expect(calcDate.getUTCHours()).toBe(15);
            expect(calcDate.getUTCMinutes()).toBe(14);
            expect(calcDate.getUTCSeconds()).toBe(50);
        });

        it("subtract 100 minutes", () => {
            let calcDate = addMinutes(date, -100);
            expect(calcDate.getUTCHours()).toBe(11);
            expect(calcDate.getUTCMinutes()).toBe(54);
            expect(calcDate.getUTCSeconds()).toBe(50);
        });
    });

    describe("msToTime", () => {
        it("handle undefined", () => {
            expect(msToTime()).toBeUndefined();
            expect(msToTime(null)).toBeUndefined();
        });

        it("zero duration", () => {
            expect(msToTime(0)).toBe("00:00:00");
        });

        it("seconds duration", () => {
            expect(msToTime(1 * 1000)).toBe("00:00:01");
            expect(msToTime(30 * 1000)).toBe("00:00:30");
            expect(msToTime(100 * 1000)).toBe("00:01:40");
            expect(msToTime(1000 * 1000)).toBe("00:16:40");
        });

        it("minutes duration", () => {
            expect(msToTime(1 * 1000 * 60)).toBe("00:01:00");
            expect(msToTime(30 * 1000 * 60)).toBe("00:30:00");
            expect(msToTime(100 * 1000 * 60)).toBe("01:40:00");
            expect(msToTime(1000 * 1000 * 60)).toBe("16:40:00");
        });

        it("hours duration", () => {
            let anHourMillis = 1000 * 60 * 60;
            expect(msToTime(1 * anHourMillis)).toBe("01:00:00");
            expect(msToTime(10 * anHourMillis)).toBe("10:00:00");
            expect(msToTime(100 * anHourMillis)).toBe("100:00:00");
            expect(msToTime(1000 * anHourMillis)).toBe("1000:00:00");
        });
    });

    describe("isTimeBetweenAzans", () => {
        it("Find time between", () => {
            let salahPeriod = [
                {azan: DateCreator.fromISO("2016-02-29T13:00:00")},
                {azan: DateCreator.fromISO("2016-02-29T13:30:00")}
            ];

            let currentTime = DateCreator.fromISO("2016-02-29T13:15:00").getTime();
            expect(isTimeBetweenAzans(currentTime, salahPeriod)).toBeTruthy();
            
            currentTime = DateCreator.fromISO("2016-02-29T12:45:00").getTime();
            expect(isTimeBetweenAzans(currentTime, salahPeriod)).toBeFalsy();
            
            currentTime = DateCreator.fromISO("2016-02-29T13:45:00").getTime();
            expect(isTimeBetweenAzans(currentTime, salahPeriod)).toBeFalsy();
        });

        it("Bad azan arguments", () => {
            expect(isTimeBetweenAzans(null, null)).toBeFalsy();
            expect(isTimeBetweenAzans(null, [])).toBeFalsy();
            expect(isTimeBetweenAzans(null, [1,2,3])).toBeFalsy();
            expect(isTimeBetweenAzans(100, [])).toBeFalsy();
            expect(isTimeBetweenAzans(100, [1,2])).toBeFalsy();

            let salahPeriod = [
                {azan: DateCreator.fromISO("2016-02-29T13:00:00")},
                {azan: DateCreator.fromISO("2016-02-29T13:30:00")}
            ];

            let currentTime = DateCreator.fromISO("2016-02-29T13:15:00").getTime();
            expect(isTimeBetweenAzans(currentTime, salahPeriod)).toBeTruthy();
            
            currentTime = DateCreator.fromISO("2016-02-29T12:45:00").getTime();
            expect(isTimeBetweenAzans(currentTime, salahPeriod)).toBeFalsy();
            
            currentTime = DateCreator.fromISO("2016-02-29T13:45:00").getTime();
            expect(isTimeBetweenAzans(currentTime, salahPeriod)).toBeFalsy();
        });
    });
    
    describe("toISODateString", () => {
        it("Handle invalid arguments", () => {
            expect(toISODateString()).toBeFalsy();
            // expect(toISODateString("X")).toBeFalsy();
            // expect(toISODateString(new Date("X"))).toBeFalsy();
        });

        it("able to convert Date to ISO date String", () => {
            const date = DateCreator.fromISO("2017-11-13T13:34:50");
            const isoDateString = toISODateString(date);
            expect(isoDateString).toBe("2017-11-13");
        });
    });
});


