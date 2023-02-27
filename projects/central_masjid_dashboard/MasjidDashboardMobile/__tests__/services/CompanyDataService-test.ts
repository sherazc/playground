import {isValidCompany} from "../../src/services/CompanyDataService";

// TODO: upgrade react-native-push-notification and check if this is still needed
// jest.mock("react-native-push-notification", () => ({}));

describe("CompanyDataService - Utility functions", () => {

    it("isValidCompany()", () => {
        expect(isValidCompany()).toBeFalsy();
        expect(isValidCompany(undefined)).toBeFalsy();
        // @ts-ignore
        expect(isValidCompany({})).toBeFalsy();
        // @ts-ignore
        expect(isValidCompany({id: "abc"})).toBeTruthy();
    });
});



