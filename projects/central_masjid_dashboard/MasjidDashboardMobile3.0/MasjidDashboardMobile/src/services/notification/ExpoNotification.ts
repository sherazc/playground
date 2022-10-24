import * as Notifications from 'expo-notifications';
import { ScheduleNotification } from '../../types/types';
import * as Device from 'expo-device';
import { Platform } from 'react-native';


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


export async function expoScheduleNotification(scheduleNotification: ScheduleNotification) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: scheduleNotification.title,
            body: scheduleNotification.message
        },
        // trigger: { seconds: 10 },
        trigger: scheduleNotification.date
    });
}


// https://docs.expo.dev/push-notifications/push-notifications-setup/
export const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      } else {
        alert('Registered');
      }
      // const token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
      // this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };
