import { PrayersYear, CompanyData, SettingData, PrayersMonth, Prayer } from '../types/types';
import { nowUtcDate, dayOfTheYear as dateToDayOfYear } from './DateService';
import store from '../store/rootReducer';
import { Constants } from './Constants';
import PushNotification from "react-native-push-notification";


// TODO: find proper way to call it. Once if not expired.
export default function setupNotifications(companyId: string) {
    if (!isNotificationAlreadySet(companyId)) {
        console.log(`Not setting up notification. Notification already set for company ${companyId}.`);
        return
    }

    startNotificaitonsSetInterval(companyId);
}

const startNotificaitonsSetInterval = (companyId: string) => {
    const resetNotificationInterval = setInterval(() => {
        const companyData = store.getState().companyData;

        if (!isValidCompanyDataAvailable(companyId, companyData)) {
            console.log(`Not setting up notification. Valid company data not available.`);
            return
        }

        resetNotifications(companyData);

        clearInterval(resetNotificationInterval);
    }, 2000);
}

const resetNotifications = (companyData: CompanyData) => {
    removeAllExisitngNotificaitons();

    const setting = store.getState().setting;
    if (!isAnyAlertOn(setting)) {
        console.log(`Not setting up notification. No notification setting truned on.`);
        return;
    }

    // @ts-ignore
    const prayers = getUpcommingPrayers(companyData.prayersYear?.prayersMonths, 10);  // TODO: Move this number to Constant.ts

    console.log(prayers)



    /*

    Call notifcation api to cancle previous notifications

    use prayersYear to build scheduled notifications for next 10 days

    update notificaitions expiration time
    */
}

const getUpcommingPrayers = (pryerMonths: PrayersMonth[], daysCount: number): Prayer[] => {
    const allPrayers: Prayer[] = [];
    pryerMonths
        .map(pm => pm.prayers)
        .forEach(prayers => prayers.map(p => allPrayers.push(p)));
    const now = nowUtcDate();

    const dayOfYear = dateToDayOfYear(now);
    return Array(daysCount)
            .fill(0)
            .map((_, i) => (i + dayOfYear) % 366)
            .map(i => allPrayers[i]);
}

const isAnyAlertOn = (setting: SettingData): boolean => {
    return setting.azanAlert || setting.beforeIqamaAlert || setting.iqamaAlert;
}


const removeAllExisitngNotificaitons = () => {
    console.log("Removing all previously set notifications.");
    PushNotification.removeAllDeliveredNotifications();

    PushNotification.getScheduledLocalNotifications((notifications) => {
        if (notifications && notifications.length > 0) {
            notifications.forEach(n => {
                PushNotification.cancelLocalNotifications({ id: `${n.id}` });
            });
        }
    });
}

const isNotificationAlreadySet = (companyId: string): boolean => {
    const companyNotification = store.getState().companyData.companyNotificaiton;
    if (companyNotification === undefined) {
        return false;
    }

    const currentTimeMillis = nowUtcDate().getTime();

    return companyNotification.companyId === companyId
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
