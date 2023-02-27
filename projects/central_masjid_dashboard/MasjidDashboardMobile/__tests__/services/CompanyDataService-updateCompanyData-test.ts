import * as DateService from "mdb-core-js";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import * as CalendarService from "../../src/services/CalendarService";
import * as ReduxStoreService from "../../src/store/ReduxStoreService";
import { updateCompanyData } from "../../src/services/CompanyDataService";
import { Company, CompanyData, CompanyDataVersion, PrayersDay, ServiceResponse } from "mdb-core-js";
import { mockCreateServiceResponse } from "../../__mocks__/MockServiceResponse";
import { mockCreateCompany, mockCreateCompanyDataVersion, mockCreateConfigurations, mockCreatePrayer } from "../../__mocks__/MockTypes";
import { mockPrayersYear, mockPrayersMonths } from "../../__mocks__/MockYearCalendar";


// TODO: upgrade react-native-push-notification and check if this is still needed
// jest.mock("react-native-push-notification", () => ({}));

const companyId = "a"
const mockCompany: Company = { ...mockCreateCompany(), id: companyId };
const mockDataCompanyVersion: CompanyDataVersion = { ...mockCreateCompanyDataVersion(), companyId };

jest.mock("../../src/services/ApiMdb", () => ({
    apiCompanyDataVersion: () => {
        return Promise.resolve(mockDataCompanyVersion);
    },
    apiPrayer: () => { // TODO: This method do not work with jest.spyOn()
        const serviceResponsePrayer: ServiceResponse<PrayersDay> = mockCreateServiceResponse(mockCreatePrayer(), true);
        return Promise.resolve(serviceResponsePrayer);
    },
    apiConfiguration: () => { // TODO: This method do not work with jest.spyOn()
        return Promise.resolve(mockCreateConfigurations());
    },
}));


