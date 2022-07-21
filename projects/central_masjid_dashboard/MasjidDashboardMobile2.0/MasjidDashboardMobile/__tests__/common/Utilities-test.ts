import { findConfigurationByName, isBlankString, isEqualStrings, isNotBlankString, numberNaNToZero, numberTo2DigitsString, subStringToNumber } from "../../src/services/common/Utilities";

describe("Utilities - String", () => {
    it("isEqualStrings()", () => {
        expect(isEqualStrings()).toBeFalsy();
        expect(isEqualStrings("a", undefined)).toBeFalsy();
        expect(isEqualStrings(undefined, "a")).toBeFalsy();
        expect(isEqualStrings("a", "b")).toBeFalsy();
        expect(isEqualStrings("a", "a")).toBeTruthy();
    });

    it("isNotBlankString()", () => {
        expect(isNotBlankString()).toBeFalsy();
        expect(isNotBlankString(undefined)).toBeFalsy();
        expect(isNotBlankString("")).toBeFalsy();
        expect(isNotBlankString(" ")).toBeFalsy();
        expect(isNotBlankString(" \n \r ")).toBeFalsy();
        expect(isNotBlankString("a")).toBeTruthy();
    });

    it("isBlankString()", () => {
        expect(isBlankString()).toBeTruthy();
        expect(isBlankString(undefined)).toBeTruthy();
        expect(isBlankString("")).toBeTruthy();
        expect(isBlankString(" ")).toBeTruthy();
        expect(isBlankString(" \n \r ")).toBeTruthy();
        expect(isBlankString("a")).toBeFalsy();
    });
});


describe("Utilities - Number", () => {
    it("numberNaNToZero()", () => {
        expect(numberNaNToZero()).toBe(0);
        expect(numberNaNToZero(undefined)).toBe(0);
        expect(numberNaNToZero(Number.NaN)).toBe(0);
        expect(numberNaNToZero(1)).toBe(1);
        expect(numberNaNToZero(0)).toBe(0);
        expect(numberNaNToZero(-1)).toBe(-1);
    });


    it("numberTo2DigitsString()", () => {
        expect(numberTo2DigitsString()).toBe("00");
        expect(numberTo2DigitsString(undefined)).toBe("00");
        expect(numberTo2DigitsString(Number.NaN)).toBe("00");
        expect(numberTo2DigitsString(0)).toBe("00");
        expect(numberTo2DigitsString(1)).toBe("01");
        expect(numberTo2DigitsString(10)).toBe("10");
        expect(numberTo2DigitsString(-1)).toBe("-1");
    });


    it("subStringToNumber()", () => {
        expect(subStringToNumber("", 0, 0)).toBe(0);
        expect(subStringToNumber("", -1, 10)).toBe(0);
        expect(subStringToNumber("abc", -1, 10)).toBe(0);
        expect(subStringToNumber("abc", 1, 2)).toBe(0);
        expect(subStringToNumber("a1c", 1, 2)).toBe(1);
        expect(subStringToNumber("a100c", 1, 4)).toBe(100);
    });
});


describe("Utilities - Business", () => {
    it("findConfigurationByName()", () => {
        expect(findConfigurationByName([], "")).toBe("");
        expect(findConfigurationByName([], "badName")).toBe("");
        expect(findConfigurationByName([{name: "k1", value: "v1"}], "badName")).toBe("");
        expect(findConfigurationByName([{name: "k1", value: "v1"}], "k1")).toBe("v1");
    });

    it("findConfigurationByName() - default value", () => {
        expect(findConfigurationByName([], "", "d1")).toBe("d1");
        expect(findConfigurationByName([], "badName", "d1")).toBe("d1");
        expect(findConfigurationByName([{name: "k1", value: "v1"}], "badName", "d1")).toBe("d1");
        expect(findConfigurationByName([{name: "k1", value: "v1"}], "k1", "d1")).toBe("v1");
    });
});
