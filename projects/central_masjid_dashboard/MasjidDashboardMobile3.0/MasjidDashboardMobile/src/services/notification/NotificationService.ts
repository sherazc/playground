import {  CompanyData, SettingData, PrayersMonth, PrayersDay, CompanyNotification } from '../../types/types';
import { getCurrentSystemDate, dayOfTheYear } from '../common/DateService';
// import PushNotification from "react-native-push-notification";
import { storeDispatchCompanyData, storeGetCompanyData, storeGetSetting } from '../../store/ReduxStoreService';
import { createExpirationDate } from '../ExpirableVersionService';
import { expoRemoveAllExistingNotificationsAsync } from './ExpoNotification';
import { setupPrayerNotification } from './SetupPrayerNotification';


const NotificationConfig = {
    MAX_NOTIFICATION_SETUP_DAYS: 5,
    MAX_NOTIFICATIONS: 60, // iOS allows 64 maximum local schedule notifications
    CHANNEL_NAME: "MDB_NOTIFICATION",
    CHANNEL_DESCRIPTION: "Masjid dashboard notification channel"
}



// TODO: find proper way to call it. Once if not expired.
export default function setupNotifications(companyId: string, forceUpdate: boolean) {
    if (!forceUpdate && isNotificationAlreadySet(companyId)) {
        console.log(`Not setting up notification. Notification already set for company ${companyId}.`);
        return
    }

    startNotificationsSetInterval(companyId);
}

const startNotificationsSetInterval = (companyId: string) => {

    const notificationPromise = new Promise<CompanyData>((resolve, reject) => {
        const resetNotificationInterval = setInterval(() => {
            clearInterval(resetNotificationInterval);
            // Getting latest companyData from the store because
            // stale companyData prayer and prayerMonths state is not updated and
            // is ending up in endless loop.
            const companyData = storeGetCompanyData();
            if (!isValidCompanyDataAvailable(companyId, companyData)) {
                console.log(`Not setting up notification. Valid company data not available.`);
                reject();
                return
            }

            resetNotifications(companyData);

            resolve(companyData);
            
        }, 2000);
    });

    notificationPromise.then((companyData: CompanyData) => updateNotificationExpiration(companyData))
}

const updateNotificationExpiration = (companyData: CompanyData) => {
    console.log(`Company notifications set for ${companyData.companyNotification}`)

    const companyNotification:CompanyNotification = {
        companyId: companyData.company ? companyData.company.id : "",
        expirationMilliseconds: createExpirationDate().getTime()
    };

    companyData.companyNotification = companyNotification;
    storeDispatchCompanyData(companyData)
}

const resetNotifications = (companyData: CompanyData) => {
    removeAllExistingNotificationsAsync();

    const setting = storeGetSetting();
    if (!isAnyAlertOn(setting)) {
        console.log(`Not setting up notification. No notification settings are turned On.`);
        return;
    }

    const now = getCurrentSystemDate();

    if (companyData.prayersYear && companyData.prayersYear.prayersMonths) {
        const days = calculatePossibleNotificationDays(setting, NotificationConfig.MAX_NOTIFICATION_SETUP_DAYS);
        const prayers = getUpcomingPrayers(now, companyData.prayersYear?.prayersMonths, days);
        prayers.forEach(p => setupPrayerNotification(companyData.company, now, setting, p));
    }
}

const calculatePossibleNotificationDays = (setting: SettingData, maxNotificationDays: number) => {
    let multiplier = 0;
    multiplier = setting.azanAlert ? multiplier + 1 : multiplier;
    multiplier = setting.beforeIqamaAlert ? multiplier + 1 : multiplier;
    multiplier = setting.iqamaAlert ? multiplier + 1 : multiplier;
    const notificationCount = maxNotificationDays * 5 * multiplier;

    let days:number;
    if (notificationCount > NotificationConfig.MAX_NOTIFICATIONS) {
        days = NotificationConfig.MAX_NOTIFICATIONS / 5 / multiplier;
    } else {
        days = notificationCount / 5 / multiplier;
    }
    return Math.floor(days);
}



/*
Test cases
getUpcomingPrayers(now, companyData.prayersYear?.prayersMonths, 10)[0].date.toISOString()
getUpcomingPrayers(now, companyData.prayersYear?.prayersMonths, 10)[9].date.toISOString()

getUpcomingPrayers(new Date(2020, 0, 1, 0, 0, 0, 0), companyData.prayersYear?.prayersMonths, 10);
getUpcomingPrayers(new Date(2020, 0, 1, 23, 59, 0, 0), companyData.prayersYear?.prayersMonths, 10);

getUpcomingPrayers(new Date(2020, 11, 31, 0, 0, 0, 0), companyData.prayersYear?.prayersMonths, 10);
getUpcomingPrayers(new Date(2020, 11, 31, 23, 59, 0, 0), companyData.prayersYear?.prayersMonths, 10);


getUpcomingPrayers(new Date('2020-01-01T00:00:00.000Z'), companyData.prayersYear?.prayersMonths, 10);
getUpcomingPrayers(new Date('2020-01-01T23:59:00.000Z'), companyData.prayersYear?.prayersMonths, 10);

getUpcomingPrayers(new Date('2020-12-31T00:00:00.000Z'), companyData.prayersYear?.prayersMonths, 10);
getUpcomingPrayers(new Date('2020-12-31T23:59:00.000Z'), companyData.prayersYear?.prayersMonths, 10);

*/
const getUpcomingPrayers = (now: Date, pryerMonths: PrayersMonth[], daysCount: number): PrayersDay[] => {
    const allPrayers: PrayersDay[] = [];
    pryerMonths
        .map(pm => pm.prayers)
        .forEach(prayers => prayers.map(p => allPrayers.push(p)));

    const dayOfYear = dayOfTheYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return Array(daysCount)
        .fill(0)
        .map((_, i) => Math.abs((i + dayOfYear - 1) % 366))
        .map(i => allPrayers[i]);
}

const isAnyAlertOn = (setting: SettingData): boolean => {
    return setting.azanAlert || setting.beforeIqamaAlert || setting.iqamaAlert;
}

export const removeAllExistingNotificationsAsync = ():Promise<any> => {
    return expoRemoveAllExistingNotificationsAsync();
}


/**
 * Checks if notification is already set and not expired
 * 
 * @param companyId 
 * 
 * @returns 
 */
const isNotificationAlreadySet = (companyId: string): boolean => {
    // Getting latest companyData from the store because
    // stale companyData notification state is not updated and
    // is ending up in endless loop.
    const companyData = storeGetCompanyData();
    const companyNotification = companyData.companyNotification;
    if (companyNotification === undefined) {
        return false;
    }

    const currentTimeMillis = getCurrentSystemDate().getTime();

    return companyNotification.companyId === companyId
        && companyNotification.expirationMillis !== undefined
        && currentTimeMillis < companyNotification.expirationMillis;
}

// Checks same company and valid prayerYear
const isValidCompanyDataAvailable = (companyId: string, companyData: CompanyData): boolean => {
    return isSameCompany(companyId, companyData)
        && companyData.prayersYear != undefined && companyData.prayersYear.year != undefined
        && companyData.prayersYear.prayersMonths != undefined
        && companyData.prayersYear.prayersMonths.length > 11;
}

const isSameCompany = (companyId: string, companyData: CompanyData): boolean => {
    return companyData != undefined && companyData.company != undefined
        && companyData.company.id != undefined && companyData.company.id === companyId;
}
