import { isValidCompany } from "../../src/services/CompanyDataService";

describe("CompanyDataService", () => {

    it("isValidCompany()", () => {
        expect(isValidCompany()).toBeFalsy();
    });
});
