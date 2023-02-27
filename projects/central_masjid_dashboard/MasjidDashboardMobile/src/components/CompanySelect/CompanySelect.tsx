import React, { useEffect } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "../NavRoutes";
import { useTypedSelector } from '../../store/rootReducer';

// import { Brand } from './Brand';
import { CompanyList } from './CompanyList';
import { ConstantsStyles } from "../../services/Constants";
import { Info } from '../../images/Info';
import { LoadingStatus } from "mdb-core-js";
import { beginCompanyListDataInterval, destroyTrackerInterval } from "../../services/AppService";
import { Brand } from "./Brand";

// TODO: Fix inline styles
interface Props {
    navigation: StackNavigationProp<MdParamList, "CompanySelect">;
    route: RouteProp<MdParamList, "CompanySelect">;
}

export const CompanySelect: React.FC<Props> = ({ navigation }) => {
    const companyData = useTypedSelector(state => state.companyData);
    const companyListData = useTypedSelector(state => state.companyListData);
    const loading = useTypedSelector(state => state.loading);

    // Navigate to PrayerTime because there is a selected company.
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (companyData.company && companyData.company.id) {
                navigation.navigate("PrayerTime", {});
            }
        });
        return unsubscribe;
    }, [navigation, companyData]);


    
    useEffect(() => {
        if (loading.recoverInitState === LoadingStatus.COMPLETE || loading.recoverInitState === LoadingStatus.FAILED) {
            beginCompanyListDataInterval(companyListData);
        }
        
        return () => {
            destroyTrackerInterval("CompanyListDataInterval", companyListData.tracker);
        }
    }, [loading])

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={require('../../images/background3.png')} style={styles.backgroundImage} />
            </View>
            <View style={styles.content}>
                <View style={styles.brand}>
                    <Brand />
                </View>
                <View style={styles.companyList}>
                    <CompanyList navigation={navigation} companyListData={companyListData} />
                </View>
                <View style={{
                    height: "8%",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("RegisterInfo", {backScreenName: "Masjid"}) }}
                        style={{
                        flexDirection: "row",alignItems: "center", justifyContent: "center",
                        backgroundColor: ConstantsStyles.color.background2,
                        borderRadius: 5,
                        width: 320, padding: 5,
                        }}>
                        <View style={{marginRight: 5}}>
                            <Info height={15} width={15} fill={ConstantsStyles.text.colorLight}></Info>
                        </View>
                        <Text style={{fontSize: 15, color: ConstantsStyles.text.colorLight}}>
                            Become part of Masjid Dashboard
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: ConstantsStyles.color.background1,
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%"
    },
    brand: {
        height: "36%"
    },
    companyList: {
        height: "56%",
        paddingBottom: 0,
        paddingLeft: 15,
        paddingRight: 15,
    }
});
