import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "./NavRoutes";
import { Picker } from "@react-native-community/picker";
import { useTypedSelector } from '../store/rootReducer';
import { CompanyListData } from "../types/types";

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const MasjidSelect: React.FC<Props> = ({navigation}) => {
    const companyData = useTypedSelector(state => state.companyData);
    const companyListData = useTypedSelector(state => state.companyListData);
    const [selectedCompanyId, setSelectedCompanyId] = useState<React.ReactText>("");

    // Navigate to PrayerTime because there is a selected company.
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (companyData.company && companyData.company.id) {
                navigation.navigate("PrayerTime", {});
            }
          });
          return unsubscribe;
    }, [navigation, companyData]);

    // Choose the first picker item
    if (companyListData && companyListData.companies && companyListData.companies.length > 0 && !selectedCompanyId) {
        setSelectedCompanyId(companyListData.companies[0].id);
    }

    const onSetCompany = () => {
        if (!selectedCompanyId) {
            return;
        }
        const selectedCompany = companyListData.companies.find(c => c.id === selectedCompanyId);
        if (selectedCompany) {
            navigation.navigate("PrayerTime", {selectedCompany});
        }
    }

    return (
        <SafeAreaView>
            <Text style={{ textAlign: "center", fontSize: 30, marginBottom: '10%' }}>Masjid Dashboard</Text>
            <Picker
                selectedValue={selectedCompanyId}
                style={{ height: 150 }}
                itemStyle={{ height: 150 }}
                onValueChange={(itemValue: React.ReactText, itemIndex: number) => setSelectedCompanyId(itemValue)}>
                {buildCompanyPickerItems(companyListData)}
            </Picker>
            <Button title="Set Masjid" disabled={!selectedCompanyId} onPress={onSetCompany} />
        </SafeAreaView>
    );
}

const buildCompanyPickerItems = (cld?: CompanyListData) => {
    if (!cld || !cld.companies || cld.companies.length < 1) {
        return;
    }
    const pickerItems = [<Picker.Item key={0} label="Select Masjid" value="" />]

    cld.companies.forEach(c => pickerItems.push(<Picker.Item key={c.id}
        label={`${c.name} - ${c.address.city}, ${c.address.state}`} value={c.id} />));

    return pickerItems;
}