/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, TouchableOpacity, Alert

} from 'react-native';

import PushNotification from 'react-native-push-notification';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onSendNotification = () => {
    // Alert.alert(
    //   "Alert Title",
    //   "My Alert Msg");

      console.log("Notification", new Date());

      PushNotification.localNotification({
        channelId: "MDB_NOTIFICATION",
        message: "My Notification Message now",
      });
/*
      PushNotification.localNotification({
        channelId: "MDB_NOTIFICATION",

        message: "My Notification Message now", // (required)
        // date: new Date(Date.now() + 1000), // in 60 secs
        // largeIcon: "status_bar_icon_large",
        // smallIcon: "status_bar_icon_small",
      });

      PushNotification.localNotificationSchedule({
        channelId: "MDB_NOTIFICATION",

        message: "My Notification Message now", // (required)
        date: new Date(Date.now() + 1000), // in 60 secs
        largeIcon: "status_bar_icon_large",
        smallIcon: "status_bar_icon_small",
      });

      PushNotification.localNotificationSchedule({
        channelId: "MDB_NOTIFICATION",
        title: "Atitle",
        message: "n.message",
        date: new Date(Date.now() + 1000),
        largeIcon: "status_bar_icon_large",
        smallIcon: "status_bar_icon_small",
    })
*/

  }


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity onPress={onSendNotification}>
          <Text style={{height: 60, width: "100%", backgroundColor: "green", color: "white", alignItems: 'center', justifyContent: "center", textAlign: 'center', padding: 10, fontSize: 30}} >
            Send notification
          </Text>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
