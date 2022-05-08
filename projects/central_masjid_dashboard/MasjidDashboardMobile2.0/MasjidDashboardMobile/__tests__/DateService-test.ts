/**
 * Debug jest code in VS Code
 * https://jestjs.io/docs/troubleshooting
 * 
 * 
 * Add this launch.json 
 * This will work on MAC
 * 
 * 
{

  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
 * 
 * 
 */


import { Constants } from "../src/services/Constants";
import { isSameMonthDate, getSystemTimezone, getSystemTimezoneDateIsoString, DATE_TIME_REGX, createExpirationDateIso, isoDateFixToSystemTimezone, getCurrentSystemDate, createExpirationDate, getTodaysDate, getTodaysMonth, stringH24MinToDate } from "../src/services/DateService";


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

    it("todaysDate, todaysMonth", () => {
        expect(getTodaysDate()).toBe(new Date().getDate());
        expect(getTodaysMonth()).toBe(new Date().getMonth() + 1);
    });

});


describe("Timezone", () => {

    it("getSystemTimezone()", () => {
        const systemTimezone = getSystemTimezone('2022-11-06');
        const timeRegex = /^[+-]([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
        expect(systemTimezone).toMatch(timeRegex);
    });

    it("getSystemTimezone() - Test will only work in Eastern Timezone", () => {
        expect(getSystemTimezone('2022-03-12')).toBe('-05:00');
        expect(getSystemTimezone('2022-03-13')).toBe('-04:00');
        expect(getSystemTimezone('2022-11-05')).toBe('-04:00');
        expect(getSystemTimezone('2022-11-06')).toBe('-05:00');
    });

    it("getSystemTimezoneIsoString() no date argument", () => {
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString();
        const systemTimezone = getSystemTimezone(systemTimezoneDateIsoString);
        expect(systemTimezoneDateIsoString).toMatch(DATE_TIME_REGX);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });

    it("getSystemTimezoneIsoString() date passed", () => {
        const systemTimezone = getSystemTimezone('2022-04-01');
        const dateString = '2022-04-01T00:00:00.000' + systemTimezone;
        const date = new Date(dateString);
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString(date);
        expect(systemTimezoneDateIsoString).toBe(dateString);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });

    it("getSystemTimezoneIsoString() No timezone", () => {
        const systemTimezone = getSystemTimezone('2022-04-01');
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
        expect(isoDate?.endsWith(getSystemTimezone('2022-04-01'))).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01Z");
        expect(isoDate?.startsWith("2022-04-01T00:00:00.000")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone('2022-04-01'))).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12");
        expect(isoDate?.startsWith("2022-04-01T12:00:00.000")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone('2022-04-01'))).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12:12:12.123");
        expect(isoDate?.startsWith("2022-04-01T12:12:12.123")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone('2022-04-01'))).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12:12:12.123Z");
        expect(isoDate?.startsWith("2022-04-01T12:12:12.123")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone('2022-04-01'))).toBe(true)

        isoDate = isoDateFixToSystemTimezone("2022-04-01T12:12:12.123+12:00");
        expect(isoDate?.startsWith("2022-04-01T12:12:12.123")).toBe(true)
        expect(isoDate?.endsWith(getSystemTimezone('2022-04-01'))).toBe(true)
    });
});


describe("Expiration", () => {
    it("createExpirationDateIso()", () => {
        const expirationDateIso = createExpirationDateIso();
        const expirationDateMilliseconds = new Date(expirationDateIso).getTime();
        const tempExpireMilliseconds = new Date().getTime() + Constants.EXPIRATION_MILLIS;
        const plusMinusErrorMilliseconds = 500;

        expect(expirationDateMilliseconds).toBeGreaterThan(tempExpireMilliseconds - plusMinusErrorMilliseconds);
        expect(expirationDateMilliseconds).toBeLessThan(tempExpireMilliseconds + plusMinusErrorMilliseconds);

    });

    it("createExpirationDate()", () => {
        const expirationDateMilliseconds = createExpirationDate().getTime();
        const tempExpireMilliseconds = new Date().getTime() + Constants.EXPIRATION_MILLIS;
        const plusMinusErrorMilliseconds = 500;

        expect(expirationDateMilliseconds).toBeGreaterThan(tempExpireMilliseconds - plusMinusErrorMilliseconds);
        expect(expirationDateMilliseconds).toBeLessThan(tempExpireMilliseconds + plusMinusErrorMilliseconds);
    });
});


describe("Display Date & Time", () => {
    it("stringH24MinToDate() Year Start", () => {
        // @ts-ignore
        const date1 = new Date(isoDateFixToSystemTimezone('2022-01-01'));
        const time1 = '23:59';

        const date1Result = stringH24MinToDate(date1, time1);
        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(0);
        expect(date1Result?.getDate()).toBe(1);
        expect(date1Result?.getHours()).toBe(23);
        expect(date1Result?.getMinutes()).toBe(59);
        expect(date1Result?.getSeconds()).toBe(0);
    });


    it("stringH24MinToDate() after DST Start", () => {

        const isoDate = isoDateFixToSystemTimezone('2022-03-13');
        // @ts-ignore
        // const date1 = new Date(isoDate);
        const date1 = new Date(2022, 2, 13);
        const time1 = '16:00';

        const date1Result = stringH24MinToDate(date1, time1);



        console.log(date1Result?.toLocaleString());
        // console.log(getSystemTimezone('2022-03-13'));
        // console.log(new Date("2022-03-13T20:00:00.000-04:00").toLocaleString());
        // console.log(date1Result?.toString());
        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(2);
        // expect(date1Result?.getDate()).toBe(13);
        // expect(date1Result?.getHours()).toBe(1);
        // expect(date1Result?.getMinutes()).toBe(59);
        // expect(date1Result?.getSeconds()).toBe(0);
    });


    /*
    it("stringH24MinToDate() Before DST", () => {
        // @ts-ignore
        const date1 = new Date(isoDateFixToSystemTimezone('2022-12-31'));
        const time1 = '23:59';

        const date1Result = stringH24MinToDate(date1, time1);
        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(11);
        expect(date1Result?.getDate()).toBe(31);
        expect(date1Result?.getHours()).toBe(23);
        expect(date1Result?.getMinutes()).toBe(59);
        expect(date1Result?.getSeconds()).toBe(0);
    });
*/

    it("stringH24MinToDate() Year End", () => {
        // @ts-ignore
        const date1 = new Date(isoDateFixToSystemTimezone('2022-12-31'));
        const time1 = '23:59';

        const date1Result = stringH24MinToDate(date1, time1);
        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(11);
        expect(date1Result?.getDate()).toBe(31);
        expect(date1Result?.getHours()).toBe(23);
        expect(date1Result?.getMinutes()).toBe(59);
        expect(date1Result?.getSeconds()).toBe(0);
    });
});

