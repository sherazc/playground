import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch } from "../store/rootReducer";
import { ConstantsStyles } from '../services/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppBar } from "./AppBar";
import Reset from "../images/Reset";


interface Props {
    navigation: StackNavigationProp<MdParamList, "CompanySelect">;
    route: RouteProp<MdParamList, "CompanySelect">;
}

export const Settings: React.FC<Props> = ({ navigation }) => {
    const dispatch = useTypedDispatch();

    const onResetMasjid = () => {
        dispatch({ type: "COMPANY_DATA_DELETE" });
        navigation.navigate("CompanySelect");
    }

    return (
        <>
            <SafeAreaView style={styles.safeAreaViewTop} />
            <SafeAreaView style={styles.safeAreaViewBottom}>
                <View style={styles.container}>
                    <AppBar backScreenName="Salah" screenName="Settings" />
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
