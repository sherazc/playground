import React, { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "./NavRoutes";
import { Picker } from "@react-native-community/picker";
import { useTypedDispatch, useTypedSelector } from '../store/rootReducer';
import { CompanyListData, LoadingStatus } from "../types/types";

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const MasjidSelect: React.FC<Props> = ({navigation}) => {
    const companyListData = useTypedSelector(state => state.companyListData);
    const [selectedCompanyId, setSelectedCompanyId] = useState<React.ReactText>("");

    const dispatch = useTypedDispatch();

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
    console.log(selectedCompanyId)
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
            {/*
            TODO:
            Create ComapnyData Store
            Set selected masjid/company in redux CompanyData store
            Navigate to Prayer time screen
             */}
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