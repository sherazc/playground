import { Alert } from 'react-native';
import { expoRemoveAllExistingNotificationsAsync as expoRemoveAllExistingNotificationsAsync, expoScheduleNotificationAsync, expoRegisterForNotificationsAsync } from '../services/notification/ExpoNotification';
import { ScheduleNotification } from '../types/types';

/*
// By default notification are only displayed if the app is not in the foreground.
// Use this to set What type of notification to show when the app is running
Notifications.setNotificationHandler({
    // Runs only is app is in the forground
    handleSuccess: notificationIdentifier => {
        console.log("handleSuccess(), Id", notificationIdentifier);
        // dismiss notification immediately after it is presented
        // Notifications.dismissNotificationAsync(notificationIdentifier);

    },
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
*/
/*

async function testIsNotificationAllowed() {
    const settings = await Notifications.getPermissionsAsync();
    return (
        settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
}
*/
/*

export async function testSchedulePushNotification(delaySeconds: number) {

    console.log("schedulePushNotification() seconds=" + delaySeconds, new Date());
    const hasPushNotificationPermissionGranted = await testIsNotificationAllowed();

    console.log("hasPushNotificationPermissionGranted", hasPushNotificationPermissionGranted);
    if (hasPushNotificationPermissionGranted) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Masjid Dashboard Title",
                body: 'Masjid Dashboard Body ' + new Date(),
                data: { data: 'Masjid Dashboard Data' },
            },
            trigger: { seconds: delaySeconds },
        });
    } else {
        Notifications.requestPermissionsAsync({
            android: {},
            ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true,
                // allowDisplayInCarPlay: true,
                // allowCriticalAlerts: true,
                // provideAppNotificationSettings: true,
                // allowProvisional?: true,
                // allowAnnouncements?: true,
            }
        });
    }
}


export async function testScheduleNotification(delaySeconds: number) {
    const notificationDate = new Date();
    notificationDate.setSeconds(notificationDate.getSeconds() + delaySeconds);

    const notification: ScheduleNotification = {
        date: notificationDate,
        message: "MDB Message " + notificationDate,
        title: "MDB Title"
    }

    // expoSetNotificationHandler() is optional. I think this should be called only once the app starts.
    // expoSetNotificationHandler();

    const hasPermission = expoHasNotificationPermissionAsync();
    console.log("Has notification permission.", hasPermission);

    
    if (hasPermission) {
        expoScheduleNotificationAsync(notification);    
    } else {
        expoRequestPermission();
    }
}
*/

export const testRemoveAllNotifications = () => {
    expoRemoveAllExistingNotificationsAsync().then(() => console.log("All Notifications Removed!"));
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
