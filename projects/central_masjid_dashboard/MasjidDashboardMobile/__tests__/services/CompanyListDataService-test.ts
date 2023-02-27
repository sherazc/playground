import { updateCompanyListData } from "../../src/services/CompanyListDataService";
import { mockCreateCompanyListData, mockCreateExpirableVersion, mockCreateCompany } from "../../__mocks__/MockTypes";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import * as ApiMdb from "../../src/services/ApiMdb";
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

        const spyApiCompanyListVersion = jest.spyOn(ApiMdb, "apiCompanyListVersion").mockImplementation(() => Promise.resolve({
            id: "abc",
            version: 300 // mockCreateExpirableVersion() creates version=300
        }));


        const spyIsExpired = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => true);
        const spyCreateOrRefreshExpirableVersion = jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion")
            .mockImplementation(() => (mockCreateExpirableVersion()));
        const spyStoreDispatchCompanyListData = jest.spyOn(ReduxStoreService, "storeDispatchCompanyListData").mockImplementation(() => { });


        // Call
        await updateCompanyListData(mockCompanyListData);

        // Assert
        expect(spyApiCompanyListVersion).toBeCalled();
        expect(spyStoreDispatchCompanyListData).toBeCalled();
        expect(spyIsExpired).toBeCalled();
        expect(spyCreateOrRefreshExpirableVersion).toBeCalled();


        expect(spyStoreDispatchCompanyListData).toBeCalledWith(expect.objectContaining({
            companies: expect.arrayContaining([expect.objectContaining({
                "id": "100",
                "name": "Hamzah Islamic Center",
                "url": "hic",
                "website": "https://www.masjidhamzah.com/",
                "address": {
                    "street": "665 Tidwell Rd",
                    "city": "Alpharetta",
                    "state": "GA",
                    "zip": "30004",
                    "longitude": null,
                    "latitude": null
                },
                "active": true
            })]),
            tracker: expect.objectContaining({
                "previousMonth": 1,
                "previousDate": 1,
                expirableVersion: expect.objectContaining({
                    "version": 300,
                    "expirationDate": expect.objectContaining({
                        isoDate: "2020-03-02T00:00:00.000-05:00"
                    }),
                }),
            })
        }));
    });


    test("updateCompanyListData() - Expired, different Version", async (done) => {
        // Setup
        const mockCompanyListData = mockCreateCompanyListData();

        const spyApiCompanyListVersion = jest.spyOn(ApiMdb, "apiCompanyListVersion").mockImplementation(() => Promise.resolve({
            id: "abc",
            version: 301 // mockCreateExpirableVersion() creates version=300
        }));

        const companyNameChanged = "Company Name Changed";
        const spyApiCompaniesActive = jest.spyOn(ApiMdb, "apiCompaniesActive").mockImplementation(() => Promise.resolve([{
            ...mockCreateCompany(),
            "name": companyNameChanged,
        }]));


        const spyIsExpired = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => true);
        const spyCreateOrRefreshExpirableVersion = jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion")
            .mockImplementation(() => (mockCreateExpirableVersion()));
        const spyStoreDispatchCompanyListData = jest.spyOn(ReduxStoreService, "storeDispatchCompanyListData").mockImplementation(() => { });


        // Call
        await updateCompanyListData(mockCompanyListData);

        // Assert
        setTimeout(() => {
            expect(spyApiCompanyListVersion).toBeCalled();
            expect(spyStoreDispatchCompanyListData).toBeCalled();
            expect(spyIsExpired).toBeCalled();
            expect(spyCreateOrRefreshExpirableVersion).toBeCalled();
            expect(spyApiCompaniesActive).toBeCalled();

            expect(spyStoreDispatchCompanyListData).toBeCalledWith(expect.objectContaining({
                companies: expect.arrayContaining([expect.objectContaining({
                    "id": "100",
                    "name": companyNameChanged,
                    "url": "hic",
                    "website": "https://www.masjidhamzah.com/",
                    "address": {
                        "street": "665 Tidwell Rd",
                        "city": "Alpharetta",
                        "state": "GA",
                        "zip": "30004",
                        "longitude": null,
                        "latitude": null
                    },
                    "active": true
                })]),
                tracker: expect.objectContaining({
                    "previousMonth": 1,
                    "previousDate": 1,
                    expirableVersion: expect.objectContaining({
                        "version": 301,
                        "expirationDate": expect.objectContaining({
                            isoDate: "2020-03-02T00:00:00.000-05:00"
                        }),
                    }),
                })
            }));

            done();
        });

    });

    afterEach(() => { jest.restoreAllMocks(); });
});
