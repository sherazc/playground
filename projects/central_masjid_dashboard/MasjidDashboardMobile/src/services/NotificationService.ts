import { Company, CompanyData, SettingData, PrayersMonth, Prayer, ScheduleNotification } from '../types/types';
import { nowUtcDate, dayOfTheYear, TIME_24_REGX, utcToLocalDate } from './DateService';
import store from '../store/rootReducer';
import PushNotification from "react-native-push-notification";
import { Constants } from './Constants';
import { isNotBlankString } from './Utilities';


// TODO: find proper way to call it. Once if not expired.
export default function setupNotifications(companyId: string) {
    if (isNotificationAlreadySet(companyId)) {
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
        // TODO update notification expiration
        // TODO update companyId in companyData.notification
        // TODO update companyData in store
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

    const now = nowUtcDate();

    // @ts-ignore
    const prayers = getUpcommingPrayers(now, companyData.prayersYear?.prayersMonths, 10);  // TODO: Move this number to Constant.ts

    // console.log(prayers)

    prayers.forEach(p => setupPrayerNotification(companyData.company, now, setting, p));


    /*

    TODO:

    ✅ Call notifcation api to cancle previous notifications

    ✅ find next 10 upcomming days prayers

    build notification from prayer array

    schedule notifications

    update notificaitions expiration time
    */
}

const setupPrayerNotification = (company: (Company | undefined), now: Date, setting: SettingData, prayer: Prayer) => {
    if (setting.azanAlert) {
        setupAzanAlert(company, now, prayer);
    }
}

const scheduleNotification = (notifications: ScheduleNotification[]): void => {
    if (!notifications || notifications.length < 1) {
        return;
    }

    notifications
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


const setupAzanAlert = (company: (Company | undefined), now: Date, prayer: Prayer) => {
    if (!prayer || !prayer.date) {
        console.log("Not setting up azan alerts. Prayer not found.")
        return;
    }

    const notifications = [] as ScheduleNotification[];
    addAzanNotification(company, notifications, now, prayer.date, Constants.PRAYER_NAME[0], prayer.fajr);
    addAzanNotification(company, notifications, now, prayer.date, Constants.PRAYER_NAME[1], prayer.dhuhr);
    addAzanNotification(company, notifications, now, prayer.date, Constants.PRAYER_NAME[2], prayer.asr);
    addAzanNotification(company, notifications, now, prayer.date, Constants.PRAYER_NAME[3], prayer.maghrib);
    addAzanNotification(company, notifications, now, prayer.date, Constants.PRAYER_NAME[4], prayer.isha);

    scheduleNotification(notifications);
}

const addAzanNotification = (company: (Company | undefined), notifications: ScheduleNotification[], now: Date, prayerDate: Date, name: string, time: string) => {
    if (!TIME_24_REGX.test(time)) {
        return;
    }

    const timeSplit = time.split(':');
    const nowYear = now.getUTCFullYear();
    const year = nowYear > prayerDate.getUTCFullYear() ? nowYear + 1 : nowYear;
    const scheduleDate = new Date(year, prayerDate.getUTCMonth(), prayerDate.getUTCDate(),
        +timeSplit[0], +timeSplit[1], 0, 0);

    if (scheduleDate.getTime() > utcToLocalDate(now).getTime()) {
        const companyName = getCompanyName(company);
        notifications.push({
            date: scheduleDate,
            title: `${name} at ${companyName}`,
            message: `It's ${name} azan time at ${companyName}`
        });
    }
}


const getCompanyName = (company: (Company | undefined)): string => {
    return company && company.name ? company.name : "";
}

/*
Test cases
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