describe("CompanyDataService - API Service functions", () => {

    afterEach(() => {
        // restore spy and mock modules
        jest.restoreAllMocks();
    });


    it("updateCompanyData() - Invalid company", () => {

        // Setup
        // @ts-ignore
        const companyData: CompanyData = {
            // @ts-ignore
            company: undefined,
        };

        const isSameMonthDateSpy = jest.spyOn(DateService, "isSameMonthDate");
        const isExpiredSpy = jest.spyOn(ExpirableVersionService, "isExpired");
        const storeDispatchCompanyDataSpy = jest.spyOn(ReduxStoreService, "storeDispatchCompanyData");

        // Call
        updateCompanyData(companyData);

        // Assert
        expect(isSameMonthDateSpy).not.toBeCalled();
        expect(isExpiredSpy).not.toBeCalled();
        expect(storeDispatchCompanyDataSpy).not.toBeCalled();
    });


    it("updateCompanyData() - Invalid company", () => {



        // Setup
        // @ts-ignore
        const companyData: CompanyData = {
            // @ts-ignore
            company: undefined,
        };

        const isSameMonthDateSpy = jest.spyOn(DateService, "isSameMonthDate");
        const isExpiredSpy = jest.spyOn(ExpirableVersionService, "isExpired");
        const storeDispatchCompanyDataSpy = jest.spyOn(ReduxStoreService, "storeDispatchCompanyData");

        // Call
        updateCompanyData(companyData);

        // Assert
        expect(isSameMonthDateSpy).not.toBeCalled();
        expect(isExpiredSpy).not.toBeCalled();
        expect(storeDispatchCompanyDataSpy).not.toBeCalled();
    });


    it("updateCompanyData() - Not Expired, Same date", () => {

        // Setup
        // @ts-ignore
        const companyData: CompanyData = {
            company: mockCompany,
            tracker: { expirableVersion: { version: 100 } }
        };

        jest.spyOn(DateService, "getTodaysMonth").mockImplementation(() => 2);
        jest.spyOn(DateService, "getTodaysDate").mockImplementation(() => 2);

        const parseObjectsIsoDateToMdDateSpy = jest.spyOn(DateService, "parseObjectsIsoDateToMdDate");
        const isSameMonthDateSpy = jest.spyOn(DateService, "isSameMonthDate").mockImplementation(() => true);
        const isExpiredSpy = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => false);
        const storeDispatchCompanyDataSpy = jest.spyOn(ReduxStoreService, "storeDispatchCompanyData");

        // Call
        updateCompanyData(companyData);

        // Assert
        expect(isSameMonthDateSpy).toBeCalled();
        expect(isExpiredSpy).toBeCalled();
        expect(parseObjectsIsoDateToMdDateSpy).not.toBeCalled();
        expect(storeDispatchCompanyDataSpy).not.toBeCalled();
    });



    // Read on done() and callbacks
    // https://jestjs.io/docs/asynchronous
    it("updateCompanyData() - Expired, different date, and different version", (done) => {

        // Setup
        // @ts-ignore
        const companyData: CompanyData = {
            company: mockCompany,
            tracker: { expirableVersion: { version: 100 } }
        };

        jest.spyOn(DateService, "getTodaysMonth").mockImplementation(() => 1);
        jest.spyOn(DateService, "getTodaysDate").mockImplementation(() => 2);
        jest.spyOn(DateService, "isSameMonthDate").mockImplementation(() => false);
        jest.spyOn(DateService, "parseObjectsIsoDateToMdDate").mockImplementation(jest.fn());
        jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => true);
        jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion").mockImplementation(() => ({}));
        jest.spyOn(CalendarService, "getPrayersYear").mockImplementation(() => Promise.resolve(mockPrayersYear));

        const storeDispatchCompanyDataSpy = jest.spyOn(ReduxStoreService, "storeDispatchCompanyData");

        // Call
        updateCompanyData(companyData);

        // Assert
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
            
            expect(storeDispatchCompanyDataSpy).toBeCalledWith(
                expect.objectContaining({
                    company: expect.objectContaining({ "id": "a" }),
                    prayer: mockCreatePrayer(),
                    configurations: mockCreateConfigurations(),
                    tracker: expect.objectContaining({ 
                        previousDate: 2, 
                        previousMonth: 1,
                        expirableVersion: expect.objectContaining({ "version": 500 })
                    }),
                    prayersYear: expect.objectContaining({
                        year: 2000,
                        prayersMonths: expect.arrayContaining(mockPrayersMonths)
                    }),
                })
            );
            done();
        });
    });

    it("updateCompanyData() - Expired, different date, same version and CompanyData previously loaded.", (done) => {
        // Setup
        // @ts-ignore
        const companyData: CompanyData = {
            company: mockCompany,
            tracker: { expirableVersion: { version: 500 } }, // 500 is the same version that is created by mockCreateCompanyDataVersion()
            configurations: mockCreateConfigurations(),
            prayersYear: mockPrayersYear
        };

        jest.spyOn(DateService, "getTodaysMonth").mockImplementation(() => 5);
        jest.spyOn(DateService, "getTodaysDate").mockImplementation(() => 6);

        const parseObjectsIsoDateToMdDateSpy = jest.spyOn(DateService, "parseObjectsIsoDateToMdDate").mockImplementation(jest.fn());;
        const isSameMonthDateSpy = jest.spyOn(DateService, "isSameMonthDate").mockImplementation(() => false);
        const isExpiredSpy = jest.spyOn(ExpirableVersionService, "isExpired").mockImplementation(() => true);
        const storeDispatchCompanyDataSpy = jest.spyOn(ReduxStoreService, "storeDispatchCompanyData");
        const getPrayersYearSpy = jest.spyOn(CalendarService, "getPrayersYear");

        // Call
        updateCompanyData(companyData);

        // Assert
        setTimeout(() => {
            expect(storeDispatchCompanyDataSpy).toBeCalled();
            expect(isSameMonthDateSpy).toBeCalled();
            expect(isExpiredSpy).toBeCalled();
            expect(getPrayersYearSpy).not.toBeCalled();
            expect(parseObjectsIsoDateToMdDateSpy).toBeCalled();

            expect(storeDispatchCompanyDataSpy).toBeCalledWith(expect.anything());
            
            expect(storeDispatchCompanyDataSpy).toBeCalledWith(
                expect.objectContaining({
                    company: expect.objectContaining({ "id": "a" }),
                    prayer: mockCreatePrayer(),
                    configurations: mockCreateConfigurations(),
                    tracker: expect.objectContaining({ 
                        previousDate: 6, 
                        previousMonth: 5,
                        expirableVersion: expect.objectContaining({ "version": 500 })
                    }),
                    prayersYear: expect.objectContaining({
                        year: 2000,
                        prayersMonths: expect.arrayContaining(mockPrayersMonths)
                    }),
                })
            );
            
            done();
        });
    });
});

