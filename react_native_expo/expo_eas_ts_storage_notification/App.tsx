import { StatusBar } from 'expo-status-bar';
import { useState, } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export default function App() {
  const STORAGE_KEY = "STORAGE_KEY";

  const [storageValue, setStorageValue] = useState<string>("Initial value");
  

  const onPressSetStorage = () => {
    console.log("handleSetStorage", storageValue);
    AsyncStorage.setItem(STORAGE_KEY, storageValue);
  }

  const onPressGetStorage = () => {
    console.log("handleGetStorage", storageValue);
    AsyncStorage.getItem(STORAGE_KEY).then(value => setStorageValue(value as string));
  }

  return (
    <View style={styles.container}>
      <Text>My Test App</Text>
      <TextInput
        placeholder='Input text'
        onChangeText={text => setStorageValue(text)}
        value={storageValue} />

      <View>
        <Button onPress={onPressSetStorage} title='Set Storage' />
        <Button onPress={onPressGetStorage} title='Get Storage' />
      </View>

      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}



export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

async function schedulePushNotification() {

  console.log("schedulePushNotification()", new Date());
  const hasPushNotificationPermissionGranted = await allowsNotificationsAsync();

  console.log("hasPushNotificationPermissionGranted", hasPushNotificationPermissionGranted);

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
