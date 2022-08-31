import { updateCompanyListData } from "../../src/services/CompanyListDataService";
import { mockCreateCompanyListData } from "../../__mocks__/MockTypes";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import * as ApiMdb from "../../src/services/ApiMdb";
import { ExpirableVersion } from "../../src/types/types";
import * as ReduxStoreService from "../../src/store/ReduxStoreService";


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



    afterEach(() => { jest.restoreAllMocks(); });
});
