import { updateCompanyListData } from "../../src/services/CompanyListDataService";
import { mockCreateCompanyListData } from "../../__mocks__/MockTypes";
import * as ApiMdb from "../../src/services/ApiMdb";
import * as ReduxStoreService from "../../src/store/ReduxStoreService";


jest.mock("../../src/services/ExpirableVersionService", () => ({
    isExpired: () => true,
    createOrRefreshExpirableVersion: () => ({
        version: 300, // mockCreateExpirableVersion() creates version=300
    })
}));


describe("CompanyListDataService", () => {

    test("updateCompanyListData() - Expired, Same Version", () => {
        // Setup
        const mockCompanyListData = mockCreateCompanyListData();
        let mockInitTime = mockCompanyListData.tracker?.expirableVersion?.expirationDate?.jsDate.getTime();

        const spyApiCompanyListVersion = jest.spyOn(ApiMdb, "apiCompanyListVersion").mockImplementation(() => Promise.resolve({
            id: "abc",
            version: 300 // mockCreateExpirableVersion() creates version=300
        }));

        
        const spyStoreDispatchCompanyListData = jest.spyOn(ReduxStoreService, "storeDispatchCompanyListData").mockImplementation();


        // Call
        updateCompanyListData(mockCompanyListData);

        // Assert
        expect(spyApiCompanyListVersion).toBeCalled();
        expect(spyStoreDispatchCompanyListData).toBeCalled();
    });

    afterEach(() => {
        // restore spy and mock modules
        jest.restoreAllMocks();
    });

});

