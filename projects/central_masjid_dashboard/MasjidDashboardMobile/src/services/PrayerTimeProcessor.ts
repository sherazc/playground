import { PrayersDay, PrayerTime, PrayerTimeSummary } from "mdb-core-js";
import { Constants } from "./Constants";
import { addDays, getCurrentSystemDate, stringH24MinToDate } from "mdb-core-js";

// TODO Calculate Maghrib iqama time.
// TODO Create backend configuration for maghrib iqama time
// TODO Beep at iqama time
// TODO Create configuration datatype
// TODO create configuration validation regex 

export const processPrayerTime = (prayer: PrayersDay): PrayerTimeSummary => {
    const result: PrayerTimeSummary = {
        currentPrayerPeriod: [],
        sunriseTime: undefined,
        timeBetweenShrooqAndZuhar: false,
        timeBetweenMaghribLimitAndIsha: false,
        prayerInProgressMillis: -1,
        prayerAboutToStartMillis: -1,
        nextPrayerInMillis: -1,
        currentPrayerName: "",
        currentPrayerNumber: -1,
        iqamaInMillis: -1, // new Field - If prayerPeriod[0].iqamah has not passed yet then calculate iqama in millis
        azanCalled: false, // new Field - now is >= prayerPeriod[0].azan
    };

    // TODO: Write a validatePrayer method
    if (!prayer || !prayer.date) {
        return result;
    }

    const now = getCurrentSystemDate();

    const prayerTimes: PrayerTime[] = [
        makePrayerTime(now, Constants.PRAYER_NAME[0], prayer.fajr, prayer.fajrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[1], prayer.dhuhr, prayer.dhuhrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[2], prayer.asr, prayer.asrIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[3], prayer.maghrib, prayer.maghribIqama),
        makePrayerTime(now, Constants.PRAYER_NAME[4], prayer.isha, prayer.ishaIqama)
    ];

    const sunriseTime = stringH24MinToDate(now, prayer.sunrise)
    const currentPrayerPeriod = getCurrentPrayerPeriod(now, prayerTimes);
    const timeBetweenShrooqAndZuhar = isTimeBetweenShrooqAndZuhar(now, prayerTimes[1], sunriseTime);
    const prayerInProgressMillis = getPrayerInProgressMillis(now, currentPrayerPeriod);
    const prayerAboutToStartMillis = getPrayerAboutToStartMillis(now, currentPrayerPeriod);
    const nextPrayerInMillis = getNextPrayerInMillis(now, currentPrayerPeriod);
    const timeBetweenMaghribLimitAndIsha = isTimeBetweenMaghribLimitAndIsha(now, prayerTimes);
    const currentPrayerName = getCurrentPrayerName(currentPrayerPeriod, timeBetweenShrooqAndZuhar, timeBetweenMaghribLimitAndIsha);
    const currentPrayerNumber = getCurrentPrayerNumber(currentPrayerPeriod, timeBetweenShrooqAndZuhar);
    const azanCalled = getAzanCalled(now, currentPrayerPeriod);
    const iqamaInMillis = getIqamaInMillis(now, currentPrayerPeriod);

    result.currentPrayerPeriod = currentPrayerPeriod;
    result.timeBetweenShrooqAndZuhar = timeBetweenShrooqAndZuhar;
    result.timeBetweenMaghribLimitAndIsha = timeBetweenMaghribLimitAndIsha;
    result.prayerInProgressMillis = prayerInProgressMillis;
    result.prayerAboutToStartMillis = prayerAboutToStartMillis;
    result.nextPrayerInMillis = nextPrayerInMillis;
    result.currentPrayerName = currentPrayerName;
    result.currentPrayerNumber = currentPrayerNumber;
    result.sunriseTime = sunriseTime;
    result.azanCalled = azanCalled;
    result.iqamaInMillis = iqamaInMillis;

    // console.log("processPrayerTime result", result);
    return result;
}

const isTimeBetweenMaghribLimitAndIsha = (date: Date, prayerTimes: PrayerTime[]): boolean => {
    if (!date || !prayerTimes || prayerTimes.length < 5
        || !prayerTimes[3] || !prayerTimes[3].azan
        || !prayerTimes[4] || !prayerTimes[4].azan) {
        return false;
    }

    const dateMillis = date.getTime()
    const maghribPrayerLimitMillis = prayerTimes[3].azan.getTime() + Constants.MAGHRIB_LIMIT_MILLIS;
    const ishaAzanMillis = prayerTimes[4].azan.getTime();

    return dateMillis > maghribPrayerLimitMillis && dateMillis < ishaAzanMillis;
}

const makePrayerTime = (date: Date, name: string, azanTimeString: string, iqamahTimeString: string): PrayerTime => {
    return makePrayerTimeFromDates(name, stringH24MinToDate(date, azanTimeString), stringH24MinToDate(date, iqamahTimeString));
}

const makePrayerTimeFromDates = (name: (string | undefined), azan: (Date | undefined), iqamah?: Date): PrayerTime => {
    return { name, azan, iqamah } as PrayerTime;
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
        // Different Date Scenario 1
        // current time is after 12:00am before fajr azan
        prayerPeriod.push(makePrayerTimeFromDates(prayerTimes[4].name, addDays(prayerTimes[4].azan, -1), addDays(prayerTimes[4].iqamah, -1)));
        prayerPeriod.push(prayerTimes[0]);
    } else if (nowTime >= prayerTimes[4].azan.getTime()) {
        // Different Date Scenario 2
        // current time is after isha azan and before 12:00am
        prayerPeriod.push(prayerTimes[4]);
        prayerPeriod.push(makePrayerTimeFromDates(prayerTimes[0].name, addDays(prayerTimes[0].azan, 1), addDays(prayerTimes[0].iqamah, 1)));
    } else {
        // Current time is after today's fajr azan and before isha
        for (let currentSalahIndex = 0; currentSalahIndex < prayerTimes.length; currentSalahIndex++) {
            let nextSalahIndex = (currentSalahIndex) + 1;
            if (nextSalahIndex > 4) {
                nextSalahIndex = 0;
            }
            let tempCurrentSalah = prayerTimes[currentSalahIndex];
            let tempNextSalah = prayerTimes[nextSalahIndex];

            if (nowTime >= tempCurrentSalah.azan.getTime()
                && nowTime < tempNextSalah.azan.getTime()) {
                prayerPeriod.push(tempCurrentSalah);
                prayerPeriod.push(tempNextSalah);
                break;
            }
        }
    }
    return prayerPeriod;
};


