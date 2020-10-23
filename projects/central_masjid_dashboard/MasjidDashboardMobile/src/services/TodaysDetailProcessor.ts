import { Prayer, PrayerTime, DawnTime, TodaysDetailMessage } from "../types/types";
import { Constants } from "./Constants";

export const processPrayerMessage = (prayer: Prayer): TodaysDetailMessage => {
    const result: TodaysDetailMessage = {
        currentPrayer: "",
        currentJamat: "",
        nextPrayer: ""
    };

    const now = new Date();
    
    const prayerTimes: (PrayerTime | DawnTime)[] = [
        makePrayerTime(now, Constants.PRAYER_NAME[0], prayer.fajr, prayer.fajrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[1], prayer.dhuhr, prayer.dhuhrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[2], prayer.asr, prayer.asrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[3], prayer.maghrib, prayer.maghribIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[4], prayer.isha, prayer.ishaIqama),
        {name: Constants.PRAYER_NAME[5], time: new Date()}
    ];

    console.log(prayerTimes)
    return result;
}


const makePrayerTime = (now: Date, name: string, azanTimeString: string, iqamahTimeString: string): PrayerTime => {

    return {} as PrayerTime;
}