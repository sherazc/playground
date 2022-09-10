import * as DateService from "../../src/services/common/DateService";
import { Constants } from "../../src/services/Constants";
import { processPrayerTime } from "../../src/services/PrayerTimeProcessor";
import { mockCreatePrayer } from "../../__mocks__/MockTypes";
/**
 * TODO. Add azan called boolean
 * 
 * TODO. 
 */

describe("PrayerTimeProcessor", () => {

    it("processPrayerTime() - sunriseTime", () => {
        const spyGetCurrentSystemDate = jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => new Date(2020, 1, 29, 0, 0, 0, 0));
        const prayer = mockCreatePrayer();
        const prayerTimeSummary = processPrayerTime(prayer);

        expect(prayerTimeSummary.sunriseTime?.getHours()).toBe(7);
        expect(prayerTimeSummary.sunriseTime?.getMinutes()).toBe(42);
        expect(prayerTimeSummary.sunriseTime?.getSeconds()).toBe(0);
        expect(prayerTimeSummary.sunriseTime?.getMilliseconds()).toBe(0);

        expect(spyGetCurrentSystemDate).toBeCalled();
    });


    it("processPrayerTime() - Current time Fajr Begin", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 6, 29, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(1);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(nowDate.getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 6, 45, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 12, 40, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 14, 0, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
    });



    it("processPrayerTime() - Current time Zuhar Begin", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 12, 40, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(2);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(nowDate.getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 14, 0, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 15, 20, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 16, 0, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Asr Begin", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 15, 20, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(3);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(nowDate.getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 16, 0, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 17, 38, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah).toBeUndefined();


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Maghrib Begin", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 17, 38, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(4);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(nowDate.getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah).toBeUndefined();

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 18, 52, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 19, 30, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Isha Begin", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 18, 52, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);

        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(5);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(nowDate.getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 19, 30, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 2, 1, 6, 29, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 2, 1, 6, 45, 0, 0).getTime());

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time midnight", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 0, 0, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);

        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(5);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 28, 18, 52, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 28, 19, 30, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 6, 29, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 6, 45, 0, 0).getTime());

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
    });



    afterEach(() => { jest.restoreAllMocks(); });
});