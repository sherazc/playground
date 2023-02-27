import {Company, PrayersDay, ScheduleNotification, SettingData} from "mdb-core-js";
import {addMinutesTo24hTime, TIME_24_REGX} from "mdb-core-js";
import {Constants} from "../Constants";
import {expoScheduleNotificationAsync} from "./ExpoNotification";

/**
 * Sets up notification for a single PrayerDay.
 *
 * @param company
 * @param now
 * @param setting
 * @param prayer
 * @returns
 */

export const setupPrayerNotificationAsync = async (company: (Company | undefined), now: Date, setting: SettingData, prayer: PrayersDay) => {
    if (isFailureCountMaxedOut()) {
        const errorMessage = "Not setting up notifications. Failure count maxed out."
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
    if (!prayer || !prayer.date.jsDate) {
        console.log("Not setting up alerts. Prayer not found.")
        return;
    }
    const notifications = [] as ScheduleNotification[];
    const companyName = getCompanyName(company);

    let title: string;
    let message: string;
    let notification: (ScheduleNotification | undefined);
    let time: string;

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
        time = addMinutesTo24hTime(prayer.fajrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN);
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Duhar Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[1]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[1]);
        time = addMinutesTo24hTime(prayer.dhuhrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN);
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Asr Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[2]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[2]);
        time = addMinutesTo24hTime(prayer.asrIqama, -Constants.PRAYER_ABOUT_TO_START_MIN);
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Maghrib Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[3]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[3]);
        time = addMinutesTo24hTime(prayer.maghrib, -Constants.PRAYER_ABOUT_TO_START_MIN);
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);

        // Isha Before Iqama
        title = createBeforeIqamaTitle(companyName, Constants.PRAYER_NAME[4]);
        message = createBeforeIqamaMessage(companyName, Constants.PRAYER_NAME[4]);
        time = addMinutesTo24hTime(prayer.ishaIqama, -Constants.PRAYER_ABOUT_TO_START_MIN);
        notification = time ? createNotification(title, message, now, prayer.date.jsDate, time) : undefined;
        if (notification) notifications.push(notification);
    }

    await scheduleNotifications(notifications);
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
        notification = {date: scheduleDate, title, message};
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


const maxFailureCount = 3;
let failureCount = 0;
const isFailureCountMaxedOut = () => failureCount >= maxFailureCount;


const scheduleNotifications = async (notifications: ScheduleNotification[]) => {
    for (const notification of notifications) {
        if (isFailureCountMaxedOut()) {
            const errorMessage = "Not setting up notifications. Failure count maxed out."
            console.log(errorMessage);
            throw new Error(errorMessage);
        }
        try {
            await expoScheduleNotificationAsync(notification);
            console.log('Notification set.', notification)
        } catch (e) {
            failureCount++
        }
    }
}


const getCompanyName = (company: (Company | undefined)): string => {
    return company && company.name ? company.name : "";
}
