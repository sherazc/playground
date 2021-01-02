import { Company, CompanyData, SettingData, PrayersMonth, Prayer, ScheduleNotification } from '../types/types';
import { nowUtcDate, dayOfTheYear, TIME_24_REGX, utcToLocalDate, addMinutesToTime, createExpirationDate } from './DateService';
import store from '../store/rootReducer';
import PushNotification from "react-native-push-notification";
import { Constants } from './Constants';
import { isNotBlankString } from './Utilities';


// TODO: find proper way to call it. Once if not expired.
export default function setupNotifications(companyId: string) {
    const companyData = store.getState().companyData;
    if (isNotificationAlreadySet(companyId, companyData)) {
        console.log(`Not setting up notification. Notification already set for company ${companyId}.`);
        return
    }

    startNotificaitonsTimeout(companyId, companyData);
}

const startNotificaitonsTimeout = (companyId: string, companyData: CompanyData) => {
    setTimeout(() => {
        if (!isValidCompanyDataAvailable(companyId, companyData)) {
            console.log(`Not setting up notification. Valid company data not available.`);
            return
        }

        resetNotifications(companyData);
        companyData.companyNotificaiton = {
            companyId,
            expirationMillis: createExpirationDate().getTime()
        }

        store.dispatch({type: "COMPANY_DATA_SET", payload: companyData})
    }, 2000);
}

const resetNotifications = (companyData: CompanyData) => {
    removeAllExisitngNotificaitons();

    const setting = store.getState().setting;
    if (!isAnyAlertOn(setting)) {
        console.log(`Not setting up notification. No notification setting truned on.`);
        return;
    }

    const now = nowUtcDate();

    // @ts-ignore
    const prayers = getUpcommingPrayers(now, companyData.prayersYear?.prayersMonths, 10);  // TODO: Move this number to Constant.ts

    // console.log(prayers)

    prayers.forEach(p => setupPrayerNotification(companyData.company, now, setting, p));


    /*

    TODO:

    ✅ Call notifcation api to cancle previous notifications

    ✅ find next 10 upcomming days prayers

    ✅ build notification from prayer array

    ✅ schedule notifications

    ✅ update notificaitions expiration time
    */
}



const setupPrayerNotification = (company: (Company | undefined), now: Date, setting: SettingData, prayer: Prayer) => {
    if (!prayer || !prayer.date) {
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
        notification = createNotification(title, message, now, prayer.date, prayer.fajr);
        if (notification) notifications.push(notification);

        // Duhar
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[1]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[1]);
        notification = createNotification(title, message, now, prayer.date, prayer.dhuhr);
        if (notification) notifications.push(notification);

        // Asr
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[2]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[2]);
        notification = createNotification(title, message, now, prayer.date, prayer.asr);
        if (notification) notifications.push(notification);

        // Maghrib
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[3]);
        notification = createNotification(title, message, now, prayer.date, prayer.maghrib);
        if (notification) notifications.push(notification);

        // Isha
        title = createAzanTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createAzanMessage(companyName, Constants.PRAYER_NAME[3]);
        notification = createNotification(title, message, now, prayer.date, prayer.maghribIqama);
        if (notification) notifications.push(notification);
    }

    // IQAMA
    if (setting.iqamaAlert) {
        // Fajr Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[0]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[0]);
        notification = createNotification(title, message, now, prayer.date, prayer.fajrIqama);
        if (notification) notifications.push(notification);

        // Duhar Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[1]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[1]);
        notification = createNotification(title, message, now, prayer.date, prayer.dhuhrIqama);
        if (notification) notifications.push(notification);

        // Asr Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[2]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[2]);
        notification = createNotification(title, message, now, prayer.date, prayer.asrIqama);
        if (notification) notifications.push(notification);

        // Maghrib Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[3]);
        time = addMinutesToTime(prayer.maghrib, 3);
        if (time) {
            notification = createNotification(title, message, now, prayer.date, time);
            if (notification) notifications.push(notification);
        }

        // Isha Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[4]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[4]);
        notification = createNotification(title, message, now, prayer.date, prayer.maghribIqama);
        if (notification) notifications.push(notification);
    }

    // BEFORE IQAMA


    if (setting.beforeIqamaAlert) {
        // Fajr Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[0]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[0]);
        time = addMinutesToTime(prayer.fajrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date, time) : undefined;
        if (notification) notifications.push(notification);

        // Duhar Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[1]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[1]);
        time = addMinutesToTime(prayer.dhuhrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date, time) : undefined;
        if (notification) notifications.push(notification);

        // Asr Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[2]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[2]);
        time = addMinutesToTime(prayer.asrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date, time) : undefined;
        if (notification) notifications.push(notification);

        // Maghrib Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[3]);
        time = addMinutesToTime(prayer.maghrib, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date, time) : undefined;
        if (notification) notifications.push(notification);

        // Isha Before Iqama
        title = createIqamaTitle(companyName, Constants.PRAYER_NAME[4]);
        message = createIqamaMessage(companyName, Constants.PRAYER_NAME[4]);
        time = addMinutesToTime(prayer.ishaIqama, -Constants.PRAYER_ABOUT_TO_START_MIN)
        notification = time ? createNotification(title, message, now, prayer.date, time) : undefined;
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
    if (scheduleDate.getTime() > utcToLocalDate(now).getTime()) {
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

    notifications
        .filter(n => n)
        .filter(n => n.date && isNotBlankString(n.message) && isNotBlankString(n.title))
        .forEach(n =>
            PushNotification.localNotificationSchedule({
                title: n.title,
                message: n.message,
                date: n.date,
                allowWhileIdle: false
            })
        );
}




const getCompanyName = (company: (Company | undefined)): string => {
    return company && company.name ? company.name : "";
}

/*
Test cases
getUpcommingPrayers(now, companyData.prayersYear?.prayersMonths, 10)[0].date.toISOString()
getUpcommingPrayers(now, companyData.prayersYear?.prayersMonths, 10)[9].date.toISOString()

getUpcommingPrayers(new Date(2020, 0, 1, 0, 0, 0, 0), companyData.prayersYear?.prayersMonths, 10);
getUpcommingPrayers(new Date(2020, 0, 1, 23, 59, 0, 0), companyData.prayersYear?.prayersMonths, 10);

getUpcommingPrayers(new Date(2020, 11, 31, 0, 0, 0, 0), companyData.prayersYear?.prayersMonths, 10);
getUpcommingPrayers(new Date(2020, 11, 31, 23, 59, 0, 0), companyData.prayersYear?.prayersMonths, 10);


getUpcommingPrayers(new Date('2020-01-01T00:00:00.000Z'), companyData.prayersYear?.prayersMonths, 10);
getUpcommingPrayers(new Date('2020-01-01T23:59:00.000Z'), companyData.prayersYear?.prayersMonths, 10);

getUpcommingPrayers(new Date('2020-12-31T00:00:00.000Z'), companyData.prayersYear?.prayersMonths, 10);
getUpcommingPrayers(new Date('2020-12-31T23:59:00.000Z'), companyData.prayersYear?.prayersMonths, 10);

*/
const getUpcommingPrayers = (now: Date, pryerMonths: PrayersMonth[], daysCount: number): Prayer[] => {
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

const isNotificationAlreadySet = (companyId: string, companyData: CompanyData): boolean => {
    const companyNotification = companyData.companyNotificaiton;
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
