import { updateCompanyListData } from "../../src/services/CompanyListDataService";
import { mockCreateCompanyListData } from "../../__mocks__/MockTypes";
import * as ApiMdb from "../../src/services/ApiMdb";
import * as ReduxStoreService from "../../src/store/ReduxStoreService";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import { ExpirableVersion } from "../../src/types/types";

/*
jest.mock("../../src/services/ExpirableVersionService", () => ({
    isExpired: () => true,
    createOrRefreshExpirableVersion: () => ({
        version: 300, // mockCreateExpirableVersion() creates version=300
    })
}));
*/

describe("CompanyListDataService", () => {

    test("updateCompanyListData() - Expired, Same Version", async () => {
        // Setup
        const mockCompanyListData = mockCreateCompanyListData();
        let mockInitTime = mockCompanyListData.tracker?.expirableVersion?.expirationDate?.jsDate.getTime();

        const spyApiCompanyListVersion = jest.spyOn(ApiMdb, "apiCompanyListVersion").mockImplementation(() => Promise.resolve({
            id: "abc",
            version: 300 // mockCreateExpirableVersion() creates version=300
        }));


        const spyIsExpired = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => true);
        const spyCreateOrRefreshExpirableVersion = jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion").mockImplementation((e?: ExpirableVersion) => ({}));
        const spyStoreDispatchCompanyListData = jest.spyOn(ReduxStoreService, "storeDispatchCompanyListData").mockImplementation(() => {});


        // Call
        await updateCompanyListData(mockCompanyListData);

        // Assert
        expect(spyApiCompanyListVersion).toBeCalled();
        expect(spyStoreDispatchCompanyListData).toBeCalled();
        expect(spyIsExpired).toBeCalled();
        expect(spyCreateOrRefreshExpirableVersion).toBeCalled();
    });

    afterEach(() => {
        // restore spy and mock modules
        jest.restoreAllMocks();
    });

});

