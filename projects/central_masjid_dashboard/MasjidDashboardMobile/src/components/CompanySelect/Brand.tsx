import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from '../../images/Logo';
import Underline from '../../images/Underline';
import {ConstantsStyles} from '../../services/Constants';

// import { testRemoveAllNotifications, testScheduleNotification } from '../../misc/TestNotification';

interface Props {
}

export const Brand: React.FC<Props> = () => {
    /*
        const [testNotificationDelaySeconds, setTestNotificationDelaySeconds] = useState<number>(0);
        const showNotification = () => {
            console.log("Showing sample notification");
            testScheduleNotification(testNotificationDelaySeconds);
        }

        const removeNotifications = () => {
            console.log("Removing Notifications...")
            testRemoveAllNotifications();
        }
    */

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MASJID DASHBOARD</Text>
            <Underline fill={ConstantsStyles.color.lines} width={220}/>
            <View style={{marginTop: 20}}>
                <Logo width="100" height="100"/>
            </View>
            {/*
            <TextInput
                keyboardType='number-pad'
                style={{ height: 40, backgroundColor: "#fff"}}
                placeholder="Test notification delay seconds"
                onChangeText={num => setTestNotificationDelaySeconds(+num)}
            />
            <Button onPress={showNotification} title="Notification" />
            <Button onPress={removeNotifications} title="Remove All Notifications" />
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
    content: {},
    title: {
        fontSize: 25,
        color: ConstantsStyles.text.colorLight,
        letterSpacing: 3,
        marginBottom: 0,
        ...ConstantsStyles.shadowSmallDarkText
    }
});
