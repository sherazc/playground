import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "../NavRoutes";
import { useTypedSelector } from '../../store/rootReducer';

import { Brand } from './Brand';
import { CompanyList } from './CompanyList';

interface Props {
    navigation: StackNavigationProp<MdParamList, "CompanySelect">;
    route: RouteProp<MdParamList, "CompanySelect">;
}

export const CompanySelect: React.FC<Props> = ({ navigation }) => {
    const companyData = useTypedSelector(state => state.companyData);
    const companyListData = useTypedSelector(state => state.companyListData);

    // Navigate to PrayerTime because there is a selected company.
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (companyData.company && companyData.company.id) {
                navigation.navigate("PrayerTime", {});
            }
        });
        return unsubscribe;
    }, [navigation, companyData]);

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={require('../../images/background1.png')} style={styles.backgroundImage} />
            </View>
            <View style={styles.content}>
                <View style={styles.brand}>
                    <Brand />
                </View>
                <View style={styles.companyList}>
                    <CompanyList navigation={navigation} companyListData={companyListData} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    background: {
        height: "100%",
        width: "100%"
    },
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover'
    },
    content: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%"
    },
    brand: {
        height: "40%"
    },
    companyList: {
        height: "60%",
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
    }
});
