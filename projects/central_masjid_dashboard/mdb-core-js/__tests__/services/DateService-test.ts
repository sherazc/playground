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
      "runtimeExecutable": "/opt/homebrew/bin/node",
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


import {
    isSameMonthDate, 
    getSystemTimezone, 
    getSystemTimezoneDateIsoString, 
    REGX_DATE_TIME,
    isoDateFixToSystemTimezone, 
    getCurrentSystemDate,
    getTodaysDate, 
    getTodaysMonth, 
    stringH24MinToDate,
    isoDateToJsDate, 
    MdDate, 
    parseObjectsIsoDateToMdDate, 
    dateToDisplayDateShort,
    time24To12, 
    dateToTime12h, 
    addDays, 
    addMinutes, 
    addMinutesTo24hTime, 
    millisecondDurationToMinSecTime,
    dayOfTheYear,
    isTimeBetweenAzans
} from "../../src/services/DateService";


describe("MdDate", () => {
    it("MdDate - invalid iso string", () => {
        new MdDate()
        expect(new MdDate().isValid).toBeFalsy();
        expect(new MdDate(null).isValid).toBeFalsy();
        expect(new MdDate("").isValid).toBeFalsy();
        expect(new MdDate("2022-1-01T").isValid).toBeFalsy();
        expect(new MdDate("2022-1-01T00:00:00.000Z").isValid).toBeFalsy();
    });

    it("MdDate - valid iso string", () => {
        const mdDate = new MdDate("2022-01-01T01:01:01.001Z");
        expect(mdDate.isValid).toBeTruthy();
        expect(mdDate.isoDate).toBe("2022-01-01T01:01:01.001-05:00");
        expect(mdDate.jsDate?.getFullYear()).toBe(2022);
        expect(mdDate.jsDate?.getMonth()).toBe(0);
        expect(mdDate.jsDate?.getDate()).toBe(1);
        expect(mdDate.jsDate?.getHours()).toBe(1);
        expect(mdDate.jsDate?.getMinutes()).toBe(1);
        expect(mdDate.jsDate?.getSeconds()).toBe(1);
        expect(mdDate.jsDate?.getMilliseconds()).toBe(1);
    });


    it("MdDate - invalid JsDate", () => {
        const date = new Date("");
        const mdDate = new MdDate(date);
        expect(mdDate.isValid).toBeFalsy();
        expect(isNaN(mdDate.jsDate.getTime())).toBeTruthy();
        expect(mdDate.isoDate).toBe("");
    });

    it("MdDate - valid JsDate", () => {
        const date = new Date(2022, 0, 1);
        const mdDate = new MdDate(date);
        expect(mdDate.isValid).toBeTruthy();
        expect(mdDate.jsDate).toBe(date);
        expect(mdDate.isoDate).toBe("2022-01-01T00:00:00.000-05:00");
    });
});




describe("MdDate - deserialize - parseObjectsIsoDateToMdDate", () => {
    it("parseObjectsIsoDateToMdDate - Parse bad object", () => {
        let a = undefined;
        parseObjectsIsoDateToMdDate(a);
        expect(a).toBeUndefined();

        let b = "abc";
        parseObjectsIsoDateToMdDate(b);
        expect(b).toBe("abc");

        let c = 100;
        parseObjectsIsoDateToMdDate(c);
        expect(c).toBe(100);

        let d = {};
        const dKeyCount = Object.keys(d).length
        parseObjectsIsoDateToMdDate(d);
        expect(dKeyCount).toBe(Object.keys(d).length);

        let e = [0];
        parseObjectsIsoDateToMdDate(e);
        expect(dKeyCount).toBe(Object.keys(d).length);
    });


    it("parseObjectsIsoDateToMdDate - Parse object", () => {
        const sampleIsoDate = "2012-12-12T12:12:12.120Z";
        const employee = {
            name: "Sheraz",
            dob: sampleIsoDate,
            hireDate: sampleIsoDate,
            lastDateAccess: sampleIsoDate,
            dateUpdate: sampleIsoDate,
        };

        parseObjectsIsoDateToMdDate(employee);
        expect(employee.dob).toBe(sampleIsoDate);
        expect(employee.hireDate).toBeInstanceOf(MdDate);
        expect(employee.lastDateAccess).toBeInstanceOf(MdDate);
        expect(employee.dateUpdate).toBeInstanceOf(MdDate);
    });

    it("parseObjectsIsoDateToMdDate - Parse array", () => {
        const sampleIsoDate = "2012-12-12T12:12:12.120Z";
        const employees = [{
            name: "Sheraz",
            dob: sampleIsoDate,
            hireDate: sampleIsoDate,
            lastDateAccess: sampleIsoDate,
            dateUpdate: sampleIsoDate,
        }];

        parseObjectsIsoDateToMdDate(employees);
        expect(employees[0].dob).toBe(sampleIsoDate);
        expect(employees[0].hireDate).toBeInstanceOf(MdDate);
        expect(employees[0].lastDateAccess).toBeInstanceOf(MdDate);
        expect(employees[0].dateUpdate).toBeInstanceOf(MdDate);
    });
});

