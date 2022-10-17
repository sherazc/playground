import { Company, CompanyData, SettingData, PrayersMonth, Prayer, ScheduleNotification, CompanyNotification } from '../types/types';
import { getCurrentSystemDate, dayOfTheYear, TIME_24_REGX, addMinutesTo24hTime } from './common/DateService';
// import PushNotification from "react-native-push-notification";
import { Constants } from './Constants';
import { getCompanyName } from './CompanyDataService';
import { storeDispatchCompanyData, storeGetCompanyData, storeGetSetting } from '../store/ReduxStoreService';
import { createExpirationDate } from './ExpirableVersionService';
import * as Notifications from 'expo-notifications';


const NotificationConfig = {
    MAX_NOTIFICATION_SETUP_DAYS: 5,
    MAX_NOTIFICATIONS: 60, // iOS allows 64 maximum local schedule notifications
    CHANNEL_NAME: "MDB_NOTIFICATION",
    CHANNEL_DESCRIPTION: "Masjid dashboard notification channel"
}


export async function isNotificationAllowed() {
    const settings = await Notifications.getPermissionsAsync();
    return (
        settings.granted 
        || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
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
        expirationMillis: createExpirationDate().getTime()
    };

    companyData.companyNotification = companyNotification;
    storeDispatchCompanyData(companyData)
}

const resetNotifications = (companyData: CompanyData) => {
    removeAllExistingNotifications();

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

const setupPrayerNotification = (company: (Company | undefined), now: Date, setting: SettingData, prayer: Prayer) => {
    if (!prayer || !prayer.date.jsDate) {
        console.log("Not setting up alerts. Prayer not found.")
        return;
    }
    const notifications = [] as ScheduleNotification[];
    const companyName = getCompanyName(company);

    let title: string;
    let message: string;
    let notification: (ScheduleNotification | undefined);
    let time;

    // AZAN
    if (setting.azanAlert) {
        // Fajr
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[0]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[0]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.fajr);
        if (notification) notifications.push(notification);

        // Duhar
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[1]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[1]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.dhuhr);
        if (notification) notifications.push(notification);

        // Asr
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[2]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[2]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.asr);
        if (notification) notifications.push(notification);

        // Maghrib
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[3]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.maghrib);
        if (notification) notifications.push(notification);

        // Isha
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[4]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[4]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.isha);
        if (notification) notifications.push(notification);
    }

    // IQAMA
    if (setting.iqamaAlert) {
        // Fajr Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[0]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[0]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.fajrIqama);
        if (notification) notifications.push(notification);

        // Duhar Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[1]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[1]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.dhuhrIqama);
        if (notification) notifications.push(notification);

        // Asr Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[2]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[2]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.asrIqama);
        if (notification) notifications.push(notification);

        // Maghrib Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[3]);
        time = addMinutesTo24hTime(prayer.maghrib, 3);
        if (time) {
            notification = createNotification(title, message, now, prayer.date.jsDate, time);
            if (notification) notifications.push(notification);
        }

        // Isha Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[4]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[4]);
        notification = createNotification(title, message, now, prayer.date.jsDate, prayer.ishaIqama);
        if (notification) notifications.push(notification);
    }

    // BEFORE IQAMA
    if (setting.beforeIqamaAlert) {
        // Fajr Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[0]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[0]);
        time = addMinutesTo24hTime(prayer.fajrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Duhar Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[1]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[1]);
        time = addMinutesTo24hTime(prayer.dhuhrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Asr Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[2]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[2]);
        time = addMinutesTo24hTime(prayer.asrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Maghrib Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[3]);
        time = addMinutesTo24hTime(prayer.maghrib, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Isha Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[4]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[4]);
        time = addMinutesTo24hTime(prayer.ishaIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);
    }

    scheduleNotification(notifications);
}


const createNotification = (title: string, message: string, now: Date, prayerDate: Date, time: string): (ScheduleNotification | undefined) => {
    if (!TIME_24_REGX.test(time)) {
        return;
    }

    const timeSplit = time.split(':');
    const nowYear = now.getUTCFullYear();
    const year = nowYear > prayerDate.getUTCFullYear() ? nowYear + 1 : nowYear;
    const scheduleDate = new Date(year, prayerDate.getUTCMonth(), prayerDate.getUTCDate(),
        +timeSplit[0], +timeSplit[1], 0, 0);

    let notification: (ScheduleNotification | undefined);
    if (scheduleDate.getTime() > now.getTime()) {
        notification = { date: scheduleDate, title, message };
    }

    return notification;
}

const createAzanTitle = (companyName: string, prayerName: string) => {
    return `${prayerName} at ${companyName}`;
}

const createAzanMessage = (companyName: string, prayerName: string) => {
    return `It's ${prayerName} azan time at your ${companyName}. Get ready for salah.`;
}

const createIqamaTitle = (companyName: string, prayerName: string) => {
    return `${prayerName} iqama at ${companyName}`;
}

const createIqamaMessage = (companyName: string, prayerName: string) => {
    return `${prayerName} jamah is starting at ${companyName}.`;
}

const createBeforeIqamaTitle = (companyName: string, prayerName: string) => {
    return `${Constants.PRAYER_ABOUT_TO_START_MIN} mins - ${prayerName} iqama at ${companyName}`;
}

const createBeforeIqamaMessage = (companyName: string, prayerName: string) => {
    return `${prayerName} jamah is about to stand in ${Constants.PRAYER_ABOUT_TO_START_MIN} minutes at ${companyName}.`;
}

const scheduleNotification = (notifications: ScheduleNotification[]): void => {
    if (!notifications || notifications.length < 1) {
        return;
    }


    /*
    notifications
        .filter(n => n)
        .filter(n => n.date && isNotBlankString(n.message) && isNotBlankString(n.title))
        .forEach(n =>
            PushNotification.localNotificationSchedule({
                title: n.title,
                message: n.message,
                date: n.date,
                largeIcon: "status_bar_icon_large",
                smallIcon: "status_bar_icon_small",
            })
        );
        */
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
const getUpcomingPrayers = (now: Date, pryerMonths: PrayersMonth[], daysCount: number): Prayer[] => {
    const allPrayers: Prayer[] = [];
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

export const removeAllExistingNotifications = () => {
    console.log("Dismissing notification from status bar");
    Notifications.dismissAllNotificationsAsync();
    console.log("Removing all notification. Notifications.cancelAllScheduledNotificationsAsync()");
    Notifications.cancelAllScheduledNotificationsAsync();

    console.log("Removing individual notifications");
    Notifications.getAllScheduledNotificationsAsync()
        .then(expoNotificationArray => expoNotificationArray.forEach(expoNotification => {
            console.log("Removing and dismissing notification: ", expoNotification.identifier);
            Notifications.cancelScheduledNotificationAsync(expoNotification.identifier);
            Notifications.dismissNotificationAsync(expoNotification.identifier)
        }));

/*
    PushNotification.removeAllDeliveredNotifications();

    PushNotification.getScheduledLocalNotifications((notifications) => {
        if (notifications && notifications.length > 0) {
            notifications.forEach(n => {
                PushNotification.cancelLocalNotifications({ id: `${n.id}` });
            });
        }
    });
*/
}

const isNotificationAlreadySet = (companyId: string): boolean => {
    // Getting latest companyData from the store becasue
    // stale companyData notification state is not updated and
    // is ending up in endless loop.
    const companyData = storeGetCompanyData();
    const companyNotification = companyData.companyNotification;
    if (companyNotification === undefined) {
        return false;
    }

    const currentTimeMillis = getCurrentSystemDate().getTime();

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
