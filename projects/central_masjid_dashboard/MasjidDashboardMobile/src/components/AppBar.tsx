import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLeft from '../images/ArrowLeft';
import { ConstantsStyles } from '../services/Constants';
import { MdParamList } from './NavRoutes';

interface Props {
    backScreenName: string;
    screenName: string;
    navigation: StackNavigationProp<MdParamList, "Settings">;
}

export const AppBar: React.FC<Props> = ({ backScreenName, screenName, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.goBack()}>
                    <ArrowLeft fill={ConstantsStyles.text.colorLight} width={20} height={20} />
                    <Text style={styles.backScreenName}>{backScreenName}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.centerView}>
                <Text style={styles.screenName}>{screenName}</Text>
            </View>
            <View style={styles.rightView}>
                <Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ConstantsStyles.color.background2,
        // width: "100%",
        height: 60,
        // borderRadius: 10,
        // padding: 20,
        flexDirection: "row",
        ...ConstantsStyles.shadowSmallDark
    },
    leftView: {
        flexBasis: 100,
        alignItems: "center",
        paddingLeft: 8,
        flexDirection: "row",
        // backgroundColor: "red"
    },
    rightView: {
        flexBasis: 100,
        // backgroundColor: "blue",
    },
    centerView: {
        flex: 1,
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    backScreenName: {
        fontSize: 18,
        color: ConstantsStyles.text.colorLight,
    },
    screenName: {
        fontSize: 18,
        fontWeight: "bold",
        color: ConstantsStyles.text.colorLight
    }

});