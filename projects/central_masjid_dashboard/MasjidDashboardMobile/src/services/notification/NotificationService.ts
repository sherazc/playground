import {storeDispatchSetting, storeGetCompanyData, storeGetSetting} from "../../store/ReduxStoreService";
import {
    CompanyData,
    CompanyNotification,
    createDefaultSettingData,
    PrayersDay,
    PrayersMonth,
    SettingData
} from "mdb-core-js";
import {debounce} from "../Debounce";
import {getCurrentSystemDate, dayOfTheYear, MdDate, addYears} from "mdb-core-js";
import {
    expoRegisterForNotificationsAsync,
    expoRemoveNotificationsAsync,
    isNotificationPossible
} from "./ExpoNotification";
import {setupPrayerNotificationAsync} from "./SetupPrayerNotificationAsync";
import {createExpirationDate} from "../ExpirableVersionService";

const NotificationConfig = {
    MAX_NOTIFICATION_SETUP_DAYS: 5,
    MAX_NOTIFICATIONS: 60, // iOS allows 64 maximum local schedule notifications
    CHANNEL_NAME: "MDB_NOTIFICATION",
    CHANNEL_DESCRIPTION: "Masjid dashboard notification channel"
}


export const setupNotificationOnSettingChangedHandler = (setting: SettingData) => {
    const companyData = storeGetCompanyData();
    setupNotificationV2Debounce(true, setting, false, companyData);
}

export const setupNotificationOnCompanyDataChangedHandler = (companyData: CompanyData) => {
    const setting = storeGetSetting();
    setupNotificationV2Debounce(false, setting, true, companyData);
}


/**
 * This method should be called on
 *  - SettingData changed
 *      - Called in Setting.tsx
 *  - After CompanyData is refreshed and App startup. CompanyData is refreshed when it expires and App startup.
 *      - Called inside CompanyDataService.ts updateCompanyData()
 *
 * @param settingChanged
 * @param setting
 * @param companyDataChanged
 * @param companyData
 */
