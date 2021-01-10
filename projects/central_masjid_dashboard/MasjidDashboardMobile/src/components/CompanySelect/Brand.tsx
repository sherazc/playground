import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Logo from '../../images/Logo';
import Underline from '../../images/Underline';
import { ConstantsStyles } from '../../services/Constants';
import PushNotification from 'react-native-push-notification';
import { longRunningTask } from '../../services/DeleteIt';
import { removeAllExisitngNotificaitons } from '../../services/NotificationService';

interface Props {
}

export const Brand: React.FC<Props> = () => {

    const showNotification = () => {
        // longRunningTask();
        console.log("Showing sample notification");

        PushNotification.localNotificationSchedule({
            channelId: "masjid_dashbaord_channel",
            // channelName:
            //... You can use all the options from localNotifications
            message: "My Notification Message now", // (required)
            date: new Date(Date.now() + 2000), // in 60 secs
            id: 10,
            allowWhileIdle: true
          });
    }

    const removeNotifications = () => {
        console.log("Removed Notifications")
        removeAllExisitngNotificaitons();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MASJID DASHBOARD</Text>
            <Underline fill={ConstantsStyles.color.lines} width={220} />
            <View style={{ marginTop: 20 }}>
                <Logo width="100" height="100" />
            </View>
            <Button onPress={removeNotifications} title="Remove Notificaitons"/>
            <Button onPress={showNotification} title="Notification"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        elevation: 10
    },
    content: {
    },
    title: {
        fontSize: 25,
        color: ConstantsStyles.text.colorLight,
        letterSpacing: 3,
        marginBottom: 0,
        ...ConstantsStyles.shadowSmallDarkText
    }
});
