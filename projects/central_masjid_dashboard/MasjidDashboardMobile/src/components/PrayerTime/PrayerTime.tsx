import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "../NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from "../../store/rootReducer";
import { CompanyData, Prayer } from "../../types/types";
import { Loading } from "../Loading";
import { PrayerTimeGrid } from './PrayerTimeGrid';
import { beginPrayerTimeInterval, destroyCompanyDataInterval } from '../../services/AppService';
import { todaysDay, todaysMonth } from '../../services/DateService';
import { TodaysDetail } from "./TodaysDetail";
import { createEmptyPrayerTimeSummaryMessage, PrayerTimeSummaryMessage } from "../../types/react-types";
import { processPrayerTime } from "../../services/PrayerTimeProcessor";
import { processPrayerTimeMessage } from "../../services-react/PrayerTimeMessageProcessor";
import { ConstantsStyles } from "../../services/Constants";

interface Props {
    navigation: StackNavigationProp<MdParamList, "PrayerTime">;
    route: RouteProp<MdParamList, "PrayerTime">;
}

export const PrayerTime: React.FC<Props> = ({ navigation, route }) => {
    const [prayerTimeMessage, setPrayerTimeMessage] = useState(createEmptyPrayerTimeSummaryMessage());
    const companyData = useTypedSelector(state => state.companyData);
    const dispatch = useTypedDispatch();
    let prayerTimeMessageInterval: NodeJS.Timeout;

    // Inits
    useEffect(() => {
        if (isSameCompanySelected(companyData, route)) return;
        if (route.params && route.params.selectedCompany) {
            companyData.company = route.params.selectedCompany;
            dispatch({
                type: "COMPANY_DATA_SET",
                payload: companyData
            });
        }
    }, []);

    // Navigate to CompanySelect because there is no selected company
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (!companyData.company || !companyData.company.id) {
                navigation.navigate("CompanySelect");
            }
        });
        return unsubscribe;
    }, [navigation, companyData]);

    // Starts CompanyData Interval and PrayerTimeMessage interval
    useEffect(() => {
        beginPrayerTimeInterval(companyData, todaysMonth().toString(), todaysDay().toString());

        const prayer = companyData.prayer;

        if (!prayer || !prayer.date) {
            return;
        }

        destroyPrayerTimeMessageInterval();

        startPrayerTimeMessageInterval(prayer, setPrayerTimeMessage);
        prayerTimeMessageInterval = setInterval(() => startPrayerTimeMessageInterval(prayer, setPrayerTimeMessage), 1000);

        return destroyPrayerTimeMessageInterval;

    }, [companyData]);


    const destroyPrayerTimeMessageInterval = () => {
        if (prayerTimeMessageInterval) {
            clearInterval(prayerTimeMessageInterval);
        }
        destroyCompanyDataInterval()
    }

    const startPrayerTimeMessageInterval = (prayer: Prayer, setPrayerTimeMessage: React.Dispatch<React.SetStateAction<PrayerTimeSummaryMessage>>) => {
        const prayerTimeSummary = processPrayerTime(prayer);
        const prayerTimeMessage = processPrayerTimeMessage(prayerTimeSummary);
        setPrayerTimeMessage(prayerTimeMessage);
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Image source={require('../../images/background3.png')} style={styles.backgroundImage} />
            </View>
            <View style={styles.content}>
                <SafeAreaView>
                    {(!companyData || !companyData.prayer || !companyData.prayer.date) &&
                        <Loading style={{ color: "white" }} />
                    }
                    {(companyData && companyData.prayer && companyData.prayer.date) && <>
                        <View style={styles.todaysDetail}>
                            <TodaysDetail
                                navigation={navigation}
                                prayerTimeMessage={prayerTimeMessage}
                                companyData={companyData} />
                        </View>
                        <View style={{
                            height: 3,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <View style={{
                                height: 3,
                                backgroundColor: ConstantsStyles.linesColor,
                                borderRadius: 3,
                                width: "70%"
                            }} />
                        </View>
                        <View style={styles.prayerTimeGrid}>
                            <PrayerTimeGrid companyData={companyData} prayerTimeMessage={prayerTimeMessage} prayer={companyData.prayer} />
                        </View>
                    </>}
                </SafeAreaView>
            </View>
        </View>
    );
}

const isSameCompanySelected = (companyData: CompanyData, routeParams: RouteProp<MdParamList, "PrayerTime">) => {
    return companyData && companyData.company && companyData.company.id
        && routeParams.params && routeParams.params.selectedCompany
        && companyData.company.id !== routeParams.params.selectedCompany.id;
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
        width: "100%",
        backgroundColor: "#183f62ef" // TODO Change this color for all prayers
    },
    todaysDetail: {
        height: "40%",
        //backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center"
    },
    prayerTimeGrid: {
        height: "60%",
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
        // backgroundColor: "purple",
        alignContent: "center",
        justifyContent: "center"
    }
});