describe("MdDate - serialize - JSON.stringify()", () => {
    it("Valid MdDate serialize - only MdDate", () => {
        expect(JSON.stringify(new MdDate(new Date(2022, 0, 1)))).toBe('"2022-01-01T00:00:00.000-05:00"');

    });

    it("Valid MdDate serialize - MdDate in Object", () => {
        const exampleObject = {
            exampleDate: new MdDate(new Date(2022, 0, 1))
        }

        const exampleSerialize = JSON.stringify(exampleObject);
        expect(exampleSerialize.includes("2022-01-01T00:00:00.000-05:00")).toBeTruthy();
    });

    // TODO - write invalid test cases
});


describe("MdDate - deserialize - JSON.parse()", () => {
    it("Valid MdDate deserialize - MdDate in Object", () => {
        const exampleSerialize = '{"exampleDate": "2022-01-01T00:00:00.000-05:00"}';
        const exampleDeserialize = JSON.parse(exampleSerialize, MdDate.mdDateJsonReviver)
        expect(exampleDeserialize.exampleDate.isValid).toBeTruthy();
    });

    // TODO - write invalid test cases
});




describe("Compare dates", () => {
    it("isSameMonthDate()", () => {
        expect(isSameMonthDate()).toBe(false);
        expect(isSameMonthDate(1)).toBe(false);
        expect(isSameMonthDate(1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1, 1)).toBe(true);
    });

    // Move isTimeBetweenAzans() it out of this file
    it("isTimeBetweenAzans()", () => {
        expect(isTimeBetweenAzans()).toBe(false);
        expect(isTimeBetweenAzans(null)).toBe(false);
        expect(isTimeBetweenAzans(null, null)).toBe(false);
        expect(isTimeBetweenAzans(undefined, null)).toBe(false);
        expect(isTimeBetweenAzans(null, undefined)).toBe(false);
        expect(isTimeBetweenAzans(1, undefined)).toBe(false);
        expect(isTimeBetweenAzans(1, [])).toBe(false);


        expect(isTimeBetweenAzans(
            new Date(2).getTime(), // current time
            [
                {
                    azan: new Date(1), // Azan Before
                    iqamah: new Date(),
                    name: ""
                },
                {
                    azan: new Date(3), // Azan After
                    iqamah: new Date(),
                    name: ""
                }

            ])
        ).toBe(true);

        expect(isTimeBetweenAzans(
            new Date(3).getTime(), // current time
            [
                {
                    azan: new Date(1), // Azan Before
                    iqamah: new Date(),
                    name: ""
                },
                {
                    azan: new Date(2), // Azan After
                    iqamah: new Date(),
                    name: ""
                }

            ])
        ).toBe(false);
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

    it("isoDateToJsDate() - bad iso", () => {
        expect(isoDateToJsDate("")).toBeUndefined();
        expect(isoDateToJsDate()).toBeUndefined();
        expect(isoDateToJsDate(null)).toBeUndefined();
        expect(isoDateToJsDate("bad")).toBeUndefined();
        expect(isoDateToJsDate("2022-1-01T01:01")).toBeUndefined();
        expect(isoDateToJsDate(new Date().toLocaleDateString())).toBeUndefined();
    });

    it("isoDateToJsDate() - iso date", () => {
        let date = isoDateToJsDate("2022-01-01");
        expect(date?.getFullYear()).toBe(2022);
        expect(date?.getMonth()).toBe(0);
        expect(date?.getDate()).toBe(1);
        expect(date?.getHours()).toBe(0);
        expect(date?.getMinutes()).toBe(0);
        expect(date?.getSeconds()).toBe(0);
        expect(date?.getMilliseconds()).toBe(0);
        // will only work in EST env
        // expect(date?.getTimezoneOffset()).toBe(300);
    });

    it("isoDateToJsDate() - iso date time", () => {
        let date = isoDateToJsDate("2022-01-01T01:01");
        expect(date?.getFullYear()).toBe(2022);
        expect(date?.getMonth()).toBe(0);
        expect(date?.getDate()).toBe(1);
        expect(date?.getHours()).toBe(1);
        expect(date?.getMinutes()).toBe(1);
        expect(date?.getSeconds()).toBe(0);
        expect(date?.getMilliseconds()).toBe(0);
    });

    it("isoDateToJsDate() - iso date time seconds", () => {
        let date1 = isoDateToJsDate("2022-03-12T23:59:59");
        expect(date1?.getFullYear()).toBe(2022);
        expect(date1?.getMonth()).toBe(2);
        expect(date1?.getDate()).toBe(12);
        expect(date1?.getHours()).toBe(23);
        expect(date1?.getMinutes()).toBe(59);
        expect(date1?.getSeconds()).toBe(59);
        expect(date1?.getMilliseconds()).toBe(0);

        let date2 = isoDateToJsDate("2022-03-13T03:03:01");
        expect(date2?.getFullYear()).toBe(2022);
        expect(date2?.getMonth()).toBe(2);
        expect(date2?.getDate()).toBe(13);
        expect(date2?.getHours()).toBe(3);
        expect(date2?.getMinutes()).toBe(3);
        expect(date2?.getSeconds()).toBe(1);
        expect(date2?.getMilliseconds()).toBe(0);

        let date3 = isoDateToJsDate("2022-11-15T23:59:59");
        expect(date3?.getFullYear()).toBe(2022);
        expect(date3?.getMonth()).toBe(10);
        expect(date3?.getDate()).toBe(15);
        expect(date3?.getHours()).toBe(23);
        expect(date3?.getMinutes()).toBe(59);
        expect(date3?.getSeconds()).toBe(59);
        expect(date3?.getMilliseconds()).toBe(0);

        let date4 = isoDateToJsDate("2022-11-16T03:03:01");
        expect(date4?.getFullYear()).toBe(2022);
        expect(date4?.getMonth()).toBe(10);
        expect(date4?.getDate()).toBe(16);
        expect(date4?.getHours()).toBe(3);
        expect(date4?.getMinutes()).toBe(3);
        expect(date4?.getSeconds()).toBe(1);
        expect(date4?.getMilliseconds()).toBe(0);
    });

    it("isoDateToJsDate() - iso date time seconds time zone", () => {
        let date1 = isoDateToJsDate("2022-03-12T23:59:59Z");
        expect(date1?.getFullYear()).toBe(2022);
        expect(date1?.getMonth()).toBe(2);
        expect(date1?.getDate()).toBe(12);
        expect(date1?.getHours()).toBe(23);
        expect(date1?.getMinutes()).toBe(59);
        expect(date1?.getSeconds()).toBe(59);
        expect(date1?.getMilliseconds()).toBe(0);

        let date2 = isoDateToJsDate("2022-03-13T03:03:01-04:00");
        expect(date2?.getFullYear()).toBe(2022);
        expect(date2?.getMonth()).toBe(2);
        expect(date2?.getDate()).toBe(13);
        expect(date2?.getHours()).toBe(3);
        expect(date2?.getMinutes()).toBe(3);
        expect(date2?.getSeconds()).toBe(1);
        expect(date2?.getMilliseconds()).toBe(0);

        let date3 = isoDateToJsDate("2022-11-15T23:59:59.123+07:00");
        expect(date3?.getFullYear()).toBe(2022);
        expect(date3?.getMonth()).toBe(10);
        expect(date3?.getDate()).toBe(15);
        expect(date3?.getHours()).toBe(23);
        expect(date3?.getMinutes()).toBe(59);
        expect(date3?.getSeconds()).toBe(59);
        expect(date3?.getMilliseconds()).toBe(123);

        let date4 = isoDateToJsDate("2022-11-16T03:03:01");
        expect(date4?.getFullYear()).toBe(2022);
        expect(date4?.getMonth()).toBe(10);
        expect(date4?.getDate()).toBe(16);
        expect(date4?.getHours()).toBe(3);
        expect(date4?.getMinutes()).toBe(3);
        expect(date4?.getSeconds()).toBe(1);
        expect(date4?.getMilliseconds()).toBe(0);
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

    it("getSystemTimezoneDateIsoString() no date argument", () => {
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString();
        const systemTimezone = getSystemTimezone(systemTimezoneDateIsoString);
        expect(systemTimezoneDateIsoString).toMatch(REGX_DATE_TIME);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });

    it("getSystemTimezoneDateIsoString() date passed", () => {
        const systemTimezone = getSystemTimezone('2022-04-01');
        const dateString = '2022-04-01T00:00:00.000' + systemTimezone;
        const date = new Date(dateString);
        const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString(date);
        expect(systemTimezoneDateIsoString).toBe(dateString);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });

    it("getSystemTimezoneDateIsoString() No timezone", () => {
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


describe("Display Date & Time", () => {
    it("dateToDisplayDateShort()", () => {
        expect(dateToDisplayDateShort()).toBe("");
        expect(dateToDisplayDateShort(null)).toBe("");
        expect(dateToDisplayDateShort(new Date("abc"))).toBe("");
        expect(dateToDisplayDateShort(new Date(2022, 2, 12))).toBe("3/12");
        expect(dateToDisplayDateShort(new Date(2022, 2, 13))).toBe("3/13");
        expect(dateToDisplayDateShort(new Date(2022, 10, 15, 23, 59))).toBe("11/15");
        expect(dateToDisplayDateShort(new Date(2022, 10, 16, 3, 0))).toBe("11/16");
    });


    it("time24To12()", () => {
        expect(time24To12()).toBe("");
        expect(time24To12(null)).toBe("");
        expect(time24To12("")).toBe("");
        expect(time24To12("abc")).toBe("abc");
        expect(time24To12("23:59")).toBe("11:59pm");
        expect(time24To12("00:00")).toBe("12:00am");
        expect(time24To12("01:00")).toBe("1:00am");
        expect(time24To12("11:00")).toBe("11:00am");
        expect(time24To12("12:00")).toBe("12:00pm");
        expect(time24To12("01:00")).toBe("1:00am");

    });


    it("dateToTime12h()", () => {
        expect(dateToTime12h()).toBe("");
        expect(dateToTime12h(null)).toBe("");
        expect(dateToTime12h(new Date(""))).toBe("");
        expect(dateToTime12h(new Date(2022, 0, 1))).toBe("12:00am");
        expect(dateToTime12h(new Date(2022, 0, 1, 23, 59))).toBe("11:59pm");
        expect(dateToTime12h(new Date(2022, 0, 1, 0, 0))).toBe("12:00am");
        expect(dateToTime12h(new Date(2022, 0, 1, 1, 0))).toBe("1:00am");
        expect(dateToTime12h(new Date(2022, 0, 1, 12, 0))).toBe("12:00pm");
    });


    it("stringH24MinToDate() Year Start", () => {
        const date1 = new Date(2022, 0, 1);
        const time1 = '23:59';

        const date1Result = stringH24MinToDate(date1, time1);
        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(0);
        expect(date1Result?.getDate()).toBe(1);
        expect(date1Result?.getHours()).toBe(23);
        expect(date1Result?.getMinutes()).toBe(59);
        expect(date1Result?.getSeconds()).toBe(0);
        expect(date1Result?.getMilliseconds()).toBe(0);
    });


    it("stringH24MinToDate() before DST Start", () => {
        const date1 = new Date(2022, 2, 13);
        const time1 = '01:00';
        const date1Result = stringH24MinToDate(date1, time1);

        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(2);
        expect(date1Result?.getDate()).toBe(13);
        expect(date1Result?.getHours()).toBe(1);
        expect(date1Result?.getMinutes()).toBe(0);
        expect(date1Result?.getSeconds()).toBe(0);
        expect(date1Result?.getMilliseconds()).toBe(0);
    });


    it("stringH24MinToDate() after DST Start", () => {
        const date1 = new Date(2022, 2, 13);
        const time1 = '03:00';
        const date1Result = stringH24MinToDate(date1, time1);

        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(2);
        expect(date1Result?.getDate()).toBe(13);
        expect(date1Result?.getHours()).toBe(3);
        expect(date1Result?.getMinutes()).toBe(0);
        expect(date1Result?.getSeconds()).toBe(0);
        expect(date1Result?.getMilliseconds()).toBe(0);
    });


    it("stringH24MinToDate() before DST End", () => {
        const date1 = new Date(2022, 10, 6);
        const time1 = '01:00';
        const date1Result = stringH24MinToDate(date1, time1);

        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(10);
        expect(date1Result?.getDate()).toBe(6);
        expect(date1Result?.getHours()).toBe(1);
        expect(date1Result?.getMinutes()).toBe(0);
        expect(date1Result?.getSeconds()).toBe(0);
        expect(date1Result?.getMilliseconds()).toBe(0);
    });


    it("stringH24MinToDate() after DST End", () => {
        const date1 = new Date(2022, 10, 6);
        const time1 = '03:00';
        const date1Result = stringH24MinToDate(date1, time1);

        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(10);
        expect(date1Result?.getDate()).toBe(6);
        expect(date1Result?.getHours()).toBe(3);
        expect(date1Result?.getMinutes()).toBe(0);
        expect(date1Result?.getSeconds()).toBe(0);
        expect(date1Result?.getMilliseconds()).toBe(0);
    });


    it("stringH24MinToDate() Year End", () => {
        const date1 = new Date(2022, 11, 31);
        const time1 = '23:59';
        const date1Result = stringH24MinToDate(date1, time1);

        expect(date1Result?.getFullYear()).toBe(2022);
        expect(date1Result?.getMonth()).toBe(11);
        expect(date1Result?.getDate()).toBe(31);
        expect(date1Result?.getHours()).toBe(23);
        expect(date1Result?.getMinutes()).toBe(59);
        expect(date1Result?.getSeconds()).toBe(0);
        expect(date1Result?.getMilliseconds()).toBe(0);
    });


    it("millisecondDurationToMinSecTime()", () => {
        expect(millisecondDurationToMinSecTime()).toBe("00:00");
        expect(millisecondDurationToMinSecTime(undefined)).toBe("00:00");
        expect(millisecondDurationToMinSecTime(null)).toBe("00:00");
        expect(millisecondDurationToMinSecTime(-1)).toBe("00:00");
        expect(millisecondDurationToMinSecTime(999)).toBe("00:00");
        expect(millisecondDurationToMinSecTime(1000)).toBe("00:01");
        expect(millisecondDurationToMinSecTime(1000 * 60)).toBe("01:00");
        expect(millisecondDurationToMinSecTime(1000 * 60)).toBe("01:00");
        expect(millisecondDurationToMinSecTime(1000 * 60 * 60)).toBe("1:00:00");
    });

    it("dayOfTheYear()", () => {
        expect(dayOfTheYear(2022, 0, 1)).toBe(1);
        expect(dayOfTheYear(2022, 1, 0)).toBe(31);
        expect(dayOfTheYear(2022, 1, 1)).toBe(32);
        expect(dayOfTheYear(2022, 11, 31)).toBe(365);
        expect(dayOfTheYear(2000, 11, 31)).toBe(366);
    });

});


describe("Date Calculation", () => {
    it("addDays()", () => {
        expect(addDays()?.getDate()).toBeUndefined();
        expect(addDays(undefined)?.getDate()).toBeUndefined();
        expect(addDays(undefined, undefined)?.getDate()).toBeUndefined();
        expect(addDays(null)?.getDate()).toBeUndefined();
        expect(addDays(null, null)?.getDate()).toBeUndefined();
        expect(addDays(new Date(2022, 0, 1))?.getDate()).toBe(1);

        expect(addDays(new Date(2022, 0, 1), 0)?.getDate()).toBe(1);
        expect(addDays(new Date(2022, 0, 1), 1)?.getDate()).toBe(2);
        expect(addDays(new Date(2022, 0, 1), -1)?.getDate()).toBe(31);
    });

    it("addMinutes()", () => {
        expect(addMinutes()?.getDate()).toBeUndefined();
        expect(addMinutes(undefined)?.getDate()).toBeUndefined();
        expect(addMinutes(undefined, undefined)?.getDate()).toBeUndefined();
        expect(addMinutes(null)?.getDate()).toBeUndefined();
        expect(addMinutes(null, null)?.getDate()).toBeUndefined();
        expect(addMinutes(new Date(2022, 0, 1, 0, 0))?.getMinutes()).toBe(0);
        expect(addMinutes(new Date(2022, 0, 1, 0, 0), 0)?.getMinutes()).toBe(0);
        expect(addMinutes(new Date(2022, 0, 1, 0, 0), 1)?.getMinutes()).toBe(1);
        expect(addMinutes(new Date(2022, 0, 1, 0, 0), -1)?.getMinutes()).toBe(59);
    });

    it("addMinutesToTime()", () => {
        expect(addMinutesTo24hTime()).toBeUndefined();
        expect(addMinutesTo24hTime(undefined)).toBeUndefined();
        expect(addMinutesTo24hTime(undefined, undefined)).toBeUndefined();
        expect(addMinutesTo24hTime(null)).toBeUndefined();
        expect(addMinutesTo24hTime(null, null)).toBeUndefined();
        expect(addMinutesTo24hTime("abc", 1)).toBeUndefined();
        expect(addMinutesTo24hTime("\n\r 00:00 \n\r", 1)).toBe("00:01");
        expect(addMinutesTo24hTime("00:00", 1)).toBe("00:01");
        expect(addMinutesTo24hTime("00:00", -1)).toBe("23:59");
    });
});
