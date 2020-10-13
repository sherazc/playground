import React, { useEffect } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from "../store/rootReducer";
import { CompanyData } from "../types/types";
import { Loading } from "./Loading";
import { PrayerTimeGrid } from './PrayerTimeGrid';
import { beginPrayerTimeInterval, destroyCompanyDataInterval } from '../services/AppService';
import { todaysDay, todaysMonth } from '../services/DateService';

interface Props {
    navigation: StackNavigationProp<MdParamList, "PrayerTime">;
    route: RouteProp<MdParamList, "PrayerTime">;
}

export const PrayerTime: React.FC<Props> = ({ navigation, route }) => {
    const companyData = useTypedSelector(state => state.companyData);
    const dispatch = useTypedDispatch();

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

    // Navigate to MasjidSelect because there is no selected company
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (!companyData.company || !companyData.company.id) {
                navigation.navigate("MasjidSelect");
            }
        });
        return unsubscribe;
    }, [navigation, companyData]);


    useEffect(() => {
        beginPrayerTimeInterval(companyData, todaysMonth().toString(), todaysDay().toString());
        return destroyCompanyDataInterval;
    }, [companyData]);

    return (
        <SafeAreaView>
            <Text style={{ textAlign: "center", fontSize: 30, marginBottom: '10%' }}>{companyData.company ? companyData.company.name : "No Company Selected"}</Text>
            <Button title="Settings" onPress={() => { navigation.navigate("Settings") }} />
            {loadPrayerTimeGrid(companyData)}
        </SafeAreaView>
    );
}

const loadPrayerTimeGrid = (companyData: CompanyData) => {
    if (!companyData || !companyData.prayer || !companyData.prayer.date) return <Loading />
    return <PrayerTimeGrid prayer={companyData.prayer} />
}

const isSameCompanySelected = (companyData: CompanyData, routeParams: RouteProp<MdParamList, "PrayerTime">) => {
    return companyData && companyData.company && companyData.company.id
        && routeParams.params && routeParams.params.selectedCompany
        && companyData.company.id !== routeParams.params.selectedCompany.id;
}