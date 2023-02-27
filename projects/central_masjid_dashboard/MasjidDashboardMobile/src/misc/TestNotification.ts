import { 
    expoRemoveNotificationsAsync,
    expoScheduleNotificationAsync, 
    expoRegisterForNotificationsAsync 
} from '../services/notification/ExpoNotification';
import { ScheduleNotification } from "mdb-core-js";

export const testRemoveAllNotifications = () => {
    expoRemoveNotificationsAsync().then(() => console.log("All Notifications Removed!"));
}


let testNotificationCount = 0;
export const testScheduleNotification = (delaySeconds: number) => {

    const notificationDate = new Date();
    notificationDate.setSeconds(notificationDate.getSeconds() + delaySeconds);

    const notification: ScheduleNotification = {
        date: notificationDate,
        message: `MDB Notification (${++testNotificationCount}). ${notificationDate}`,
        title: "MDB Title"
    }

    expoRegisterForNotificationsAsync().then((registerSuccessful: boolean) => {
        if (registerSuccessful) {
            expoScheduleNotificationAsync(notification).then((notificationId: string) => {
                console.log(`Notification scheduled. id=${notificationId} notification=${JSON.stringify(notification)}`);
            });
        } else {
            console.log("Failed to schedule notification. Notification permission not granted.");
        }
    });
}
