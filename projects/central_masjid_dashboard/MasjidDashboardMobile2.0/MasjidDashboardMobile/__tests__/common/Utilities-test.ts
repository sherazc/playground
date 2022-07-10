import { isBlankString, isEqualStrings, isNotBlankString } from "../../src/services/common/Utilities";

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
    });
});