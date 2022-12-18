import { storeGetCompanyData, storeGetSetting } from "../../store/ReduxStoreService";
import { CompanyData, CompanyNotification, PrayersDay, PrayersMonth, SettingData } from "../../types/types";
import { debounce } from "../Debounce";
import { getCurrentSystemDate, dayOfTheYear, TIME_24_REGX, addMinutesTo24hTime } from '../common/DateService';
import { expoRemoveAllExistingNotificationsAsync } from "./ExpoNotification";

const NotificationConfig = {
    MAX_NOTIFICATION_SETUP_DAYS: 5,
    MAX_NOTIFICATIONS: 60, // iOS allows 64 maximum local schedule notifications
    CHANNEL_NAME: "MDB_NOTIFICATION",
    CHANNEL_DESCRIPTION: "Masjid dashboard notification channel"
}


const setupNotificationV2 = (settingState: SettingData, companyId: string) => {

    const notificationPromise = new Promise<boolean>((resolve, reject) => {
        const now = getCurrentSystemDate();
        
        const settingStore = storeGetSetting();
        const companyData = storeGetCompanyData();

        const sameSettingAlert = isSameSettingAlert(settingState, settingStore);
        const anyAlertOn = isAnyAlertOn(settingState);
        const validCompanyDataAvailable = isValidCompanyDataAvailable(companyId, companyData);
        const notificationExpired = isNotificationExpired(now.getTime(), companyData.companyNotification);


        // Invalid company Data
        if (!validCompanyDataAvailable) {
            removeAllExistingNotificationsAsyncV2();
            reject();
            return;
        }

        // No alerts setting
        if (!anyAlertOn) {
            removeAllExistingNotificationsAsyncV2();
            resolve(false);
            return;
        }

        // Alerts not expired and same as previous alert settings
        if (!notificationExpired && sameSettingAlert) {
            resolve(false);
            return;
        }
        
        removeAllExistingNotificationsAsyncV2().then(() => { // Successfully removed
            const days = calculatePossibleNotificationDays(settingState, NotificationConfig.MAX_NOTIFICATION_SETUP_DAYS);
            const prayers = getUpcomingPrayers(now, companyData.prayersYear?.prayersMonths, days);
            prayers.forEach(p => setupPrayerNotification(companyData.company, now, settingState, p));
        }, (reason: any) => { // Failed to remove notification
            reject(reason);
        });
    });


    notificationPromise.then((updateExpiration: boolean) => {
        // On accept
    }, (rejectReason: any) => {
        // On reject
    });
}
export const setupNotificationV2Debounce = debounce(setupNotificationV2, 3000);

export const removeAllExistingNotificationsAsyncV2 = ():Promise<any> => {
    return expoRemoveAllExistingNotificationsAsync();
}

const isSameSettingAlert = (setting1: SettingData, setting2: SettingData) => {
    return setting1 && setting2
        && setting1.azanAlert === setting2.azanAlert
        && setting1.beforeIqamaAlert === setting2.beforeIqamaAlert
        && setting1.iqamaAlert === setting2.iqamaAlert;
}

const isAnyAlertOn = (setting: SettingData): boolean => {
    return setting.azanAlert || setting.beforeIqamaAlert || setting.iqamaAlert;
}

// Checks companyId matches and valid prayerYear
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

const isNotificationExpired = (nowMilliseconds: number, companyNotification?: CompanyNotification): boolean => {
    return companyNotification === undefined
        || companyNotification.expirationMillis === undefined
        || companyNotification.expirationMillis < nowMilliseconds;
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


