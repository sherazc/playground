import { MdDate } from "../src/services/common/DateService";
import { Prayer } from "../src/types/types";

const mockCreatePrayer = (prayer?: Object): Prayer => ({
    ...prayer,
    date: new MdDate(),
    hijriString: "",
    fajr: "",
    fajrIqama: "",
    dhuhr: "",
    dhuhrIqama: "",
    asr: "",
    asrIqama: "",
    maghrib: "",
    maghribIqama: "",
    isha: "",
    ishaIqama: "",
    sunrise: "",
});

export { mockCreatePrayer }