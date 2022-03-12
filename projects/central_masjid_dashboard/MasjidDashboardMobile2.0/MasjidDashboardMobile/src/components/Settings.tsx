import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity  } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from "../store/rootReducer";
import { ConstantsStyles } from '../services/Constants';
import { AppBar } from "./AppBar";
import Reset from "../images/Reset";
import { Checkbox } from './Checkbox';
import setupNotifications, { removeAllExistingNotifications } from "../services/NotificationService";
import { createDefaultSettingData, SettingData } from '../types/types';
import { destroyCompanyDataInterval2, getCompanyId } from '../services/CompanyDataService';
interface Props {
    navigation: StackNavigationProp<MdParamList, "Settings">;
    route: RouteProp<MdParamList, "Settings">;
}

let lastSettingChangeTime: (number | undefined);
let settingInterval: (NodeJS.Timeout | undefined);

export const Settings: React.FC<Props> = ({ navigation, route }) => {

    const companyData = useTypedSelector(state => state.companyData);
    const dispatch = useTypedDispatch();
    const settingStore = useTypedSelector(state => state.setting);
    const [setting, setSetting] = useState(createDefaultSettingData());

    // onload load setting from redux
    useEffect(() => {
        setSetting(settingStore)
    }, [settingStore]);

    const onResetMasjid = () => {
        dispatch({ type: "COMPANY_DATA_DELETE" });
        navigation.navigate("CompanySelect");
        removeAllExistingNotifications();
        destroyCompanyDataInterval2(companyData);
    }

    const onCheckAzan = () => {
        const newSetting = { ...setting, azanAlert: !setting.azanAlert };
        setSetting(newSetting);
        changeAlertWithDelay(newSetting);

    }

    const onCheckIqama = () => {
        const newSetting = { ...setting, iqamaAlert: !setting.iqamaAlert };
        setSetting(newSetting);
        changeAlertWithDelay(newSetting);
    }

    const onCheckBeforeIqama = () => {
        const newSetting = { ...setting, beforeIqamaAlert: !setting.beforeIqamaAlert };
        setSetting(newSetting);
        changeAlertWithDelay(newSetting);
    }

    const getBackScreenName = (route: RouteProp<MdParamList, "Settings">) => {
        let result = "";
        if (route && route.params && route.params.backScreenName) {
            result = route.params.backScreenName;
        }
        return result;
    }


    /*
    Timmed alert setting change design
    ----------------------------------

    DELAY = 5 seconds

    On setting change
        - set lastSettingChange Time
        - call changeAlertWithDelay()

    changeAlertWithDelay()
        - ✅ if setting interval is already set then do not proceed further
        - ✅ if timed settingInterval is not set then set it
        ✅ settingInterval
            - ✅ if current time > lastSettingChange + DELAY
                - ✅ set setting in redux
                - ✅ clear settingInterval
                - ✅ make settingInterval, lastSettingChange undefined
                - ✅ execute alerts reset method

    */

    const settingDelay = 5 * 1000;
    const settingIntervalMillis = 1000;

    const changeAlertWithDelay = (newSetting: SettingData) => {
        dispatch({ type: "SETTING_SET", payload: newSetting });
        lastSettingChangeTime = new Date().getTime();

        let companyId = getCompanyId(companyData.company);

        console.log(`Setting interval ${settingInterval}`)
        if (settingInterval || !companyId) {
            console.log(`Returning Setting interval ${settingInterval}`)
            return;
        }

        settingInterval = setInterval(() => {

            const nowTime = new Date().getTime();
            if (!lastSettingChangeTime || nowTime < lastSettingChangeTime + settingDelay) {
                return;
            }

            removeAllExistingNotifications();
            if (companyId) {
                setupNotifications(companyId, true);
            }


            console.log(`Clearing interval ${settingInterval}`)
            if (settingInterval) {
                clearInterval(settingInterval);
            }

            lastSettingChangeTime = settingInterval = undefined;
        }, settingIntervalMillis);

        console.log(`Setting interval 2 ${settingInterval}`)
    }

    return (
        <>
            <SafeAreaView style={styles.safeAreaViewTop} />
            <SafeAreaView style={styles.safeAreaViewBottom}>
                <View style={styles.container}>
                    <AppBar navigation={navigation} backScreenName={getBackScreenName(route)} screenName="Settings" />
                    {/* Reset Masjid */}
                    <TouchableOpacity style={styles.settingRow} onPress={onResetMasjid}>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>
                                Reset Masjid
                            </Text>
                        </View>
                        <View style={styles.iconView}>
                            <Reset fill={ConstantsStyles.text.colorLight} width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    {/* Azan reminder */}
                    <TouchableOpacity style={styles.settingRow} onPress={onCheckAzan}>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>
                                Azan reminder
                            </Text>
                        </View>
                        <View style={styles.iconView}>
                            <Checkbox
                                onPress={onCheckAzan}
                                checked={setting.azanAlert}
                                fill={ConstantsStyles.text.colorLight}
                                width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    {/* Iqama reminder */}
                    <TouchableOpacity style={styles.settingRow} onPress={onCheckIqama}>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>
                                Iqama reminder
                            </Text>
                        </View>
                        <View style={styles.iconView}>
                            <Checkbox
                                onPress={onCheckIqama}
                                checked={setting.iqamaAlert}
                                fill={ConstantsStyles.text.colorLight}
                                width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    {/* 10 minute iqama reminder */}
                    <TouchableOpacity style={styles.settingRow} onPress={onCheckBeforeIqama}>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>
                                10 minute iqama reminder
                            </Text>
                        </View>
                        <View style={styles.iconView}>
                            <Checkbox
                                onPress={onCheckBeforeIqama}
                                checked={setting.beforeIqamaAlert}
                                fill={ConstantsStyles.text.colorLight}
                                width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                </View>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    safeAreaViewTop: {
        flex: 0,
        backgroundColor: ConstantsStyles.color.background2
    },
    safeAreaViewBottom: {
        backgroundColor: ConstantsStyles.color.background3,
        flex: 1
    },
    container: {
        backgroundColor: ConstantsStyles.color.background3,
        // height: "100%"
        flex: 1

    },
    settingRow: {
        flexDirection: "row",
        height: 75
    },
    nameView: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: "center",
        // backgroundColor: "#ffffff44"
    },
    iconView: {
        flexBasis: 100,
        // backgroundColor: "#ffffff22",
        alignItems: "center",
        justifyContent: "center"
    },
    name: {
        color: ConstantsStyles.text.colorLight,
        fontSize: 18
    },
    separator: {
        height: 3,
        width: "100%",
        backgroundColor: ConstantsStyles.color.lines
    }
});
