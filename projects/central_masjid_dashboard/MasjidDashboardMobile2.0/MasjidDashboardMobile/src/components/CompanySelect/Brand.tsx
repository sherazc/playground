import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Logo from '../../images/Logo';
import Underline from '../../images/Underline';
import { ConstantsStyles } from '../../services/Constants';
import PushNotification from 'react-native-push-notification';
import { removeAllExistingNotifications } from '../../services/NotificationService';

interface Props {
}

export const Brand: React.FC<Props> = () => {

    const showNotification = () => {
        // longRunningTask();
        console.log("Showing sample notification");

        PushNotification.localNotificationSchedule({
            channelId: "MDB_NOTIFICATION",

            message: "My Notification Message now", // (required)
            date: new Date(Date.now() + 1000), // in 60 secs
            largeIcon: "status_bar_icon_large",
            smallIcon: "status_bar_icon_small",
          });
    }

    const removeNotifications = () => {
        console.log("Removed Notifications")
        removeAllExistingNotifications();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MASJID DASHBOARD</Text>
            <Underline fill={ConstantsStyles.color.lines} width={220} />
            <View style={{ marginTop: 20 }}>
                <Logo width="100" height="100" />
            </View>
{/*
            <Button onPress={removeNotifications} title="Remove Notificaitons"/>
            <Button onPress={showNotification} title="Notification"/>
             */}
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