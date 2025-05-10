import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {Alert} from 'react-native';
import {SchedulableTriggerInputTypes} from "expo-notifications/src/Notifications.types";

export const expoRemoveNotificationsAsync = () => {
  const promises: Array<Promise<any>> = [];

  console.log("Dismissing notification from status bar");
  const dismissAllPromise: Promise<void> = Notifications.dismissAllNotificationsAsync();
  promises.push(dismissAllPromise);
  console.log("Removing all notification. Notifications.cancelAllScheduledNotificationsAsync()");
  const cancelAllPromise: Promise<void> = Notifications.cancelAllScheduledNotificationsAsync();
  promises.push(cancelAllPromise);
  console.log("Removing individual notifications");


  Notifications.getAllScheduledNotificationsAsync()
    .then(expoNotificationArray => expoNotificationArray.forEach(expoNotification => {
      console.log("Removing and dismissing notification: ", expoNotification.identifier);
      const dismissPromise = Notifications.dismissNotificationAsync(expoNotification.identifier);
      promises.push(dismissPromise);

      const cancelPromise = Notifications.cancelScheduledNotificationAsync(expoNotification.identifier);
      promises.push(cancelPromise);
    }));

  return Promise.all(promises);
}


// Returns notification identifier
export const expoScheduleNotificationAsync = async (title: string, message: string, date: Date): Promise<string> => {

  // TODO try to find what happens if same id is passed for multiple schedule notification
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message
    },
    // trigger: { seconds: 10 },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,
      date: date
    }
  });
}


// https://docs.expo.dev/push-notifications/push-notifications-setup/
// returns boolean if registration was successful
export const expoRegisterForNotificationsAsync = async (): Promise<boolean> => {
  let result = false;
  const {status: existingStatus} = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const {status} = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Notification permission', "Unable to set notification.");
  } else {
    result = true;
  }
  return result;
};

export const isNotificationPossible = (): boolean => {
  if (!Device.isDevice) {
    Alert.alert('No device!', "Must use physical device for Notifications.");
  }
  return Device.isDevice;
};
