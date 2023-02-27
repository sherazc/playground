import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { ConstantsStyles } from '../services/Constants';
import { AppBar } from "./AppBar";
import Reset from "../images/Reset";
import { Checkbox } from './Checkbox';
import { createDefaultSettingData, } from "mdb-core-js";
import {storeDeleteCompanyData, storeDispatchSetting,} from "../store/ReduxStoreService";
import { useTypedSelector } from "../store/rootReducer";
import { destroyTrackerInterval } from "../services/AppService";
import {
    removeNotificationsAsync,
    setupNotificationOnSettingChangedHandler,
} from "../services/notification/NotificationService";

interface Props {
    navigation: StackNavigationProp<MdParamList, "Settings">;
    route: RouteProp<MdParamList, "Settings">;
}

export const Settings: React.FC<Props> = ({ navigation, route }) => {

    const companyData = useTypedSelector(state => state.companyData);
    const settingStore = useTypedSelector(state => state.setting);
    const [setting, setSetting] = useState(createDefaultSettingData());

    // onload load setting from redux
    useEffect(() => {
        setSetting(settingStore)
    }, [settingStore]);

    const onResetMasjid = () => {
        storeDeleteCompanyData();

        // Keeping the existing setting flags. But removing company ID.
        const resetSettingData = {
            ...settingStore,
            companyNotification: createDefaultSettingData().companyNotification
        };
        storeDispatchSetting(resetSettingData);
        navigation.navigate("CompanySelect");
        removeNotificationsAsync().then(result =>
            console.log("On reset masjid. Removed notifications.", result));
        destroyTrackerInterval("CompanyDataInterval", companyData.tracker);
    }

    const onCheckAzan = () => {
        const newSetting = { ...setting, azanAlert: !setting.azanAlert };
        setSetting(newSetting);
        setupNotificationOnSettingChangedHandler(newSetting);
    }

    const onCheckIqama = () => {
        const newSetting = { ...setting, iqamaAlert: !setting.iqamaAlert };
        setSetting(newSetting);
        setupNotificationOnSettingChangedHandler(newSetting);
    }

    const onCheckBeforeIqama = () => {
        const newSetting = { ...setting, beforeIqamaAlert: !setting.beforeIqamaAlert };
        setSetting(newSetting);
        setupNotificationOnSettingChangedHandler(newSetting);
    }

    const getBackScreenName = (route: RouteProp<MdParamList, "Settings">) => {
        let result = "";
        if (route && route.params && route.params.backScreenName) {
            result = route.params.backScreenName;
        }
        return result;
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
    },
    iconView: {
        flexBasis: 100,
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
