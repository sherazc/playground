import { updateCompanyListData } from "../../src/services/CompanyListDataService";
import { mockCreateCompanyListData } from "../../__mocks__/MockTypes";
import * as DateService from "../../src/services/common/DateService";
import * as ApiMdb from "../../src/services/ApiMdb";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import { CompanyListVersion } from "../../src/types/types";


// const mockCompanyListVersion:CompanyListVersion = 


describe("CompanyListDataService", () => {

    afterEach(() => {
        // restore spy and mock modules
        jest.restoreAllMocks();
    });


    test("updateCompanyListData() - Not expired", () => {
        // Setup
        const mockCompanyListData = mockCreateCompanyListData();
        const spyIsExpired = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => false);

        // Call
        updateCompanyListData(mockCompanyListData);

        // Assert
        expect(spyIsExpired).toHaveBeenCalled();
    });


    test("updateCompanyListData() - Expired, Same Version", (done) => {
        // Setup
        const mockCompanyListData = mockCreateCompanyListData();
        let mockInitTime = mockCompanyListData.tracker?.expirableVersion?.expirationDate?.jsDate.getTime();
        
        const spyCreateOrRefreshExpirableVersion = jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion").mockImplementation(() => ({}));
        
        const spyIsExpired = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => true);
        // const spyCreateOrRefreshExpirableVersion = jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion").mockImplementation(() => ({
        //     version: 300, // mockCreateExpirableVersion() creates version=300
        //     // @ts-ignore
        //     expirationDate: new DateService.MdDate(new Date(mockInitTime + 1000))
        // }));

        

        const spyApiCompanyListVersion = jest.spyOn(ApiMdb, "apiCompanyListVersion").mockImplementation(() => Promise.resolve({
            id: "abc",
            version: 300 // mockCreateExpirableVersion() creates version=300
        }));


        // Call
        updateCompanyListData(mockCompanyListData);

        // Assert
        expect(spyIsExpired).toHaveBeenCalled();
        expect(spyApiCompanyListVersion).toHaveBeenCalled();
        // expect(spyCreateOrRefreshExpirableVersion).toHaveReturned();
        done();
    });
});