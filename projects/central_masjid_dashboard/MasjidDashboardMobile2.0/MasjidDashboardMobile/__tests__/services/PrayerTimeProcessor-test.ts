import * as DateService from "../../src/services/common/DateService";
import { Constants } from "../../src/services/Constants";
import { processPrayerTime } from "../../src/services/PrayerTimeProcessor";
import { mockCreatePrayer } from "../../__mocks__/MockTypes";

describe("PrayerTimeProcessor", () => {

    it("processPrayerTime() - sunriseTime", () => {
        const spyGetCurrentSystemDate = jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(()=> new Date(2000, 0, 1, 0, 0, 0, 0));
        const prayer = mockCreatePrayer();
        const prayerTimeSummary = processPrayerTime(prayer);

        expect(prayerTimeSummary.sunriseTime?.getHours()).toBe(7);
        expect(prayerTimeSummary.sunriseTime?.getMinutes()).toBe(42);
        expect(prayerTimeSummary.sunriseTime?.getSeconds()).toBe(0);
        expect(prayerTimeSummary.sunriseTime?.getMilliseconds()).toBe(0);

        expect(spyGetCurrentSystemDate).toBeCalled();    
    });


    it("processPrayerTime() - currentPrayerName and currentPrayerNumber", () => {
        const prayer = mockCreatePrayer();

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(()=> new Date(2000, 0, 1, 6, 29, 0, 0));
        const prayerTimeSummary = processPrayerTime(prayer);
        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[0])
    });


    it("processPrayerTime() - Zuhar Begin", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2000, 0, 1, 12, 40, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(()=> nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(2);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2000, 0, 1, 12, 40, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2000, 0, 1, 14, 0, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2000, 0, 1, 15, 20, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2000, 0, 1, 16, 0, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - new Date(2000, 0, 1, 12, 40, 0, 0).getTime());
        
        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
    

    });

    afterEach(() => { jest.restoreAllMocks(); });
});