/*

TODO: 10/16/2022
###############

-----
NotificationService




####################

Save setting items in the store and strorage.
See if they are recovered properly in store from storange on app start.

Save prayer year caendar in the store and strorage.
See if prayer year caendar are recovered properly in store from storange on app start.


if the company is selected and prayer year calendar in not in store then after 5 seconds load year calendar
Set a flag in store that prayer year calendar was properly loaded


Re understand how application works and how intervals are scheduled

Document main methods



create a setupNotification method





----------------


Expectation
-----------
Set push notification logic
NotificationTypes:
1 = At Azan
2 = Before Iqama
3 = At Iqama

Year prayer API
---------------
/api/calendar/companyId/{companyId}/type/{type}/year/{year}

This API returns List of MonthPrayers

Domain
------
export interface Month {
    number: number;
    name: string;
}

export interface MonthPrayers {
    month: Month;
    prayers: Prayer[];
}

Constant.NOTIFICATION_SET_DAYS = 10;
Constant.NOTIFICATION_UPDATE_EXPIRE_SECONDS = 1000 * 60 * 50;

export interface Notification {
	date: Date;
	title: string;
	description: string;
	prayerNumber: number;
	notificationType: number;
}

export interface SettingData {
    azanAlert: boolean;
    iqamaAlert: boolean;
    iqamaChangeAlert: boolean;
    notificationUpdateDate: Date;
}



Store Changes
-------------



Main Logic
----------


On app start, or setting changed set 3 seconds timer.


Remove all notifications;

If yearPrayers in redux store {
  if (notification setting on) {
    start build notifications process
    start schedule notification process
  }
}


build notification process
--------------------------

const buildDayNotifications = (prayer: Prayer, azanFlag: boolean, azanNotificationFlag: boolean, azanNotificationFlag: boolean): Notification[] {
  const notifications: Notification[] = [];
  notifications.push(buildAzanNotifications(prayer));
  notifications.push(buildIqamaNotifications(prayer));
  notifications.push(buildBeforeIqamaNotifications(prayer));
  return notifications;
}






Scheduled push
ID range [-2147483648 to 2147483647].
Date:

Year
Month
Date
Hour
Minute
Prayer name
Before or at iqama
at Azan

201121163041
2147483647

e.g.
2020-01-01




*/

// Documenting react-native-push-notification options available.
// This is not Expo Notification.
export const pushNotificationHelp = {
    /* Android Only Properties */
    channelId: "your-channel-id", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
    ticker: "My Notification Ticker", // (optional)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    subText: "This is a subText", // (optional) default: none
    bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: "some_tag", // (optional) add tag to message
    group: "group", // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

    when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

    messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

    actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

    /* iOS only properties */
    alertAction: "view", // (optional) default: view
    category: "", // (optional) default: empty string

    /* iOS and Android properties */
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: "My Notification Title", // (optional)
    message: "My Notification Message", // (required)
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
  };