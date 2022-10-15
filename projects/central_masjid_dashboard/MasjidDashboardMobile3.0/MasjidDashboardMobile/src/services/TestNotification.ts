import * as Notifications from 'expo-notifications';

async function allowsNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    return (
        settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
}

export async function schedulePushNotification() {

    console.log("schedulePushNotification()", new Date());
    const hasPushNotificationPermissionGranted = await allowsNotificationsAsync();

    console.log("hasPushNotificationPermissionGranted", hasPushNotificationPermissionGranted);
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
    if (hasPushNotificationPermissionGranted) {

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'Here is the notification body',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 1 },
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
