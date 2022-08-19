import { isValidCompany } from "../../src/services/CompanyDataService";

jest.mock("react-native-push-notification", () => ({}));

describe("CompanyDataService", () => {

    it("isValidCompany()", () => {
        expect(isValidCompany()).toBeFalsy();
    });
});
