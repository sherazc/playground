import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch } from "../store/rootReducer";
import { ConstantsStyles } from '../services/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
    navigation: StackNavigationProp<MdParamList, "CompanySelect">;
    route: RouteProp<MdParamList, "CompanySelect">;
}

export const Settings: React.FC<Props> = ({navigation}) => {
    const dispatch = useTypedDispatch();

    const onResetMasjid = () => {
        dispatch({type: "COMPANY_DATA_DELETE"});
        navigation.navigate("CompanySelect");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingRow} onPress={onResetMasjid}>
                <View style={styles.nameView}>
                    <Text style={styles.name}>
                        Reset Masjid
                    </Text>
                </View>
                <View style={styles.iconView}>
                    <Button title="Reset Masjid" onPress={onResetMasjid}/>
                </View>
            </TouchableOpacity>
            <View style={styles.separator}/>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: ConstantsStyles.color.background3,
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
