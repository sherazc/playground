import * as DateService from "../../src/services/common/DateService";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import * as CalendarService from "../../src/services/CalendarService";
import * as ReduxStoreService from "../../src/store/ReduxStoreService";
// import * as ApiMdb from "../../src/services/ApiMdb";
import { updateCompanyData } from "../../src/services/CompanyDataService";
import { Company, CompanyData, CompanyDataVersion, Configuration, Prayer, ServiceResponse } from "../../src/types/types";
import { mockCreateServiceResponse } from "../../__mocks__/MockServiceResponse";
import { mockCreateCompany, mockCreateCompanyDataVersion, mockCreateConfigurations, mockCreatePrayer } from "../../__mocks__/MockTypes";
import { mockPrayersYear, mockPrayersMonths } from "../../__mocks__/MockYearCalendar";


// TODO: upgrade react-native-push-notification and check if this is still needed
jest.mock("react-native-push-notification", () => ({}));

const companyId = "a"
const mockCompany: Company = { ...mockCreateCompany(), id: companyId };
const mockDataCompanyVersion: CompanyDataVersion = { ...mockCreateCompanyDataVersion(), companyId };

jest.mock("../../src/services/ApiMdb", () => ({
    apiCompanyDataVersion: () => {
        return Promise.resolve(mockDataCompanyVersion);
    },
    apiPrayer: () => { // TODO: This method do not work with jest.spyOn()
        const serviceResponsePrayer: ServiceResponse<Prayer> = mockCreateServiceResponse(mockCreatePrayer(), true);
        return Promise.resolve(serviceResponsePrayer);
    },
    apiConfiguration: () => { // TODO: This method do not work with jest.spyOn()
        return Promise.resolve(mockCreateConfigurations());
    },
}));


describe("CompanyDataService - API Service functions", () => {

    // Read on done() and callbacks
    // https://jestjs.io/docs/asynchronous
    it("updateCompanyData()", (done) => {
        // @ts-ignore
        const companyData: CompanyData = {
            // @ts-ignore
            company: mockCompany,
            tracker: { expirableVersion: { version: 100 } }
        };

        jest.spyOn(DateService, "getTodaysMonth").mockImplementation(() => 2);
        jest.spyOn(DateService, "getTodaysDate").mockImplementation(() => 2);
        jest.spyOn(DateService, "isSameMonthDate").mockImplementation(() => false);
        jest.spyOn(DateService, "parseObjectsIsoDateToMdDate").mockImplementation(jest.fn());
        jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion").mockImplementation(() => ({}));
        jest.spyOn(CalendarService, "getPrayersYear").mockImplementation(() => Promise.resolve(mockPrayersYear));

        const storeDispatchCompanyDataSpy = jest.spyOn(ReduxStoreService, "storeDispatchCompanyData");

        updateCompanyData(companyData);

        // This is good article that describes jest and async testing works. Covers done()
        // https://betterprogramming.pub/test-and-mock-asynchronous-calls-with-the-jest-testing-framework-c0efbbbde2c3

        // NOTE: This hack worked with combination of setTimeout() with no milliseconds and done()
        // Without setTimeout() I was not able assert storeDispatchCompanyDataSpy's arguments
        setTimeout(() => {

            // This link shows how parameters of spyOn function are asserted with nested expects
            // https://geshan.com.np/blog/2022/07/jest-tohavebeencalledwith/
            // https://jestjs.io/docs/expect#tohavebeencalledwitharg1-arg2-

            expect(storeDispatchCompanyDataSpy).toBeCalled();
            expect(storeDispatchCompanyDataSpy).toBeCalledWith(expect.anything());
            mockPrayersMonths
            expect(storeDispatchCompanyDataSpy).toBeCalledWith(
                expect.objectContaining({
                    company: expect.objectContaining({ "id": "a" }),
                    prayer: mockCreatePrayer(),
                    configurations: mockCreateConfigurations(),
                    tracker: expect.anything(), // TODO Test this
                    prayersYear: expect.objectContaining({ 
                        year: 2000, 
                        prayersMonths: expect.arrayContaining(mockPrayersMonths) 
                    }),
                })
            );
            done();
        });
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });
});

