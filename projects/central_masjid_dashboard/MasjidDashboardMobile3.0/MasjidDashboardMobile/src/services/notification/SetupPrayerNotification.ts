import { Company, PrayersDay, ScheduleNotification, SettingData } from "../../types/types";
import { addMinutesTo24hTime, TIME_24_REGX } from "../common/DateService";
import { isNotBlankString } from "../common/Utilities";
import { getCompanyName } from "../CompanyDataService";
import { Constants } from "../Constants";

/**
 * Sets up notification for a single PrayerDay.
 * 
 * @param company 
 * @param now 
 * @param setting 
 * @param prayer 
 * @returns 
 */

export const setupPrayerNotification = (company: (Company | undefined), now: Date, setting: SettingData, prayer: PrayersDay) => {
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


    console.log("\n\n\n\n############# Start Expo Set Notification #############");
    notifications
        .filter(n => n)
        .filter(n => n.date && isNotBlankString(n.message) && isNotBlankString(n.title))
        .forEach(n =>
            console.log("Expo Set notification.", n)

            /*
            PushNotification.localNotificationSchedule({
                title: n.title,
                message: n.message,
                date: n.date,
                largeIcon: "status_bar_icon_large",
                smallIcon: "status_bar_icon_small",
            })
            */
        );
    console.log("############# End Expo Set Notification #############\n\n\n\n", new Date());
}