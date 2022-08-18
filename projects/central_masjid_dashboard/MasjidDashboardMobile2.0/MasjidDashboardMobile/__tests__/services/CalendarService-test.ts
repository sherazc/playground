import { apiPrayersYear } from "../../src/services/CalendarService";
import { PrayersMonth, ServiceResponse } from "../../src/types/types";

jest.mock("../../src/services/common/DateService", () => ({
    getCurrentSystemDate: () => new Date(2000, 0, 1),
    parseObjectsIsoDateToMdDate: jest.fn(),
}));


jest.mock("../../src/services/Constants", () => ({
    Constants: {
        createYearCalendarEndpoint: () => "https://api.example.com/calendar",
    }
}));


const prayerMonthsResponse: ServiceResponse<PrayersMonth[]> = {
    successful: true,
    fieldErrors: {},
    message: "",
    target: []
}

jest.mock("../../src/services/ApiMdb", () => ({
    apiYearCalendar: jest.fn(() => Promise.resolve(prayerMonthsResponse)),
}));


jest.mock("../../src/services/CompanyDataService", () => ({
    isValidCompany: jest.fn(() => true),
}));


/*

*/


/*
mock fetch()

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(prayerMonthsResponse),
  })
);
*/

/*
jest.mock('../../src/services/CalendarService', () => {
    const originalModule = jest.requireActual('../../src/services/CalendarService');
  
    //Mock the default export and named export 'foo'
    return {
      __esModule: true,
      ...originalModule,
      myFunc: jest.fn(() => 'mocked baz'),
      // foo: 'mocked foo',
    };
  });
*/

/*
jest.mock("../../src/services/CalendarService", () => ({
    const originalModule = jest.requireActual('../foo-bar-baz');
    myFunc: jest.fn(() => {
        return "chaudhry";
    })
}));
*/

/*
global.myFunc = jest.fn(() => {
        return "chaudhry";
    }
);
*/

beforeEach(() => {
    // fetch.mockClear();
});
  

describe("CalendarService", () => {
    
    it("isValidPrayersMonths()", async () => {
        apiPrayersYear("a", 1);
    });
});