const setupNotification = (settingChanged: boolean, setting: SettingData,
                           companyDataChanged: boolean, companyData: CompanyData) => {
    if (!isNotificationPossible()) {
        console.log("Notification are not possible")
        return;
    }

    console.log("Attempting to set notifications.");
    const now = getCurrentSystemDate();
    const anyAlertOn = isAnyAlertOn(setting);
    const validCompanyDataAvailable = isValidCompanyDataAvailable(companyData);
    const notificationExpired = isNotificationExpired(now.getTime(), setting.companyNotification);
    const sameCompany = isSameCompany(setting, companyData);

    // Invalid company Data
    if (!validCompanyDataAvailable) {
        removeNotificationsAsync().then(
            () => console.log("Removed all notifications. CompanyData is invalid."));
        return;
    }

    // No alerts setting
    if (!anyAlertOn) {
        removeNotificationsAsync().then(
            () => console.log("Removed all notifications. No alerts are on."));
        return;
    }

    if (!sameCompany) {
        setting.companyNotification.companyId = companyData.company.id;
    }

    if (sameCompany && !settingChanged) { // If settings has changes then ignore notificationExpired check.
        if (companyDataChanged && !notificationExpired) { // Expired only applied when company data is changed
            console.log("Not setting up notifications. SettingData has not changed. Previously set notification has not expired.");
            return;
        }
    }

    const notificationPromise = new Promise<SettingData | undefined>((resolve, reject) => {
        removeNotificationsAsync().then(() => { // Successfully removed
            expoRegisterForNotificationsAsync().then(registered => {
                if (registered) {
                    try {
                        console.log("Setting up notifications.");
                        const days = calculatePossibleNotificationDays(setting, NotificationConfig.MAX_NOTIFICATION_SETUP_DAYS);
                        const prayers = getUpcomingPrayers(now, companyData.prayersYear?.prayersMonths, days);
                        const setupPrayerPromises: Promise<any>[] = prayers.map(p => setupPrayerNotificationAsync(companyData.company, now, setting, p));

                        Promise.all(setupPrayerPromises)
                            .then(() => resolve(setting))
                            .catch(e => reject(e));
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject("Failed to registered for notification");
                }
            });


        }, (reason: any) => reject(reason)); // Failed to remove notification
    });

    notificationPromise.then((settingState: (SettingData | undefined)) => { // On accept
        if (settingState) {
            settingState.companyNotification.expirationMilliseconds = createExpirationDate().getTime();
            storeDispatchSetting(settingState);
        }
    }, notificationPromiseRejectCallback).catch(notificationPromiseRejectCallback);
}
const setupNotificationV2Debounce = debounce(setupNotification, 3000);

export const removeNotificationsAsync = (): Promise<any> => {
    return expoRemoveNotificationsAsync();
}


const notificationPromiseRejectCallback = (reason: any) => {
    console.log("Failed to setup notification.", reason);
    removeNotificationsAsync().then(
        () => console.log("Attempted to remove notifications again after failed to setup notification."));
    const defaultSettingData = createDefaultSettingData();
    storeDispatchSetting(defaultSettingData);
}


const isSameCompany = (setting: SettingData, companyData: CompanyData): boolean => {
    return setting && setting.companyNotification && !!setting.companyNotification.companyId
        && companyData.company && !!companyData.company.id
        && setting.companyNotification.companyId === companyData.company.id;
}

const isAnyAlertOn = (setting: SettingData): boolean => {
    return setting.azanAlert || setting.beforeIqamaAlert || setting.iqamaAlert;
}

// Checks companyId matches and valid prayerYear
const isValidCompanyDataAvailable = (companyData: CompanyData): boolean => {
    return companyData.prayersYear != undefined && companyData.prayersYear.year != undefined
        && companyData.prayersYear.prayersMonths != undefined
        && companyData.prayersYear.prayersMonths.length > 11;
}

const isNotificationExpired = (nowMilliseconds: number, companyNotification?: CompanyNotification): boolean => {
    return companyNotification === undefined
        || companyNotification.expirationMilliseconds === undefined
        || companyNotification.expirationMilliseconds < nowMilliseconds;
}

// TODO: Fix it. The max day it returns is 5 even if single alert is set
const calculatePossibleNotificationDays = (setting: SettingData, maxNotificationDays: number) => {
    let multiplier = 0;
    multiplier = setting.azanAlert ? multiplier + 1 : multiplier;
    multiplier = setting.beforeIqamaAlert ? multiplier + 1 : multiplier;
    multiplier = setting.iqamaAlert ? multiplier + 1 : multiplier;
    const notificationCount = maxNotificationDays * 5 * multiplier;

    let days: number;
    if (notificationCount > NotificationConfig.MAX_NOTIFICATIONS) {
        days = NotificationConfig.MAX_NOTIFICATIONS / 5 / multiplier;
    } else {
        days = notificationCount / 5 / multiplier;
    }
    return Math.floor(days);
}


const getUpcomingPrayers = (now: Date, prayerMonths: PrayersMonth[], daysCount: number): PrayersDay[] => {
    const allPrayers: PrayersDay[] = [];
    // Current year prayer
    prayerMonths
        .map(pm => pm.prayers)
        .forEach(prayers => prayers.map(p => allPrayers.push(p)));

    // Next year prayers
    prayerMonths
        .map(pm => pm.prayers)
        .forEach(prayers => prayers.map(p => allPrayers.push({
            ...p,
            date: new MdDate(addYears(p.date.jsDate, 1))
        })));


    const dayOfYear = dayOfTheYear(now.getFullYear(), now.getMonth(), now.getDate());

    return Array(daysCount)
        .fill(0)
        .map((_, i) => i + dayOfYear - 1) // -1 because dayOfYear start from 1
        .map(i => allPrayers[i]);
}

