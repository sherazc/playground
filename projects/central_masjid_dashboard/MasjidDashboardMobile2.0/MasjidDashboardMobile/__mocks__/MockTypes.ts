import { MdDate } from "../src/services/common/DateService";
import { Prayer } from "../src/types/types";

const mockCreatePrayer = (prayer?: Object): Prayer => ({
    ...prayer,
    "date": new MdDate("2016-01-01T00:00:00.000Z"),
    "hijriString": "",
    "fajr": "06:29",
    "fajrIqama": "06:45",
    "dhuhr": "12:40",
    "dhuhrIqama": "14:00",
    "asr": "15:20",
    "asrIqama": "16:00",
    "maghrib": "17:38",
    "maghribIqama": "5 Mins",
    "isha": "18:52",
    "ishaIqama": "19:30",
    "sunrise": "07:42",
    "fajrChange": "06:30",
    "fajrChangeDate": new MdDate("2022-02-15T00:00:00.000Z"),
    "dhuhrChange": null,
    "dhuhrChangeDate": null,
    "asrChange": "16:30",
    "asrChangeDate": new MdDate("2022-02-01T00:00:00.000Z"),
    "maghribChange": null,
    "maghribChangeDate": null,
    "ishaChange": "19:45",
    "ishaChangeDate": new MdDate("2022-01-15T00:00:00.000Z")
});

export { mockCreatePrayer }