import * as DateService from "../../src/services/common/DateService";
import * as ExpirableVersionService from "../../src/services/ExpirableVersionService";
import * as CalendarService from "../../src/services/CalendarService";
import * as ReduxStoreService from "../../src/store/ReduxStoreService";
// import * as ApiMdb from "../../src/services/ApiMdb";
import { updateCompanyData } from "../../src/services/CompanyDataService";
import { CompanyData, CompanyDataVersion, Configuration, Prayer, ServiceResponse } from "../../src/types/types";
import { mockCreateServiceResponse } from "../../__mocks__/MockServiceResponse";
import { mockCreatePrayer } from "../../__mocks__/MockTypes";
import { mockPrayersYear } from "../../__mocks__/MockYearCalendar";


// TODO: upgrade react-native-push-notification and check if this is still needed
jest.mock("react-native-push-notification", () => ({}));

const companyId = "a"

jest.mock("../../src/services/ApiMdb", () => ({
    apiCompanyDataVersion: () => {
        const companyDataVersion: CompanyDataVersion = {
            id: "1",
            companyId: companyId,
            version: 101
        }
        return Promise.resolve(companyDataVersion);
    },
    apiPrayer: () => { // TODO: This method do not work with jest.spyOn()
        const serviceResponsePrayer: ServiceResponse<Prayer> = mockCreateServiceResponse(mockCreatePrayer(), true);
        return Promise.resolve(serviceResponsePrayer);
    },
    apiConfiguration: () => { // TODO: This method do not work with jest.spyOn()
        const configurations: Configuration[] = [{
            "name": "jumah_prayer",
            "value": "Only One Juma' 2:00pm"
        }];
        return Promise.resolve(configurations);
    },
}));


describe("CompanyDataService - API Service functions", () => {

    it("updateCompanyData()", async () => {
        // @ts-ignore
        const companyData: CompanyData = {
            // @ts-ignore
            company: { id: companyId },
            tracker: { expirableVersion: { version: 100 } }
        };

        jest.spyOn(DateService, "getTodaysMonth").mockImplementation(() => 2);
        jest.spyOn(DateService, "getTodaysDate").mockImplementation(() => 2);
        jest.spyOn(DateService, "isSameMonthDate").mockImplementation(() => false);
        jest.spyOn(DateService, "parseObjectsIsoDateToMdDate").mockImplementation(jest.fn());
        jest.spyOn(ExpirableVersionService, "createOrRefreshExpirableVersion").mockImplementation(() => ({}));
        jest.spyOn(CalendarService, "getPrayersYear").mockImplementation(() => Promise.resolve(mockPrayersYear));
        
        const storeDispatchCompanyDataSpy = jest.spyOn(ReduxStoreService, "storeDispatchCompanyData").mockImplementation(jest.fn());;
        await updateCompanyData(companyData);
        // https://geshan.com.np/blog/2022/07/jest-tohavebeencalledwith/
        expect(storeDispatchCompanyDataSpy).toBeCalled();

    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });
});

