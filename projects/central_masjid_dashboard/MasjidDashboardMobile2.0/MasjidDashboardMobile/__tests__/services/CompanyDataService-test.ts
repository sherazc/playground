import { getCompanyId, getCompanyName, isValidCompany } from "../../src/services/CompanyDataService";
import { Company } from "../../src/types/types";

// TODO: upgrade react-native-push-notification and check if this is still needed
jest.mock("react-native-push-notification", () => ({}));

describe("CompanyDataService - Utility functions", () => {

    it("isValidCompany()", () => {
        expect(isValidCompany()).toBeFalsy();
        expect(isValidCompany(undefined)).toBeFalsy();
        // @ts-ignore
        expect(isValidCompany({})).toBeFalsy();
        // @ts-ignore
        expect(isValidCompany({ id: "abc" })).toBeTruthy();
    });


    it("getCompanyName()", () => {
        // @ts-ignore
        const company: Company = {}

        expect(getCompanyName(company)).toBe("");

        company.name = ""
        expect(getCompanyName(company)).toBe("");

        company.name = "a"
        expect(getCompanyName(company)).toBe("a");
    });

    it("getCompanyId()", () => {
        // @ts-ignore
        const company: Company = {}

        expect(getCompanyId(company)).toBeUndefined();

        company.id = ""
        expect(getCompanyId(company)).toBeUndefined();

        company.id = "a"
        expect(getCompanyId(company)).toBe("a");

    });
});



