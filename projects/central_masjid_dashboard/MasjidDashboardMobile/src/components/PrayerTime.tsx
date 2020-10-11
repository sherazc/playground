import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { useTypedSelector } from "../store/rootReducer";
import { CompanyData, Company } from "../types/types";

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const PrayerTime: React.FC<Props> = ({ navigation, route }) => {

    const companyData = useTypedSelector(state => state.companyData);
    const company = getCompany(companyData, route) as Company;
    const newCompany = isSameCompanySelected(companyData, route);

    if (!company) {
        navigation.navigate("MasjidSelect")
    }

    return (
        <SafeAreaView>
            <Text style={{ textAlign: "center", fontSize: 30, marginBottom: '10%' }}>{company.name}</Text>

            <Button title="Settings" onPress={() => { navigation.navigate("Settings") }} />
        </SafeAreaView>
    );
}


const getCompany = (companyData: CompanyData, routeParams: RouteProp<MdParamList, "MasjidSelect">) => {
    // @ts-ignore
    return routeParams.params.selectedCompany ? routeParams.params.selectedCompany : companyData.company;
}

const isSameCompanySelected = (companyData: CompanyData, routeParams: RouteProp<MdParamList, "MasjidSelect">) => {
    return companyData && companyData.company && companyData.company.id
    // @ts-ignore
    && routeParams.params && routeParams.params.selectedCompany
    // @ts-ignore
    && companyData.company.id !== routeParams.params.selectedCompany;
}