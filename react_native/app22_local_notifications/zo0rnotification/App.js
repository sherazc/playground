/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button
} from 'react-native';


var PushNotification = require("react-native-push-notification");

const App = () => {

  const [notificationDetail, setNotificationDetail] = useState("");

  const onStart = (event) => {
    console.log("Start");
    setNotificationDetail(new Date().toISOString() + "\n" + "Start");

    PushNotification.cancelLocalNotifications({id: 'aaaaaaaaaaaaaaa_3'});
    PushNotification.cancelLocalNotifications({id: 'aaaaaaaaaaaaaaa_2'});
    PushNotification.cancelLocalNotifications({id: 'aaaaaaaaaaaaaaa_1'});
    PushNotification.cancelLocalNotifications({id: 'YOUR_NOTIFICATION_CHANNEL_NAME'});

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      // id: "abc",
      title: "MDB Notificaiton",
      message: "My Notification Message 15 sec", // (required)
      date: new Date(Date.now() + 15 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    });

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "My Notification Message now", // (required)
      date: new Date(Date.now()), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    });
  }

  const onScheduleMany = (event) => {
    console.log("onScheduleMany");
    setNotificationDetail(new Date().toISOString() + "\n" + "onScheduleMany");

    for (let i=0; i < 5; i++) {
      let seconds  = (5 * i);
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        // id: "aaaaaaaaaaaaaaa_" + i,
        // id: "YOUR_NOTIFICATION_CHANNEL_NAME",
        message: `My Notification Message ${seconds} sec`, // (required)
        date: new Date(Date.now() + seconds * 1000), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      });
    }
  }

  const onScheduleManyWithId = (event) => {
    console.log("onScheduleMany");
    setNotificationDetail(new Date().toISOString() + "\n" + "onScheduleMany");

    for (let i=0; i < 5; i++) {
      let seconds  = (5 * i);
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        id: i,
        message: `My Notification Message ${seconds} sec`, // (required)
        date: new Date(Date.now() + seconds * 1000), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      });
    }
  }

  const onScheduleManyWithUserInfo = (event) => {
    console.log("onScheduleMany");
    setNotificationDetail(new Date().toISOString() + "\n" + "onScheduleMany");

    for (let i=0; i < 5; i++) {
      let seconds  = (5 * i);
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        userInfo: {
          time: new Date(),
          name: "Sheraz",
          age: 40
        },
        message: `My Notification Message ${seconds} sec`, // (required)
        date: new Date(Date.now() + seconds * 1000), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      });
    }
  }

  const onGetScheduledNotifications = () => {
    console.log("Printing all notifications");
    setNotificationDetail(new Date().toISOString() + "\n" + "Printing all notifications");
    PushNotification.getScheduledLocalNotifications((notifications) => {
      if (notifications && notifications.length > 0) {
        const notificaitonDetailStrings = notifications.map(n => {
          return "\n\n notification = " + JSON.stringify(n) + "\n\n";

        }).join();
        console.log(notificaitonDetailStrings);
        setNotificationDetail(new Date().toDateString() + "\n" + notificaitonDetailStrings);
      }
    });
  }

  const onRemoveAll = () => {
    console.log("Remove All");
    setNotificationDetail(new Date().toISOString() + "\n" + "Remove All");
    PushNotification.removeAllDeliveredNotifications();

    PushNotification.getScheduledLocalNotifications((notifications) => {
      if (notifications && notifications.length > 0) {
        notifications.forEach(n => {
          PushNotification.cancelLocalNotifications({id: n.id});
        });
      }
    });
  }


  return (
    <SafeAreaView>
      <View style={styles.rootView}>
      <Text style={{fontSize: 20, textAlign: "center"}}>Notifications</Text>
      <Button title="Start" onPress={onStart} />
      <Button title="Schedule many" onPress={onScheduleMany} />
      <Button title="Schedule many with ids" onPress={onScheduleManyWithId} />
      <Button title="Schedule many with userInfo" onPress={onScheduleManyWithUserInfo} />
      <Button title="Print notifications" onPress={onGetScheduledNotifications} />
      <Button title="Remove All" onPress={onRemoveAll} />

      <ScrollView>
        <Text style={{backgroundColor: "#ddd"}}>
          {notificationDetail}
        </Text>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootView: {
  }
});

export default App;
