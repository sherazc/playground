import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
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
        <SafeAreaView>
            <Text style={{ textAlign: "center", fontSize: 30, marginBottom: '10%' }}>{companyData.company ? companyData.company.name : "No Company Selected"}</Text>
            <Button title="Settings" onPress={() => { navigation.navigate("Settings") }} />
            {loadPrayerTime(companyData, prayerTimeMessage)}
        </SafeAreaView>
    );
}

const loadPrayerTime = (companyData: CompanyData, prayerTimeMessage: PrayerTimeSummaryMessage) => {
    if (!companyData || !companyData.prayer || !companyData.prayer.date) return <Loading />
    return (
        <View>
            <TodaysDetail prayerTimeMessage={prayerTimeMessage} companyData={companyData} />
            <PrayerTimeGrid prayerTimeMessage={prayerTimeMessage} prayer={companyData.prayer} />
        </View>
    );
}

const isSameCompanySelected = (companyData: CompanyData, routeParams: RouteProp<MdParamList, "PrayerTime">) => {
    return companyData && companyData.company && companyData.company.id
        && routeParams.params && routeParams.params.selectedCompany
        && companyData.company.id !== routeParams.params.selectedCompany.id;
}