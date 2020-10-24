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


// VERY IMPORTANT: nowTime and prayerTimes arguments dates should have same date
// Return a pair of PrayerTime. Previous and next PrayerTime.
let getCurrentPrayerPeriod = (now:Date, prayerTimes:PrayerTime[]):(PrayerTime[] | undefined) => {
    if (!now || !prayerTimes || prayerTimes.length < 6) {
        return;
    }
    const nowTime = now.getTime();

    let prayerPeriod = [];

    if (nowTime < prayerTimes[0].azan.getTime()) {
        // current time is before today's fajar azan
        // yesterday isha
        prayerPeriod.push(makePrayerTime(now, prayerTimes[4].name, addDays(prayerTimes[4].azan, -1), addDays(prayerTimes[4].iqmah, -1)));
        prayerPeriod.push(prayerTimes[0]);
        //prayerPeriod.push(prayerTimes[4]);
        //prayerPeriod.push(makeSalahObject(salahs[0].name, addDays(salahs[0].azan, 1), addDays(salahs[0].iqmah, 1)));

    } else if (nowTime > salahs[4].azan.getTime()) {
        // current time is after today's isha azan
        prayerPeriod.push(salahs[4]);
        prayerPeriod.push(makeSalahObject(salahs[0].name, addDays(salahs[0].azan, 1), addDays(salahs[0].iqmah, 1)));
    } else {
        // Current time is after today's fajar azan
        for(let currentSalahIndex in salahs) {
            currentSalahIndex = (currentSalahIndex - 0);
            let nextSalahIndex = (currentSalahIndex) + 1;
            if (nextSalahIndex > 4) {
                nextSalahIndex = 0;
            }
            let tempCurrentSalah = salahs[currentSalahIndex];
            let tempNextSalah = salahs[nextSalahIndex];

            if (nowTime > tempCurrentSalah.azan.getTime()
                && nowTime < tempNextSalah.azan.getTime()) {
                    prayerPeriod.push(tempCurrentSalah);
                    prayerPeriod.push(tempNextSalah);
                break;
            }
        }
    }
    return prayerPeriod;
};