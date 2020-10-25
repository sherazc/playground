import { Prayer, PrayerTime, SunriseTime, TodaysDetailMessage } from "../types/types";
import { Constants } from "./Constants";
import { addDays, nowUtcDate, stringH24MinToDate } from "./DateService";

export const processPrayerMessage = (prayer: Prayer): TodaysDetailMessage => {
    const result: TodaysDetailMessage = {
        currentPrayer: "",
        currentJamat: "",
        nextPrayer: ""
    };
    if (!prayer || !prayer.date) {
        return result;
    }

    const now = nowUtcDate();

    const prayerTimes: PrayerTime[] = [
        makePrayerTime(now, Constants.PRAYER_NAME[0], prayer.fajr, prayer.fajrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[1], prayer.dhuhr, prayer.dhuhrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[2], prayer.asr, prayer.asrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[3], prayer.maghrib, prayer.maghribIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[4], prayer.isha, prayer.ishaIqama)
    ];

    // @ts-ignore
    const sunriseTime: SunriseTime = { name: Constants.PRAYER_NAME[5], time: stringH24MinToDate(now, prayer.sunrise) }

    const currentPrayerPeriod = getCurrentPrayerPeriod(now, prayerTimes);
    const timeBetweenShrooqAndZuhar = isTimeBetweenShrooqAndZuhar(now, prayerTimes[1], sunriseTime);
    const prayerInProgressMillis = getPrayerInProgressMillis(now, currentPrayerPeriod);
    const prayerAboutToStartMillis = getPrayerAboutToStartMillis(now, currentPrayerPeriod);


    console.log("prayerTimes", prayerTimes);
    console.log("currentPrayerPeriod", currentPrayerPeriod);
    console.log("timeBetweenShrooqAndZuhar", timeBetweenShrooqAndZuhar);
    console.log("prayerInProgressMillis", prayerInProgressMillis);
    console.log("prayerAboutToStartMillis", prayerAboutToStartMillis);

    return result;
}

const makePrayerTime = (date: Date, name: string, azanTimeString: string, iqamahTimeString: string): PrayerTime => {
    return makePrayerTimeFromDates(name, stringH24MinToDate(date, azanTimeString), stringH24MinToDate(date, iqamahTimeString));
}

const makePrayerTimeFromDates = (name: (string | undefined), azan: (Date | undefined), iqamah?: Date): PrayerTime => {
    // @ts-ignore
    return { name, azan, iqamah };
}

// VERY IMPORTANT: nowTime and prayerTimes arguments dates should have same date
// Return a pair of PrayerTime. Previous and next PrayerTime.
let getCurrentPrayerPeriod = (now: Date, prayerTimes: PrayerTime[]): (PrayerTime[] | undefined) => {
    if (!now || !prayerTimes || prayerTimes.length < 5) {
        return;
    }
    const nowTime = now.getTime();

    let prayerPeriod = [];

    if (nowTime < prayerTimes[0].azan.getTime()) {
        // current time is before today's fajar azan
        // yesterday isha
        prayerPeriod.push(makePrayerTimeFromDates(prayerTimes[4].name, addDays(prayerTimes[4].azan, -1), addDays(prayerTimes[4].iqamah, -1)));
        prayerPeriod.push(prayerTimes[0]);
    } else if (nowTime > prayerTimes[4].azan.getTime()) {
        // current time is after today's isha azan
        prayerPeriod.push(prayerTimes[4]);
        prayerPeriod.push(makePrayerTimeFromDates(prayerTimes[0].name, addDays(prayerTimes[0].azan, 1), addDays(prayerTimes[0].iqamah, 1)));
    } else {
        // Current time is after today's fajar azan and before isha
        for (let currentSalahIndex = 0; currentSalahIndex < prayerTimes.length; currentSalahIndex++) {
            let nextSalahIndex = (currentSalahIndex) + 1;
            if (nextSalahIndex > 4) {
                nextSalahIndex = 0;
            }
            let tempCurrentSalah = prayerTimes[currentSalahIndex];
            let tempNextSalah = prayerTimes[nextSalahIndex];

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


const isTimeBetweenShrooqAndZuhar = (now: Date, zuharPrayerTime: PrayerTime, sunriseTime: SunriseTime) => {
    if (!now || !zuharPrayerTime || !zuharPrayerTime.azan || !sunriseTime || !sunriseTime.time) {
        return false;
    }

    const nowTime = now.getTime();
    let sunriseTimeMillis = sunriseTime.time.getTime();
    let zuharAzanMillis = zuharPrayerTime.azan.getTime();
    return nowTime && sunriseTimeMillis && zuharAzanMillis && nowTime > sunriseTimeMillis && nowTime < zuharAzanMillis;
};

// Returns positive millis if prayer is in progress
const getPrayerInProgressMillis = (now: Date, prayerPeriod: (PrayerTime[] | undefined)): number => {
    if (!now || !prayerPeriod || !prayerPeriod[0] || !prayerPeriod[0].iqamah) {
        return -1;
    }

    const currentPrayerTime: PrayerTime = prayerPeriod[0];

    const nowMillis = now.getTime();
    const prayerStartMillis = currentPrayerTime.iqamah.getTime();
    const prayerEndMillis = currentPrayerTime.iqamah.getTime() + Constants.PRAYER_DURATION_MILLIS;

    const prayerInProgress = nowMillis > prayerStartMillis && nowMillis < prayerEndMillis;
    if (prayerInProgress) {
        return prayerEndMillis - nowMillis;
    } else {
        return -1;
    }
}

// Returns positive millis if prayer is about to start
const getPrayerAboutToStartMillis = (now: Date, prayerPeriod: (PrayerTime[] | undefined)): number => {
    if (!now || !prayerPeriod || !prayerPeriod[0] || !prayerPeriod[0].iqamah) {
        return -1;
    }

    const currentPrayerTime: PrayerTime = prayerPeriod[0];

    const nowMillis = now.getTime();
    const prayerStartMillis = currentPrayerTime.iqamah.getTime();
    const prayerAboutToStartMillis = currentPrayerTime.iqamah.getTime() - Constants.PRAYER_ABOUT_TO_START_MILLIS;

    const prayerAboutToStart = nowMillis > prayerAboutToStartMillis && nowMillis < prayerStartMillis;
    if (prayerAboutToStart) {
        return nowMillis - prayerAboutToStartMillis;
    } else {
        return -1;
    }
}


// Returns positive millis if prayer is about to start
const getNextPrayerInMillis = (now: Date, prayerPeriod: (PrayerTime[] | undefined)): number => {
    if (!now || !prayerPeriod || !prayerPeriod[1] || !prayerPeriod[1].azan) {
        return -1;
    }

    const nextPrayerTime: PrayerTime = prayerPeriod[1];

    const nowMillis = now.getTime();
    const nextPrayerAzanMillis = nextPrayerTime.azan.getTime();
    return nextPrayerAzanMillis - nowMillis;
}
