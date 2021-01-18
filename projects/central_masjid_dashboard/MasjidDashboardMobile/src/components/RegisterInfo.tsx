import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from "../store/rootReducer";
import { ConstantsStyles } from '../services/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppBar } from "./AppBar";
import Reset from "../images/Reset";
import { Checkbox } from './Checkbox';
import setupNotifications, { removeAllExisitngNotificaitons } from "../services/NotificationService";
import { createDefaultSettingData, SettingData } from '../types/types';
import { getCompanyId } from '../services/CompanyDataService';

interface Props {
    navigation: StackNavigationProp<MdParamList, "RegisterInfo">;
    route: RouteProp<MdParamList, "RegisterInfo">;
}

export const RegisterInfo: React.FC<Props> = ({ navigation, route }) => {

    const getBackScreenName = (route: RouteProp<MdParamList, "RegisterInfo">) => {
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
                    <AppBar navigation={navigation} backScreenName={getBackScreenName(route)} screenName="RegisterInfo" />
                    <Text>This is register info</Text>
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
