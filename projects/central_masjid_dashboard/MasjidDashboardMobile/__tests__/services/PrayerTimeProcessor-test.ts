import * as DateService from "mdb-core-js";
import { Constants } from "../../src/services/Constants";
import { processPrayerTime } from "../../src/services/PrayerTimeProcessor";
import { mockCreatePrayer } from "../../__mocks__/MockTypes";
/**
 * TODO. Add azan called boolean
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
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(DateService.millisecondDurationToMinSecTime(prayerTimeSummary.iqamaInMillis)).toBe("16:00");
    });



    it("processPrayerTime() - Current time Dhuhr Begin", () => {
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
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(DateService.millisecondDurationToMinSecTime(prayerTimeSummary.iqamaInMillis)).toBe("1:20:00");
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
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(DateService.millisecondDurationToMinSecTime(prayerTimeSummary.iqamaInMillis)).toBe("40:00");
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
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
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
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(DateService.millisecondDurationToMinSecTime(prayerTimeSummary.iqamaInMillis)).toBe("38:00");
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
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
    });



    it("processPrayerTime() - Current time Fajr iqama", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 6, 45, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(1);

        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 6, 29, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 6, 45, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 12, 40, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 14, 0, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(0);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(0);
    });



    it("processPrayerTime() - Current time Dhuhr iqama", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 14, 0, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(2);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 12, 40, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 14, 0, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 15, 20, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 16, 0, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(0);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(0);
    });


    it("processPrayerTime() - Current time Asr iqama", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 16, 0, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(3);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 15, 20, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 16, 0, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 17, 38, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah).toBeUndefined();

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(0);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(0);
    });


    it("processPrayerTime() - Current time Maghrib iqama", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 17, 43, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(4);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 17, 38, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah).toBeUndefined();


        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 18, 52, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 19, 30, 0, 0).getTime());

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(-1);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Isha iqama", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 19, 30, 0, 0);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(5);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 18, 52, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 19, 30, 0, 0).getTime());


        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 2, 1, 6, 29, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 2, 1, 6, 45, 0, 0).getTime());

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(0);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(0);
    });


    it("processPrayerTime() - Current time Fajr Prayer Progress", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 6, 45, 0, 0);
        nowDate.setMilliseconds(nowDate.getMilliseconds() + Constants.PRAYER_DURATION_MILLIS);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(1);

        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 6, 29, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 6, 45, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 12, 40, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 14, 0, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(600000);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Dhuhr Prayer Progress", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 14, 0, 0, 0);
        nowDate.setMilliseconds(nowDate.getMilliseconds() + Constants.PRAYER_DURATION_MILLIS);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(2);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[1]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 12, 40, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 14, 0, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 15, 20, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 16, 0, 0, 0).getTime());


        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(600000);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Asr Prayer Progress", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 16, 0, 0, 0);
        nowDate.setMilliseconds(nowDate.getMilliseconds() + Constants.PRAYER_DURATION_MILLIS);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(3);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[2]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 15, 20, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 16, 0, 0, 0).getTime());

        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 17, 38, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah).toBeUndefined();

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(600000);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Maghrib Prayer Progress", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 17, 38, 0, 0);
        nowDate.setMilliseconds(nowDate.getMilliseconds() + Constants.PRAYER_DURATION_MILLIS);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(4);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[3]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 17, 38, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah).toBeUndefined();


        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 1, 29, 18, 52, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 1, 29, 19, 30, 0, 0).getTime());

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        // expect(prayerTimeSummary.prayerInProgressMillis).toBe(600000); // TODO This should pass if maghrib iqama is setup
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
    });


    it("processPrayerTime() - Current time Ish Prayer Progress", () => {
        const prayer = mockCreatePrayer();

        const nowDate = new Date(2020, 1, 29, 19, 30, 0, 0);
        nowDate.setMilliseconds(nowDate.getMilliseconds() + Constants.PRAYER_DURATION_MILLIS);

        jest.spyOn(DateService, "getCurrentSystemDate").mockImplementation(() => nowDate);
        const prayerTimeSummary = processPrayerTime(prayer);


        expect(prayerTimeSummary.currentPrayerName).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerNumber).toBe(5);
        expect(prayerTimeSummary.currentPrayerPeriod[0].name).toBe(Constants.PRAYER_NAME[4]);
        expect(prayerTimeSummary.currentPrayerPeriod[0].azan.getTime()).toBe(new Date(2020, 1, 29, 18, 52, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[0].iqamah.getTime()).toBe(new Date(2020, 1, 29, 19, 30, 0, 0).getTime());


        expect(prayerTimeSummary.currentPrayerPeriod[1].name).toBe(Constants.PRAYER_NAME[0]);
        expect(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime()).toBe(new Date(2020, 2, 1, 6, 29, 0, 0).getTime());
        expect(prayerTimeSummary.currentPrayerPeriod[1].iqamah.getTime()).toBe(new Date(2020, 2, 1, 6, 45, 0, 0).getTime());

        expect(prayerTimeSummary.nextPrayerInMillis).toBe(prayerTimeSummary.currentPrayerPeriod[1].azan.getTime() - nowDate.getTime());

        expect(prayerTimeSummary.prayerAboutToStartMillis).toBe(-1);
        expect(prayerTimeSummary.prayerInProgressMillis).toBe(600000);
        expect(prayerTimeSummary.azanCalled).toBeTruthy();
        expect(prayerTimeSummary.iqamaInMillis).toBe(-1);
    });


    afterEach(() => { jest.restoreAllMocks(); });
});