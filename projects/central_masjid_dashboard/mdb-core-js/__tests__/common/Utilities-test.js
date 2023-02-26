"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = require("../../../src/services/common/Utilities");
describe("Utilities - String", () => {
    it("isEqualStrings()", () => {
        expect((0, Utilities_1.isEqualStrings)()).toBeFalsy();
        expect((0, Utilities_1.isEqualStrings)("a", undefined)).toBeFalsy();
        expect((0, Utilities_1.isEqualStrings)(undefined, "a")).toBeFalsy();
        expect((0, Utilities_1.isEqualStrings)("a", "b")).toBeFalsy();
        expect((0, Utilities_1.isEqualStrings)("a", "a")).toBeTruthy();
    });
    it("isNotBlankString()", () => {
        expect((0, Utilities_1.isNotBlankString)()).toBeFalsy();
        expect((0, Utilities_1.isNotBlankString)(undefined)).toBeFalsy();
        expect((0, Utilities_1.isNotBlankString)("")).toBeFalsy();
        expect((0, Utilities_1.isNotBlankString)(" ")).toBeFalsy();
        expect((0, Utilities_1.isNotBlankString)(" \n \r ")).toBeFalsy();
        expect((0, Utilities_1.isNotBlankString)("a")).toBeTruthy();
    });
    it("isBlankString()", () => {
        expect((0, Utilities_1.isBlankString)()).toBeTruthy();
        expect((0, Utilities_1.isBlankString)(undefined)).toBeTruthy();
        expect((0, Utilities_1.isBlankString)("")).toBeTruthy();
        expect((0, Utilities_1.isBlankString)(" ")).toBeTruthy();
        expect((0, Utilities_1.isBlankString)(" \n \r ")).toBeTruthy();
        expect((0, Utilities_1.isBlankString)("a")).toBeFalsy();
    });
});
describe("Utilities - Number", () => {
    it("numberNaNToZero()", () => {
        expect((0, Utilities_1.numberNaNToZero)()).toBe(0);
        expect((0, Utilities_1.numberNaNToZero)(undefined)).toBe(0);
        expect((0, Utilities_1.numberNaNToZero)(Number.NaN)).toBe(0);
        expect((0, Utilities_1.numberNaNToZero)(1)).toBe(1);
        expect((0, Utilities_1.numberNaNToZero)(0)).toBe(0);
        expect((0, Utilities_1.numberNaNToZero)(-1)).toBe(-1);
    });
    it("numberTo2DigitsString()", () => {
        expect((0, Utilities_1.numberTo2DigitsString)()).toBe("00");
        expect((0, Utilities_1.numberTo2DigitsString)(undefined)).toBe("00");
        expect((0, Utilities_1.numberTo2DigitsString)(Number.NaN)).toBe("00");
        expect((0, Utilities_1.numberTo2DigitsString)(0)).toBe("00");
        expect((0, Utilities_1.numberTo2DigitsString)(1)).toBe("01");
        expect((0, Utilities_1.numberTo2DigitsString)(10)).toBe("10");
        expect((0, Utilities_1.numberTo2DigitsString)(-1)).toBe("-1");
    });
    it("subStringToNumber()", () => {
        expect((0, Utilities_1.subStringToNumber)("", 0, 0)).toBe(0);
        expect((0, Utilities_1.subStringToNumber)("", -1, 10)).toBe(0);
        expect((0, Utilities_1.subStringToNumber)("abc", -1, 10)).toBe(0);
        expect((0, Utilities_1.subStringToNumber)("abc", 1, 2)).toBe(0);
        expect((0, Utilities_1.subStringToNumber)("a1c", 1, 2)).toBe(1);
        expect((0, Utilities_1.subStringToNumber)("a100c", 1, 4)).toBe(100);
    });
});
describe("Utilities - Business", () => {
    it("findConfigurationByName()", () => {
        expect((0, Utilities_1.findConfigurationByName)([], "")).toBe("");
        expect((0, Utilities_1.findConfigurationByName)([], "badName")).toBe("");
        expect((0, Utilities_1.findConfigurationByName)([{ name: "k1", value: "v1" }], "badName")).toBe("");
        expect((0, Utilities_1.findConfigurationByName)([{ name: "k1", value: "v1" }], "k1")).toBe("v1");
    });
    it("findConfigurationByName() - default value", () => {
        expect((0, Utilities_1.findConfigurationByName)([], "", "d1")).toBe("d1");
        expect((0, Utilities_1.findConfigurationByName)([], "badName", "d1")).toBe("d1");
        expect((0, Utilities_1.findConfigurationByName)([{ name: "k1", value: "v1" }], "badName", "d1")).toBe("d1");
        expect((0, Utilities_1.findConfigurationByName)([{ name: "k1", value: "v1" }], "k1", "d1")).toBe("v1");
    });
});
describe("Utilities - Display", () => {
    it("stringToHslColor()", () => {
        expect((0, Utilities_1.stringToHslColor)("sheraz", 1, 2)).toBe("hsl(317, 1%, 2%)");
    });
    it("nameToInitials()", () => {
        expect((0, Utilities_1.nameToInitials)("")).toBe("");
        expect((0, Utilities_1.nameToInitials)("sheraz")).toBe("S");
        expect((0, Utilities_1.nameToInitials)("sheraz chaudhry")).toBe("SC");
        expect((0, Utilities_1.nameToInitials)("sheraz tariq chaudhry")).toBe("SC");
        expect((0, Utilities_1.nameToInitials)("sheraz - tariq - chaudhry")).toBe("SC");
        expect((0, Utilities_1.nameToInitials)("sheraz - abc tariq xyz - chaudhry")).toBe("SC");
    });
    it("trimEllipsis()", () => {
        expect((0, Utilities_1.trimEllipsis)("", 1)).toBe("");
        expect((0, Utilities_1.trimEllipsis)("a", 1)).toBe("a");
        expect((0, Utilities_1.trimEllipsis)("abc", 1)).toBe("a...");
    });
});
//# sourceMappingURL=Utilities-test.js.map