import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ArrowLeft from '../images/ArrowLeft';
import { ConstantsStyles } from '../services/Constants';
import { MdParamList } from './NavRoutes';

interface Props {
    backScreenName: string;
    screenName: string;
    navigation: (StackNavigationProp<MdParamList, "Settings"> | StackNavigationProp<MdParamList, "RegisterInfo">);
}

export const AppBar: React.FC<Props> = ({ backScreenName, screenName, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftView}>
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.goBack()}>
                    <View style={{height: 20, justifyContent: "center", alignItems: "center", marginTop: 1}}>
                        <ArrowLeft fill={ConstantsStyles.text.colorLight} width={20} height={20} />
                    </View>
                    <View style={{height: 20, justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.backScreenName}>{backScreenName}</Text>
                    </View>
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
    },
    rightView: {
        flexBasis: 100,
    },
    centerView: {
        flex: 1,
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
