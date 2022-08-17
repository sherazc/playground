import { apiPrayersYear } from "../../src/services/CalendarService";
import { PrayersMonth, ServiceResponse } from "../../src/types/types";

jest.mock("../../src/services/common/DateService", () => ({
    getCurrentSystemDate: () => new Date(2000, 0, 1),
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(prayerMonthsResponse),
  })
);

beforeEach(() => {
    // fetch.mockClear();
});
  

describe("CalendarService", () => {
    
    it("isValidPrayersMonths()", async () => {
        apiPrayersYear("a", 1);
        
    });
});