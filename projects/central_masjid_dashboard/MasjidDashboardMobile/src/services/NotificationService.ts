import { PrayersYear, CompanyData, SettingData, PrayersMonth, Prayer } from '../types/types';
import { nowUtcDate } from './DateService';
import store from '../store/rootReducer';
import { Constants } from './Constants';
import PushNotification from "react-native-push-notification";


// TODO: find proper way to call it. Once if not expired.
export default function setupNotifications(companyId: string) {
    if (!isNotificationAlreadySet(companyId)) {
        console.log(`Not setting up notification. Notification already set for ${companyId}.`);
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
    const prayers = getUpcommingPrayers(companyData.prayersYear?.prayersMonths);

    /*

    Call notifcation api to cancle previous notifications

    use prayersYear to build scheduled notifications for next 10 days

    update notificaitions expiration time
    */
}

const getUpcommingPrayers = (pryerMonths: PrayersMonth[]) => {
    const allPrayers: Prayer[] = [];
    pryerMonths
        .map(pm => pm.prayers)
        .forEach(prayers => prayers.map(p => allPrayers.push(p)));
    const now = nowUtcDate();

    now.get
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
    const companyData = store.getState().companyData;
    const notificationExpirationMillis = companyData.notificationExpirationMillis == undefined
        ? 0 : companyData.notificationExpirationMillis;

    const currentTimeMillis = nowUtcDate().getTime();

    return isSameCompany(companyId, companyData)
        && currentTimeMillis < notificationExpirationMillis;
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