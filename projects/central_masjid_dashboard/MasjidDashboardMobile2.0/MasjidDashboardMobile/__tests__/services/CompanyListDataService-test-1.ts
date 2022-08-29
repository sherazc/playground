import { updateCompanyListData } from "../../src/services/CompanyListDataService";
import { mockCreateCompanyListData } from "../../__mocks__/MockTypes";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";

describe("CompanyListDataService", () => {

    test("updateCompanyListData() - Not expired", () => {
        // Setup
        const mockCompanyListData = mockCreateCompanyListData();
        const spyIsExpired = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => false);

        // Call
        updateCompanyListData(mockCompanyListData);

        // Assert
        expect(spyIsExpired).toHaveBeenCalled();
    });

    afterEach(() => { jest.restoreAllMocks(); });
});