const isTimeBetweenShrooqAndZuhar = (now: Date, zuharPrayerTime: PrayerTime, sunriseTime: Date | undefined): boolean => {
    if (!now || !zuharPrayerTime || !zuharPrayerTime.azan || !sunriseTime) {
        return false;
    }

    const nowTime = now.getTime();
    let sunriseTimeMillis = sunriseTime.getTime();
    let zuharAzanMillis = zuharPrayerTime.azan.getTime();

    return nowTime > 0
        && sunriseTimeMillis > 0
        && zuharAzanMillis > 0
        && nowTime > sunriseTimeMillis
        && nowTime < zuharAzanMillis;
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

    const prayerInProgress = nowMillis >= prayerStartMillis && nowMillis <= prayerEndMillis;
    if (prayerInProgress) {
        return nowMillis - prayerStartMillis;
    } else {
        return -1;
    }
}

// Returns positive millis if prayer is about to start
const getPrayerAboutToStartMillis = (now: Date, prayerPeriod: (PrayerTime[] | undefined)): number => {
    if (!now || !prayerPeriod || !prayerPeriod[0] || !prayerPeriod[0].iqamah || !prayerPeriod[0].azan) {
        return -1;
    }

    const currentPrayerTime: PrayerTime = prayerPeriod[0];

    const nowMillis = now.getTime();
    const azanMillis = currentPrayerTime.azan.getTime();
    const prayerStartMillis = currentPrayerTime.iqamah.getTime();
    const prayerAboutToStartMillis = currentPrayerTime.iqamah.getTime() - Constants.PRAYER_ABOUT_TO_START_MILLIS;

    const azanCalled = nowMillis > azanMillis;
    const prayerAboutToStart = nowMillis > prayerAboutToStartMillis && nowMillis < prayerStartMillis;

    if (azanCalled && prayerAboutToStart) {
        return prayerStartMillis - nowMillis;
    } else {
        return -1;
    }
}

const getNextPrayerInMillis = (now: Date, prayerPeriod: (PrayerTime[] | undefined)): number => {
    if (!now || !prayerPeriod || !prayerPeriod[1] || !prayerPeriod[1].azan) {
        return -1;
    }

    const nextPrayerTime: PrayerTime = prayerPeriod[1];

    const nowMillis = now.getTime();
    const nextPrayerAzanMillis = nextPrayerTime.azan.getTime();
    return nextPrayerAzanMillis - nowMillis;
}


const getCurrentPrayerName = (prayerPeriod: (PrayerTime[] | undefined),
    timeBetweenShrooqAndZuhar: boolean, timeBetweenMaghribLimitAndIsha: boolean): string => {
    if (timeBetweenShrooqAndZuhar || timeBetweenMaghribLimitAndIsha) {
        return "";
    }

    if (!prayerPeriod || !prayerPeriod[0] || !prayerPeriod[0].name) {
        return "";
    }
    return prayerPeriod[0].name;
}

/**
 * -1 = Invalid
 * 0 = timeBetweenShrooqAndZuhar
 * 1 = Fajr
 * 2 = Zuhar
 * 3 = Asr
 * 4 = Maghrib
 * 5 = Isha
 *
 * @param prayerPeriod
 * @param timeBetweenShrooqAndZuhar
 */
const getCurrentPrayerNumber = (prayerPeriod: (PrayerTime[] | undefined), timeBetweenShrooqAndZuhar: boolean): number => {
    if (timeBetweenShrooqAndZuhar) {
        return 0;
    }

    if (!prayerPeriod || !prayerPeriod[0] || !prayerPeriod[0].name) {
        return -1;
    }

    let result;
    switch (prayerPeriod[0].name) {
        case Constants.PRAYER_NAME[0]:
            result = 1;
            break;
        case Constants.PRAYER_NAME[1]:
            result = 2;
            break;
        case Constants.PRAYER_NAME[2]:
            result = 3;
            break;
        case Constants.PRAYER_NAME[3]:
            result = 4;
            break;
        case Constants.PRAYER_NAME[4]:
            result = 5;
            break;
        default:
            result = -1
            break;
    }

    return result;
}


const getAzanCalled = (now: Date, prayerPeriod: (PrayerTime[] | undefined)): boolean => {
    if (!prayerPeriod || !prayerPeriod[0] || !prayerPeriod[0].azan) {
        return false;
    }
    return now.getTime() >= prayerPeriod[0].azan.getTime();
}

// If prayerPeriod[0].iqamah has not passed yet then calculate iqama in millis
const getIqamaInMillis = (now: Date, prayerPeriod: (PrayerTime[] | undefined)): number => {
    if (!prayerPeriod || !prayerPeriod[0] || !prayerPeriod[0].iqamah) {
        return -1;
    }
    
    if (now.getTime() <= prayerPeriod[0].iqamah.getTime()) {
        return prayerPeriod[0].iqamah.getTime() - now.getTime();
    } else {
        return -1
    }
}