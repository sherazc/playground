let stringTimesToDate = require("../src/services/stringTimesToDate");

describe("stringTimesToDate function", () => {
    it("handle empty arguments", () => {
        expect(stringTimesToDate()).toBeFalsy();
        expect(stringTimesToDate(null)).toBeFalsy();
        expect(stringTimesToDate(0)).toBeFalsy();
        expect(stringTimesToDate(false)).toBeFalsy();
    });

    it("handle empty salatTime object", () => {
        let salatTime = stringTimesToDate({});
        expect(salatTime.fajr_athan).toBeFalsy();
        expect(salatTime.fajr_iqama).toBeFalsy();
        expect(salatTime.thuhr_athan).toBeFalsy();
        expect(salatTime.thuhr_iqama).toBeFalsy();
        expect(salatTime.asr_athan).toBeFalsy();
        expect(salatTime.asr_iqama).toBeFalsy();
        expect(salatTime.maghrib_athan).toBeFalsy();
        expect(salatTime.maghrib_iqama).toBeFalsy();
        expect(salatTime.isha_athan).toBeFalsy();
        expect(salatTime.isha_iqama).toBeFalsy();
    });

    it("times instance of Date", () => {
        let fakeSalatTime = makeFakeSalatTime();
        let salatTime = stringTimesToDate(fakeSalatTime);
        expect(salatTime.fajr_athan).toBeInstanceOf(Date);
        expect(salatTime.fajr_iqama).toBeInstanceOf(Date);
        expect(salatTime.thuhr_athan).toBeInstanceOf(Date);
        expect(salatTime.thuhr_iqama).toBeInstanceOf(Date);
        expect(salatTime.asr_athan).toBeInstanceOf(Date);
        expect(salatTime.asr_iqama).toBeInstanceOf(Date);
        expect(salatTime.maghrib_athan).toBeInstanceOf(Date);
        expect(salatTime.maghrib_iqama).toBeInstanceOf(Date);
        expect(salatTime.isha_athan).toBeInstanceOf(Date);
        expect(salatTime.isha_iqama).toBeInstanceOf(Date);

    });
});

let makeFakeSalatTime = () => {
    return {
        "id": "336",
        "prayer_date": "2013-12-02",
        "fajr_athan": "0000-00-00 06:12:00",
        "fajr_iqama": "0000-00-00 06:30:00",
        "thuhr_athan": "0000-00-00 12:27:00",
        "thuhr_iqama": "0000-00-00 14:00:00",
        "asr_athan": "0000-00-00 15:09:00",
        "asr_iqama": "0000-00-00 16:00:00",
        "maghrib_athan": "0000-00-00 17:28:00",
        "maghrib_iqama": "5 Min",
        "isha_athan": "0000-00-00 18:41:00",
        "isha_iqama": "0000-00-00 19:30:00",
        "shurooq": "0000-00-00 07:24:00",
        "maghrib_change": "0000-00-00 17:29:00",
        "maghrib_change_date": "2017-12-12",
        "fajr_change": "0000-00-00 06:45:00",
        "fajr_change_date": "2017-12-13",
        "isha_change": "0000-00-00 19:45:00",
        "isha_change_date": "2018-01-11",
        "asr_change": "0000-00-00 16:30:00",
        "asr_change_date": "2018-01-26"
    };
}