import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Linking, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { ConstantsStyles } from '../services/Constants';
import { AppBar } from "./AppBar";

// TODO: Fix inline styles
interface Props {
    navigation: StackNavigationProp<MdParamList, "RegisterInfo">;
    route: RouteProp<MdParamList, "RegisterInfo">;
}

const REGISTER_LINK = "https://www.masjiddashboard.com/auth/company/create"

export const RegisterInfo: React.FC<Props> = ({ navigation, route }) => {

    const getBackScreenName = (route: RouteProp<MdParamList, "RegisterInfo">) => {
        let result = "";
        if (route && route.params && route.params.backScreenName) {
            result = route.params.backScreenName;
        }
        return result;
    }

    const onRegister = () => {
        Linking.canOpenURL(REGISTER_LINK)
            .then(() => {
                Linking.openURL(REGISTER_LINK);
            });
    }

    return (
        <>
            <SafeAreaView style={styles.safeAreaViewTop} />
            <SafeAreaView style={styles.safeAreaViewBottom}>
                <View style={styles.container}>
                    <AppBar navigation={navigation} backScreenName={getBackScreenName(route)} screenName="Members" />
                    <View style={{padding: 15}}>
                        <Text style={styles.paragraph}>
                            Masjid Dashboard shows all masjids that are registered at masjiddashboard.com
                        </Text>
                        <Text style={styles.paragraph}>
                            Please visit masjiddashboard.com, to make your masjid part of Masjid Dashboard
                        </Text>
                        <View style={{alignItems: "center", justifyContent: "center", marginTop: 30}}>
                            <TouchableOpacity
                                onPress={onRegister}
                                style={{
                                    flexDirection: "row",alignItems: "center", justifyContent: "center",
                                    backgroundColor: ConstantsStyles.color.background2,
                                    borderRadius: 5,
                                    width: 320, padding: 15,
                                    }}>

                                <Text style={{fontSize: 15, color: ConstantsStyles.text.colorLight}}>
                                    Become a member
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    paragraph: {
        fontSize: 18,
        color: ConstantsStyles.text.colorLight,
        marginBottom: 20
    }
});
