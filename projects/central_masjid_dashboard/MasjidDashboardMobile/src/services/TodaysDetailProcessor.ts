import { Prayer, PrayerTime, SunriseTime, TodaysDetailMessage } from "../types/types";
import { Constants } from "./Constants";
import { nowUtcDate, stringH24MinToDate } from "./DateService";

export const processPrayerMessage = (prayer: Prayer): TodaysDetailMessage => {
    const result: TodaysDetailMessage = {
        currentPrayer: "",
        currentJamat: "",
        nextPrayer: ""
    };

    const now = nowUtcDate();

    const prayerTimes: (PrayerTime | SunriseTime)[] = [
        makePrayerTime(now, Constants.PRAYER_NAME[0], prayer.fajr, prayer.fajrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[1], prayer.dhuhr, prayer.dhuhrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[2], prayer.asr, prayer.asrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[3], prayer.maghrib, prayer.maghribIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[4], prayer.isha, prayer.ishaIqama),
        //@ts-ignore
        {name: Constants.PRAYER_NAME[5], time: stringH24MinToDate(now, prayer.sunrise)}
    ];

    console.log(prayerTimes)
    return result;
}


const makePrayerTime = (date: Date, name: string, azanTimeString: string, iqamahTimeString: string): PrayerTime => {
    //@ts-ignore
    return {name, azan: stringH24MinToDate(date, azanTimeString), iqamah: stringH24MinToDate(date, iqamahTimeString)};
}