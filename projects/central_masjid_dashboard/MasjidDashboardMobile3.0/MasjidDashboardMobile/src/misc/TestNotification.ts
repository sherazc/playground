import * as Notifications from 'expo-notifications';

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



async function testIsNotificationAllowed() {
    const settings = await Notifications.getPermissionsAsync();
    return (
        settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
}

export const testRemoveAllNotifications = () => {
    Notifications.dismissAllNotificationsAsync();
    Notifications.cancelAllScheduledNotificationsAsync();
}

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
