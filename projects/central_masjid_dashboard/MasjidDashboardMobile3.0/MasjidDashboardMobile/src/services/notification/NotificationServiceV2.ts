import {storeDispatchSetting, storeGetCompanyData, storeGetSetting} from "../../store/ReduxStoreService";
import {
    CompanyData,
    CompanyNotification,
    createDefaultSettingData,
    PrayersDay,
    PrayersMonth,
    SettingData
} from "../../types/types";
import {debounce} from "../Debounce";
import {getCurrentSystemDate, dayOfTheYear, TIME_24_REGX, addMinutesTo24hTime} from '../common/DateService';
import {expoRemoveAllExistingNotificationsAsync} from "./ExpoNotification";
import {setupPrayerNotification} from "./SetupPrayerNotification";
import {createExpirationDate} from "../ExpirableVersionService";

const NotificationConfig = {
    MAX_NOTIFICATION_SETUP_DAYS: 5,
    MAX_NOTIFICATIONS: 60, // iOS allows 64 maximum local schedule notifications
    CHANNEL_NAME: "MDB_NOTIFICATION",
    CHANNEL_DESCRIPTION: "Masjid dashboard notification channel"
}


export const setupNotificationOnSettingChangedHandler = (setting: SettingData) => {
    const companyData = storeGetCompanyData();
    setupNotification(true, setting, false, companyData);
}

export const setupNotificationOnCompanyDataChangedHandler = (companyDataPrevious: CompanyData, companyDataNext: CompanyData) => {
    const setting = storeGetSetting();
    const sameCompanyDataVersion = isSameCompanyDataVersion(companyDataPrevious, companyDataNext);
    setupNotification(true, setting, !sameCompanyDataVersion, companyDataNext);
}

const setupNotification = (settingChanged: boolean, setting: SettingData,
                             companyDataChanged: boolean, companyData: CompanyData) => {

    const now = getCurrentSystemDate();
    const anyAlertOn = isAnyAlertOn(setting);
    const validCompanyDataAvailable = isValidCompanyDataAvailable(companyData);
    const notificationExpired = isNotificationExpired(now.getTime(), setting.companyNotification);
    const sameCompany = isSameCompany(setting, companyData);

    // Invalid company Data
    if (!validCompanyDataAvailable) {
        removeAllExistingNotificationsAsyncV2().then(
            () => console.log("Removed all notifications. CompanyData is invalid."));
        return;
    }

    // No alerts setting
    if (!anyAlertOn) {
        removeAllExistingNotificationsAsyncV2().then(
            () => console.log("Removed all notifications. No alerts are on."));
        return;
    }

    if (!sameCompany) {
        setting.companyNotification.companyId = companyData.company.id;
    }

    // Alerts not expired and same as previous alert settings
    if (!companyDataChanged && !settingChanged && !notificationExpired) {
        console.log("Not setting up notifications. CompanyData and SettingData has not changed. Previously set notification has not expired.");
        return;
    }

    const notificationPromise = new Promise<SettingData | undefined>((resolve, reject) => {
        removeAllExistingNotificationsAsyncV2().then(() => { // Successfully removed
            try {
                console.log("Setting up notifications.");
                const days = calculatePossibleNotificationDays(setting, NotificationConfig.MAX_NOTIFICATION_SETUP_DAYS);
                const prayers = getUpcomingPrayers(now, companyData.prayersYear?.prayersMonths, days);
                prayers.forEach(p => setupPrayerNotification(companyData.company, now, setting, p));
                resolve(setting);
            } catch (error) {
                reject(error);
            }
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

export const removeAllExistingNotificationsAsyncV2 = (): Promise<any> => {
    return expoRemoveAllExistingNotificationsAsync();
}


const notificationPromiseRejectCallback = (reason: any) => {
    console.log("Failed to setup notification.", reason);
    removeAllExistingNotificationsAsyncV2().then(
        () => console.log("Attempted to remove notifications again after failed to setup notification."));
    const defaultSettingData = createDefaultSettingData();
    storeDispatchSetting(defaultSettingData);
}


const isSameSettingAlert = (setting1: SettingData, setting2: SettingData) => {
    return setting1 && setting2
        && setting1.azanAlert === setting2.azanAlert
        && setting1.beforeIqamaAlert === setting2.beforeIqamaAlert
        && setting1.iqamaAlert === setting2.iqamaAlert;
}

const isSameCompany = (setting: SettingData, companyData: CompanyData): boolean => {
    return setting && setting.companyNotification && setting.companyNotification.companyId
        && companyData.company && companyData.company.id
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


const isSameCompanyDataVersion = (companyData1: CompanyData, companyData2: CompanyData): boolean => {
    let version1 = getCompanyDataVersion(companyData1);
    let version2 = getCompanyDataVersion(companyData2);
    return version1 && version2 && version1 === version2;
}

const getCompanyDataVersion = (companyData: CompanyData): number | undefined => {
    let version = undefined;
    if (companyData && companyData.tracker && companyData.tracker.expirableVersion
        && companyData.tracker.expirableVersion.version) {
        version = companyData.tracker.expirableVersion.version;
    }
    return version;
}