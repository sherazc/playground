import { getPrayersYear } from "../../src/services/CalendarService";
import { PrayersMonth, ServiceResponse } from "mdb-core-js";
import { mockPrayersMonths } from "../../__mocks__/MockYearCalendar";


jest.mock("mdb-core-js", () => ({
    __esModule: true,
    ...jest.requireActual("mdb-core-js"),
    getCurrentSystemDate: () => new Date(2000, 0, 1),
    parseObjectsIsoDateToMdDate: jest.fn(),
}));


jest.mock("../../src/services/Constants", () => ({
    Constants: {
        createYearCalendarEndpoint: () => "https://api.example.com/calendar",
    }
}));


jest.mock("../../src/services/ApiMdb", () => ({
    apiYearCalendar: jest.fn(() => {
        const prayerMonthsResponse: ServiceResponse<PrayersMonth[]> = {
            successful: true,
            fieldErrors: {},
            message: "",
            target: mockPrayersMonths
        };

        return Promise.resolve(prayerMonthsResponse);
    }).mockImplementationOnce(() => {
        const prayerMonthsResponse: ServiceResponse<PrayersMonth[]> = {
            successful: false,
            fieldErrors: {},
            message: "",
            target: []
        };

        return Promise.resolve(prayerMonthsResponse);
    }),
}));


jest.mock("../../src/services/CompanyDataService", () => ({
    isValidCompany: jest.fn(() => true),
}));


describe("CalendarService", () => {

    it("getPrayersYear() - Fail", async () => {
        await getPrayersYear("a", 1).then(
            (prayersYear) => {
                fail("getPrayersYear() should have failed");
            }, (error) => {
                const invalidResponse = error.successful === false || error.target === undefined || error.target.length !== 12;
                expect(invalidResponse).toBeTruthy();
                // fail("Failed to get prayer years");
            }
        );
    });

    it("getPrayersYear() - Successful", async () => {
        await getPrayersYear("a", 1).then(
            (prayersYear) => {
                expect(prayersYear.year).toBe(1);
                expect(prayersYear.prayersMonths.length).toBe(12);
                prayersYear.prayersMonths.forEach((prayersMonth) => {
                    expect(prayersMonth.month).toBeTruthy();
                    expect(prayersMonth.prayers.length).toBeGreaterThan(28);
                    prayersMonth.prayers.forEach(prayer => {
                        expect(prayer.date).toBeTruthy();
                    });
                });
            }, (error) => {
                fail("getPrayersYear() should have been successful");
            }
        );
    });
});
