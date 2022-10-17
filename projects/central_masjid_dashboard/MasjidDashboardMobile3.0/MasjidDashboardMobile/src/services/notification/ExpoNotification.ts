import * as Notifications from 'expo-notifications';
import { ScheduleNotification } from '../../types/types';


export const expoSetNotificationHandler = () => {
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
}


export async function expoHasNotificationPermission() {
    const settings = await Notifications.getPermissionsAsync();
    return (
        settings.granted
        || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
}


export const expoRequestPermission = () => {
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


export const expoRemoveAllExistingNotifications = () => {
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
}


export async function expoSchedulePushNotification(scheduleNotification: ScheduleNotification) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: scheduleNotification.title,
            body: scheduleNotification.message,
        },
        trigger: 10,
    });
}
