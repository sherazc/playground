"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const DateService_1 = require("../../../src/services/common/DateService");
describe("MdDate", () => {
    it("MdDate - invalid iso string", () => {
        new DateService_1.MdDate();
        expect(new DateService_1.MdDate().isValid).toBeFalsy();
        expect(new DateService_1.MdDate(null).isValid).toBeFalsy();
        expect(new DateService_1.MdDate("").isValid).toBeFalsy();
        expect(new DateService_1.MdDate("2022-1-01T").isValid).toBeFalsy();
        expect(new DateService_1.MdDate("2022-1-01T00:00:00.000Z").isValid).toBeFalsy();
    });
    it("MdDate - valid iso string", () => {
        var _a, _b, _c, _d, _e, _f, _g;
        const mdDate = new DateService_1.MdDate("2022-01-01T01:01:01.001Z");
        expect(mdDate.isValid).toBeTruthy();
        expect(mdDate.isoDate).toBe("2022-01-01T01:01:01.001-05:00");
        expect((_a = mdDate.jsDate) === null || _a === void 0 ? void 0 : _a.getFullYear()).toBe(2022);
        expect((_b = mdDate.jsDate) === null || _b === void 0 ? void 0 : _b.getMonth()).toBe(0);
        expect((_c = mdDate.jsDate) === null || _c === void 0 ? void 0 : _c.getDate()).toBe(1);
        expect((_d = mdDate.jsDate) === null || _d === void 0 ? void 0 : _d.getHours()).toBe(1);
        expect((_e = mdDate.jsDate) === null || _e === void 0 ? void 0 : _e.getMinutes()).toBe(1);
        expect((_f = mdDate.jsDate) === null || _f === void 0 ? void 0 : _f.getSeconds()).toBe(1);
        expect((_g = mdDate.jsDate) === null || _g === void 0 ? void 0 : _g.getMilliseconds()).toBe(1);
    });
    it("MdDate - invalid JsDate", () => {
        const date = new Date("");
        const mdDate = new DateService_1.MdDate(date);
        expect(mdDate.isValid).toBeFalsy();
        expect(isNaN(mdDate.jsDate.getTime())).toBeTruthy();
        expect(mdDate.isoDate).toBe("");
    });
    it("MdDate - valid JsDate", () => {
        const date = new Date(2022, 0, 1);
        const mdDate = new DateService_1.MdDate(date);
        expect(mdDate.isValid).toBeTruthy();
        expect(mdDate.jsDate).toBe(date);
        expect(mdDate.isoDate).toBe("2022-01-01T00:00:00.000-05:00");
    });
});
describe("MdDate - deserialize - parseObjectsIsoDateToMdDate", () => {
    it("parseObjectsIsoDateToMdDate - Parse bad object", () => {
        let a = undefined;
        (0, DateService_1.parseObjectsIsoDateToMdDate)(a);
        expect(a).toBeUndefined();
        let b = "abc";
        (0, DateService_1.parseObjectsIsoDateToMdDate)(b);
        expect(b).toBe("abc");
        let c = 100;
        (0, DateService_1.parseObjectsIsoDateToMdDate)(c);
        expect(c).toBe(100);
        let d = {};
        const dKeyCount = Object.keys(d).length;
        (0, DateService_1.parseObjectsIsoDateToMdDate)(d);
        expect(dKeyCount).toBe(Object.keys(d).length);
        let e = [0];
        (0, DateService_1.parseObjectsIsoDateToMdDate)(e);
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
        (0, DateService_1.parseObjectsIsoDateToMdDate)(employee);
        expect(employee.dob).toBe(sampleIsoDate);
        expect(employee.hireDate).toBeInstanceOf(DateService_1.MdDate);
        expect(employee.lastDateAccess).toBeInstanceOf(DateService_1.MdDate);
        expect(employee.dateUpdate).toBeInstanceOf(DateService_1.MdDate);
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
        (0, DateService_1.parseObjectsIsoDateToMdDate)(employees);
        expect(employees[0].dob).toBe(sampleIsoDate);
        expect(employees[0].hireDate).toBeInstanceOf(DateService_1.MdDate);
        expect(employees[0].lastDateAccess).toBeInstanceOf(DateService_1.MdDate);
        expect(employees[0].dateUpdate).toBeInstanceOf(DateService_1.MdDate);
    });
});
describe("MdDate - serialize - JSON.stringify()", () => {
    it("Valid MdDate serialize - only MdDate", () => {
        expect(JSON.stringify(new DateService_1.MdDate(new Date(2022, 0, 1)))).toBe('"2022-01-01T00:00:00.000-05:00"');
    });
    it("Valid MdDate serialize - MdDate in Object", () => {
        const exampleObject = {
            exampleDate: new DateService_1.MdDate(new Date(2022, 0, 1))
        };
        const exampleSerialize = JSON.stringify(exampleObject);
        expect(exampleSerialize.includes("2022-01-01T00:00:00.000-05:00")).toBeTruthy();
    });
    // TODO - write invalid test cases
});
describe("MdDate - deserialize - JSON.parse()", () => {
    it("Valid MdDate deserialize - MdDate in Object", () => {
        const exampleSerialize = '{"exampleDate": "2022-01-01T00:00:00.000-05:00"}';
        const exampleDeserialize = JSON.parse(exampleSerialize, DateService_1.MdDate.mdDateJsonReviver);
        expect(exampleDeserialize.exampleDate.isValid).toBeTruthy();
    });
    // TODO - write invalid test cases
});
describe("Compare dates", () => {
    it("isSameMonthDate()", () => {
        expect((0, DateService_1.isSameMonthDate)()).toBe(false);
        expect((0, DateService_1.isSameMonthDate)(1)).toBe(false);
        expect((0, DateService_1.isSameMonthDate)(1, 1)).toBe(false);
        expect((0, DateService_1.isSameMonthDate)(1, 1, 1)).toBe(false);
        expect((0, DateService_1.isSameMonthDate)(1, 1, 1, 1)).toBe(true);
    });
    // Move isTimeBetweenAzans() it out of this file
    it("isTimeBetweenAzans()", () => {
        expect((0, DateService_1.isTimeBetweenAzans)()).toBe(false);
        expect((0, DateService_1.isTimeBetweenAzans)(null)).toBe(false);
        expect((0, DateService_1.isTimeBetweenAzans)(null, null)).toBe(false);
        expect((0, DateService_1.isTimeBetweenAzans)(undefined, null)).toBe(false);
        expect((0, DateService_1.isTimeBetweenAzans)(null, undefined)).toBe(false);
        expect((0, DateService_1.isTimeBetweenAzans)(1, undefined)).toBe(false);
        expect((0, DateService_1.isTimeBetweenAzans)(1, [])).toBe(false);
        expect((0, DateService_1.isTimeBetweenAzans)(new Date(2).getTime(), // current time
        [
            {
                azan: new Date(1),
                iqamah: new Date(),
                name: ""
            },
            {
                azan: new Date(3),
                iqamah: new Date(),
                name: ""
            }
        ])).toBe(true);
        expect((0, DateService_1.isTimeBetweenAzans)(new Date(3).getTime(), // current time
        [
            {
                azan: new Date(1),
                iqamah: new Date(),
                name: ""
            },
            {
                azan: new Date(2),
                iqamah: new Date(),
                name: ""
            }
        ])).toBe(false);
    });
});
describe("Date", () => {
    it("Create Now Date - getCurrentSystemDate()", () => {
        const date = new Date();
        const currentSystemDate = (0, DateService_1.getCurrentSystemDate)();
        expect(date.getFullYear()).toBe(currentSystemDate.getFullYear());
        expect(date.getMonth()).toBe(currentSystemDate.getMonth());
        expect(date.getDate()).toBe(currentSystemDate.getDate());
        expect(date.getHours()).toBe(currentSystemDate.getHours());
        expect(date.getMinutes()).toBe(currentSystemDate.getMinutes());
        expect(date.getSeconds()).toBe(currentSystemDate.getSeconds());
    });
    it("todaysDate, todaysMonth", () => {
        expect((0, DateService_1.getTodaysDate)()).toBe(new Date().getDate());
        expect((0, DateService_1.getTodaysMonth)()).toBe(new Date().getMonth() + 1);
    });
    it("isoDateToJsDate() - bad iso", () => {
        expect((0, DateService_1.isoDateToJsDate)("")).toBeUndefined();
        expect((0, DateService_1.isoDateToJsDate)()).toBeUndefined();
        expect((0, DateService_1.isoDateToJsDate)(null)).toBeUndefined();
        expect((0, DateService_1.isoDateToJsDate)("bad")).toBeUndefined();
        expect((0, DateService_1.isoDateToJsDate)("2022-1-01T01:01")).toBeUndefined();
        expect((0, DateService_1.isoDateToJsDate)(new Date().toLocaleDateString())).toBeUndefined();
    });
    it("isoDateToJsDate() - iso date", () => {
        let date = (0, DateService_1.isoDateToJsDate)("2022-01-01");
        expect(date === null || date === void 0 ? void 0 : date.getFullYear()).toBe(2022);
        expect(date === null || date === void 0 ? void 0 : date.getMonth()).toBe(0);
        expect(date === null || date === void 0 ? void 0 : date.getDate()).toBe(1);
        expect(date === null || date === void 0 ? void 0 : date.getHours()).toBe(0);
        expect(date === null || date === void 0 ? void 0 : date.getMinutes()).toBe(0);
        expect(date === null || date === void 0 ? void 0 : date.getSeconds()).toBe(0);
        expect(date === null || date === void 0 ? void 0 : date.getMilliseconds()).toBe(0);
        // will only work in EST env
        // expect(date?.getTimezoneOffset()).toBe(300);
    });
    it("isoDateToJsDate() - iso date time", () => {
        let date = (0, DateService_1.isoDateToJsDate)("2022-01-01T01:01");
        expect(date === null || date === void 0 ? void 0 : date.getFullYear()).toBe(2022);
        expect(date === null || date === void 0 ? void 0 : date.getMonth()).toBe(0);
        expect(date === null || date === void 0 ? void 0 : date.getDate()).toBe(1);
        expect(date === null || date === void 0 ? void 0 : date.getHours()).toBe(1);
        expect(date === null || date === void 0 ? void 0 : date.getMinutes()).toBe(1);
        expect(date === null || date === void 0 ? void 0 : date.getSeconds()).toBe(0);
        expect(date === null || date === void 0 ? void 0 : date.getMilliseconds()).toBe(0);
    });
    it("isoDateToJsDate() - iso date time seconds", () => {
        let date1 = (0, DateService_1.isoDateToJsDate)("2022-03-12T23:59:59");
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getFullYear()).toBe(2022);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getMonth()).toBe(2);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getDate()).toBe(12);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getHours()).toBe(23);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getMinutes()).toBe(59);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getSeconds()).toBe(59);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getMilliseconds()).toBe(0);
        let date2 = (0, DateService_1.isoDateToJsDate)("2022-03-13T03:03:01");
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getFullYear()).toBe(2022);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getMonth()).toBe(2);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getDate()).toBe(13);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getHours()).toBe(3);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getMinutes()).toBe(3);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getSeconds()).toBe(1);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getMilliseconds()).toBe(0);
        let date3 = (0, DateService_1.isoDateToJsDate)("2022-11-15T23:59:59");
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getFullYear()).toBe(2022);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getMonth()).toBe(10);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getDate()).toBe(15);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getHours()).toBe(23);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getMinutes()).toBe(59);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getSeconds()).toBe(59);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getMilliseconds()).toBe(0);
        let date4 = (0, DateService_1.isoDateToJsDate)("2022-11-16T03:03:01");
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getFullYear()).toBe(2022);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getMonth()).toBe(10);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getDate()).toBe(16);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getHours()).toBe(3);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getMinutes()).toBe(3);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getSeconds()).toBe(1);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getMilliseconds()).toBe(0);
    });
    it("isoDateToJsDate() - iso date time seconds time zone", () => {
        let date1 = (0, DateService_1.isoDateToJsDate)("2022-03-12T23:59:59Z");
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getFullYear()).toBe(2022);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getMonth()).toBe(2);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getDate()).toBe(12);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getHours()).toBe(23);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getMinutes()).toBe(59);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getSeconds()).toBe(59);
        expect(date1 === null || date1 === void 0 ? void 0 : date1.getMilliseconds()).toBe(0);
        let date2 = (0, DateService_1.isoDateToJsDate)("2022-03-13T03:03:01-04:00");
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getFullYear()).toBe(2022);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getMonth()).toBe(2);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getDate()).toBe(13);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getHours()).toBe(3);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getMinutes()).toBe(3);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getSeconds()).toBe(1);
        expect(date2 === null || date2 === void 0 ? void 0 : date2.getMilliseconds()).toBe(0);
        let date3 = (0, DateService_1.isoDateToJsDate)("2022-11-15T23:59:59.123+07:00");
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getFullYear()).toBe(2022);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getMonth()).toBe(10);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getDate()).toBe(15);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getHours()).toBe(23);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getMinutes()).toBe(59);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getSeconds()).toBe(59);
        expect(date3 === null || date3 === void 0 ? void 0 : date3.getMilliseconds()).toBe(123);
        let date4 = (0, DateService_1.isoDateToJsDate)("2022-11-16T03:03:01");
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getFullYear()).toBe(2022);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getMonth()).toBe(10);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getDate()).toBe(16);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getHours()).toBe(3);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getMinutes()).toBe(3);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getSeconds()).toBe(1);
        expect(date4 === null || date4 === void 0 ? void 0 : date4.getMilliseconds()).toBe(0);
    });
});
describe("Timezone", () => {
    it("getSystemTimezone()", () => {
        const systemTimezone = (0, DateService_1.getSystemTimezone)('2022-11-06');
        const timeRegex = /^[+-]([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
        expect(systemTimezone).toMatch(timeRegex);
    });
    it("getSystemTimezone() - Test will only work in Eastern Timezone", () => {
        expect((0, DateService_1.getSystemTimezone)('2022-03-12')).toBe('-05:00');
        expect((0, DateService_1.getSystemTimezone)('2022-03-13')).toBe('-04:00');
        expect((0, DateService_1.getSystemTimezone)('2022-11-05')).toBe('-04:00');
        expect((0, DateService_1.getSystemTimezone)('2022-11-06')).toBe('-05:00');
    });
    it("getSystemTimezoneDateIsoString() no date argument", () => {
        const systemTimezoneDateIsoString = (0, DateService_1.getSystemTimezoneDateIsoString)();
        const systemTimezone = (0, DateService_1.getSystemTimezone)(systemTimezoneDateIsoString);
        expect(systemTimezoneDateIsoString).toMatch(DateService_1.DATE_TIME_REGX);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });
    it("getSystemTimezoneDateIsoString() date passed", () => {
        const systemTimezone = (0, DateService_1.getSystemTimezone)('2022-04-01');
        const dateString = '2022-04-01T00:00:00.000' + systemTimezone;
        const date = new Date(dateString);
        const systemTimezoneDateIsoString = (0, DateService_1.getSystemTimezoneDateIsoString)(date);
        expect(systemTimezoneDateIsoString).toBe(dateString);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });
    it("getSystemTimezoneDateIsoString() No timezone", () => {
        const systemTimezone = (0, DateService_1.getSystemTimezone)('2022-04-01');
        const dateString = '2022-04-01T00:00:00.000';
        const date = new Date(dateString);
        const systemTimezoneDateIsoString = (0, DateService_1.getSystemTimezoneDateIsoString)(date);
        expect(systemTimezoneDateIsoString.startsWith(dateString)).toBe(true);
        expect(systemTimezoneDateIsoString.endsWith(systemTimezone)).toBe(true);
    });
    it("isoDateFixToSystemTimezone() invalid argument", () => {
        expect((0, DateService_1.isoDateFixToSystemTimezone)()).toBeUndefined();
        expect((0, DateService_1.isoDateFixToSystemTimezone)(null)).toBeUndefined();
        expect((0, DateService_1.isoDateFixToSystemTimezone)("")).toBeUndefined();
        expect((0, DateService_1.isoDateFixToSystemTimezone)("ABC")).toBeUndefined();
        expect((0, DateService_1.isoDateFixToSystemTimezone)("2022-04-01ABC")).toBeUndefined();
        expect((0, DateService_1.isoDateFixToSystemTimezone)("22022-04-01")).toBeUndefined();
    });
    it("isoDateFixToSystemTimezone()", () => {
        let isoDate = (0, DateService_1.isoDateFixToSystemTimezone)("2022-04-01");
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.startsWith("2022-04-01T00:00:00.000")).toBe(true);
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.endsWith((0, DateService_1.getSystemTimezone)('2022-04-01'))).toBe(true);
        isoDate = (0, DateService_1.isoDateFixToSystemTimezone)("2022-04-01Z");
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.startsWith("2022-04-01T00:00:00.000")).toBe(true);
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.endsWith((0, DateService_1.getSystemTimezone)('2022-04-01'))).toBe(true);
        isoDate = (0, DateService_1.isoDateFixToSystemTimezone)("2022-04-01T12");
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.startsWith("2022-04-01T12:00:00.000")).toBe(true);
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.endsWith((0, DateService_1.getSystemTimezone)('2022-04-01'))).toBe(true);
        isoDate = (0, DateService_1.isoDateFixToSystemTimezone)("2022-04-01T12:12:12.123");
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.startsWith("2022-04-01T12:12:12.123")).toBe(true);
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.endsWith((0, DateService_1.getSystemTimezone)('2022-04-01'))).toBe(true);
        isoDate = (0, DateService_1.isoDateFixToSystemTimezone)("2022-04-01T12:12:12.123Z");
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.startsWith("2022-04-01T12:12:12.123")).toBe(true);
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.endsWith((0, DateService_1.getSystemTimezone)('2022-04-01'))).toBe(true);
        isoDate = (0, DateService_1.isoDateFixToSystemTimezone)("2022-04-01T12:12:12.123+12:00");
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.startsWith("2022-04-01T12:12:12.123")).toBe(true);
        expect(isoDate === null || isoDate === void 0 ? void 0 : isoDate.endsWith((0, DateService_1.getSystemTimezone)('2022-04-01'))).toBe(true);
    });
});
describe("Display Date & Time", () => {
    it("dateToDisplayDateShort()", () => {
        expect((0, DateService_1.dateToDisplayDateShort)()).toBe("");
        expect((0, DateService_1.dateToDisplayDateShort)(null)).toBe("");
        expect((0, DateService_1.dateToDisplayDateShort)(new Date("abc"))).toBe("");
        expect((0, DateService_1.dateToDisplayDateShort)(new Date(2022, 2, 12))).toBe("3/12");
        expect((0, DateService_1.dateToDisplayDateShort)(new Date(2022, 2, 13))).toBe("3/13");
        expect((0, DateService_1.dateToDisplayDateShort)(new Date(2022, 10, 15, 23, 59))).toBe("11/15");
        expect((0, DateService_1.dateToDisplayDateShort)(new Date(2022, 10, 16, 3, 0))).toBe("11/16");
    });
    it("time24To12()", () => {
        expect((0, DateService_1.time24To12)()).toBe("");
        expect((0, DateService_1.time24To12)(null)).toBe("");
        expect((0, DateService_1.time24To12)("")).toBe("");
        expect((0, DateService_1.time24To12)("abc")).toBe("abc");
        expect((0, DateService_1.time24To12)("23:59")).toBe("11:59pm");
        expect((0, DateService_1.time24To12)("00:00")).toBe("12:00am");
        expect((0, DateService_1.time24To12)("01:00")).toBe("1:00am");
        expect((0, DateService_1.time24To12)("11:00")).toBe("11:00am");
        expect((0, DateService_1.time24To12)("12:00")).toBe("12:00pm");
        expect((0, DateService_1.time24To12)("01:00")).toBe("1:00am");
    });
    it("dateToTime12h()", () => {
        expect((0, DateService_1.dateToTime12h)()).toBe("");
        expect((0, DateService_1.dateToTime12h)(null)).toBe("");
        expect((0, DateService_1.dateToTime12h)(new Date(""))).toBe("");
        expect((0, DateService_1.dateToTime12h)(new Date(2022, 0, 1))).toBe("12:00am");
        expect((0, DateService_1.dateToTime12h)(new Date(2022, 0, 1, 23, 59))).toBe("11:59pm");
        expect((0, DateService_1.dateToTime12h)(new Date(2022, 0, 1, 0, 0))).toBe("12:00am");
        expect((0, DateService_1.dateToTime12h)(new Date(2022, 0, 1, 1, 0))).toBe("1:00am");
        expect((0, DateService_1.dateToTime12h)(new Date(2022, 0, 1, 12, 0))).toBe("12:00pm");
    });
    it("stringH24MinToDate() Year Start", () => {
        const date1 = new Date(2022, 0, 1);
        const time1 = '23:59';
        const date1Result = (0, DateService_1.stringH24MinToDate)(date1, time1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getFullYear()).toBe(2022);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMonth()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getDate()).toBe(1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getHours()).toBe(23);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMinutes()).toBe(59);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getSeconds()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMilliseconds()).toBe(0);
    });
    it("stringH24MinToDate() before DST Start", () => {
        const date1 = new Date(2022, 2, 13);
        const time1 = '01:00';
        const date1Result = (0, DateService_1.stringH24MinToDate)(date1, time1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getFullYear()).toBe(2022);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMonth()).toBe(2);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getDate()).toBe(13);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getHours()).toBe(1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMinutes()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getSeconds()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMilliseconds()).toBe(0);
    });
    it("stringH24MinToDate() after DST Start", () => {
        const date1 = new Date(2022, 2, 13);
        const time1 = '03:00';
        const date1Result = (0, DateService_1.stringH24MinToDate)(date1, time1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getFullYear()).toBe(2022);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMonth()).toBe(2);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getDate()).toBe(13);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getHours()).toBe(3);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMinutes()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getSeconds()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMilliseconds()).toBe(0);
    });
    it("stringH24MinToDate() before DST End", () => {
        const date1 = new Date(2022, 10, 6);
        const time1 = '01:00';
        const date1Result = (0, DateService_1.stringH24MinToDate)(date1, time1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getFullYear()).toBe(2022);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMonth()).toBe(10);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getDate()).toBe(6);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getHours()).toBe(1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMinutes()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getSeconds()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMilliseconds()).toBe(0);
    });
    it("stringH24MinToDate() after DST End", () => {
        const date1 = new Date(2022, 10, 6);
        const time1 = '03:00';
        const date1Result = (0, DateService_1.stringH24MinToDate)(date1, time1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getFullYear()).toBe(2022);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMonth()).toBe(10);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getDate()).toBe(6);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getHours()).toBe(3);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMinutes()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getSeconds()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMilliseconds()).toBe(0);
    });
    it("stringH24MinToDate() Year End", () => {
        const date1 = new Date(2022, 11, 31);
        const time1 = '23:59';
        const date1Result = (0, DateService_1.stringH24MinToDate)(date1, time1);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getFullYear()).toBe(2022);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMonth()).toBe(11);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getDate()).toBe(31);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getHours()).toBe(23);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMinutes()).toBe(59);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getSeconds()).toBe(0);
        expect(date1Result === null || date1Result === void 0 ? void 0 : date1Result.getMilliseconds()).toBe(0);
    });
    it("millisecondDurationToMinSecTime()", () => {
        expect((0, DateService_1.millisecondDurationToMinSecTime)()).toBe("00:00");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(undefined)).toBe("00:00");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(null)).toBe("00:00");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(-1)).toBe("00:00");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(999)).toBe("00:00");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(1000)).toBe("00:01");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(1000 * 60)).toBe("01:00");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(1000 * 60)).toBe("01:00");
        expect((0, DateService_1.millisecondDurationToMinSecTime)(1000 * 60 * 60)).toBe("1:00:00");
    });
    it("dayOfTheYear()", () => {
        expect((0, DateService_1.dayOfTheYear)(2022, 0, 1)).toBe(1);
        expect((0, DateService_1.dayOfTheYear)(2022, 1, 0)).toBe(31);
        expect((0, DateService_1.dayOfTheYear)(2022, 1, 1)).toBe(32);
        expect((0, DateService_1.dayOfTheYear)(2022, 11, 31)).toBe(365);
        expect((0, DateService_1.dayOfTheYear)(2000, 11, 31)).toBe(366);
    });
});
describe("Date Calculation", () => {
    it("addDays()", () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        expect((_a = (0, DateService_1.addDays)()) === null || _a === void 0 ? void 0 : _a.getDate()).toBeUndefined();
        expect((_b = (0, DateService_1.addDays)(undefined)) === null || _b === void 0 ? void 0 : _b.getDate()).toBeUndefined();
        expect((_c = (0, DateService_1.addDays)(undefined, undefined)) === null || _c === void 0 ? void 0 : _c.getDate()).toBeUndefined();
        expect((_d = (0, DateService_1.addDays)(null)) === null || _d === void 0 ? void 0 : _d.getDate()).toBeUndefined();
        expect((_e = (0, DateService_1.addDays)(null, null)) === null || _e === void 0 ? void 0 : _e.getDate()).toBeUndefined();
        expect((_f = (0, DateService_1.addDays)(new Date(2022, 0, 1))) === null || _f === void 0 ? void 0 : _f.getDate()).toBe(1);
        expect((_g = (0, DateService_1.addDays)(new Date(2022, 0, 1), 0)) === null || _g === void 0 ? void 0 : _g.getDate()).toBe(1);
        expect((_h = (0, DateService_1.addDays)(new Date(2022, 0, 1), 1)) === null || _h === void 0 ? void 0 : _h.getDate()).toBe(2);
        expect((_j = (0, DateService_1.addDays)(new Date(2022, 0, 1), -1)) === null || _j === void 0 ? void 0 : _j.getDate()).toBe(31);
    });
    it("addMinutes()", () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        expect((_a = (0, DateService_1.addMinutes)()) === null || _a === void 0 ? void 0 : _a.getDate()).toBeUndefined();
        expect((_b = (0, DateService_1.addMinutes)(undefined)) === null || _b === void 0 ? void 0 : _b.getDate()).toBeUndefined();
        expect((_c = (0, DateService_1.addMinutes)(undefined, undefined)) === null || _c === void 0 ? void 0 : _c.getDate()).toBeUndefined();
        expect((_d = (0, DateService_1.addMinutes)(null)) === null || _d === void 0 ? void 0 : _d.getDate()).toBeUndefined();
        expect((_e = (0, DateService_1.addMinutes)(null, null)) === null || _e === void 0 ? void 0 : _e.getDate()).toBeUndefined();
        expect((_f = (0, DateService_1.addMinutes)(new Date(2022, 0, 1, 0, 0))) === null || _f === void 0 ? void 0 : _f.getMinutes()).toBe(0);
        expect((_g = (0, DateService_1.addMinutes)(new Date(2022, 0, 1, 0, 0), 0)) === null || _g === void 0 ? void 0 : _g.getMinutes()).toBe(0);
        expect((_h = (0, DateService_1.addMinutes)(new Date(2022, 0, 1, 0, 0), 1)) === null || _h === void 0 ? void 0 : _h.getMinutes()).toBe(1);
        expect((_j = (0, DateService_1.addMinutes)(new Date(2022, 0, 1, 0, 0), -1)) === null || _j === void 0 ? void 0 : _j.getMinutes()).toBe(59);
    });
    it("addMinutesToTime()", () => {
        expect((0, DateService_1.addMinutesTo24hTime)()).toBeUndefined();
        expect((0, DateService_1.addMinutesTo24hTime)(undefined)).toBeUndefined();
        expect((0, DateService_1.addMinutesTo24hTime)(undefined, undefined)).toBeUndefined();
        expect((0, DateService_1.addMinutesTo24hTime)(null)).toBeUndefined();
        expect((0, DateService_1.addMinutesTo24hTime)(null, null)).toBeUndefined();
        expect((0, DateService_1.addMinutesTo24hTime)("abc", 1)).toBeUndefined();
        expect((0, DateService_1.addMinutesTo24hTime)("\n\r 00:00 \n\r", 1)).toBe("00:01");
        expect((0, DateService_1.addMinutesTo24hTime)("00:00", 1)).toBe("00:01");
        expect((0, DateService_1.addMinutesTo24hTime)("00:00", -1)).toBe("23:59");
    });
});
//# sourceMappingURL=DateService-test.js.map