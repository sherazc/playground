import * as DateService from "../../src/services/common/DateService";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import * as ApiMdb from "../../src/services/ApiMdb";
import { getCompanyId, getCompanyName, isValidCompany, updateCompanyData } from "../../src/services/CompanyDataService";
import { Company, CompanyData, CompanyDataVersion } from "../../src/types/types";

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


describe("CompanyDataService - API Service functions", () => {

    it("updateCompanyData()", () => {

        const companyId = "a"
        // @ts-ignore
        const companyData: CompanyData = {
            // @ts-ignore
            company: { id: companyId },
            tracker: {expirableVersion: {version: 100}}
        };

        const companyDataVersion: CompanyDataVersion = {
            id: "1",
            companyId: companyId,
            version: 101
        }

        jest.spyOn(DateService, "getTodaysMonth").mockImplementation(() => 2);
        jest.spyOn(DateService, "getTodaysDate").mockImplementation(() => 2);
        jest.spyOn(DateService, "isSameMonthDate").mockImplementation(() => false);

        jest.spyOn(ApiMdb, "apiCompanyDataVersion").mockImplementation(() => Promise.resolve(companyDataVersion));
        
        // const updateCompanyData = require("../../src/services/common/DateService");

        // jest.spyOn(updateCompanyData, "getTodaysMonth").mockImplementation(() => 2);

        updateCompanyData(companyData);

    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });
});

