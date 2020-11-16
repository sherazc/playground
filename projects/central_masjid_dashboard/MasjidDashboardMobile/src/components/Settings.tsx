import React, { useState } from "react";
import { Button, StyleSheet, View, Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch } from "../store/rootReducer";
import { ConstantsStyles } from '../services/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppBar } from "./AppBar";
import Reset from "../images/Reset";
import { Checkbox } from './Checkbox';


interface Props {
    navigation: StackNavigationProp<MdParamList, "Settings">;
    route: RouteProp<MdParamList, "Settings">;
}

export const Settings: React.FC<Props> = ({ navigation, route }) => {
    const dispatch = useTypedDispatch();

    const [deleteItCheck, setDeleteItCheck] = useState(false);

    const onResetMasjid = () => {
        dispatch({ type: "COMPANY_DATA_DELETE" });
        navigation.navigate("CompanySelect");
    }

    const onDeleteItCheck = () => {
        setDeleteItCheck(!deleteItCheck);
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
                    <TouchableOpacity style={styles.settingRow} onPress={onDeleteItCheck}>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>
                                Azan reminder
                            </Text>
                        </View>
                        <View style={styles.iconView}>
                            <Checkbox
                                checked={deleteItCheck}
                                fill={ConstantsStyles.text.colorLight}
                                width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    {/* Iqama reminder */}
                    <TouchableOpacity style={styles.settingRow} onPress={onDeleteItCheck}>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>
                                Iqama reminder
                            </Text>
                        </View>
                        <View style={styles.iconView}>
                            <Checkbox
                                checked={deleteItCheck}
                                fill={ConstantsStyles.text.colorLight}
                                width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    {/* 10 minute iqama reminder */}
                    <TouchableOpacity style={styles.settingRow} onPress={onDeleteItCheck}>
                        <View style={styles.nameView}>
                            <Text style={styles.name}>
                                10 minute iqama reminder
                            </Text>
                        </View>
                        <View style={styles.iconView}>
                            <Checkbox
                                checked={deleteItCheck}
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
