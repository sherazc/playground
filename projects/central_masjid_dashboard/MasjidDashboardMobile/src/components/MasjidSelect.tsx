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
    const [selectedMasjid, setSelectedMasjid] = useState<React.ReactText>("");

    const dispatch = useTypedDispatch();    

    if (companyListData && companyListData.companies && companyListData.companies.length > 0 && !selectedMasjid) {
        setSelectedMasjid(companyListData.companies[0].id);
    }

    return (
        <SafeAreaView>
            <Text style={{ textAlign: "center", fontSize: 30, marginBottom: '10%' }}>Masjid Dashboard</Text>
            <Picker
                selectedValue={selectedMasjid}
                style={{ height: 150 }}
                itemStyle={{ height: 150 }}
                onValueChange={(itemValue: React.ReactText, itemIndex: number) => setSelectedMasjid(itemValue)}>
                {buildCompanyPickerItems(companyListData)}
            </Picker>
            {/* 
            TODO:
            Create ComapnyData Store
            Set selected masjid/company in redux CompanyData store
            Navigate to Prayer time screen
             */}
            <Button title="Set Masjid" onPress={() => { navigation.navigate("PrayerTime", {selectedMasjid: undefined}) }} />
            <Button title="complete" onPress={() => dispatch({
                type: "RECOVER_INIT_STATE_SET",
                payload: {
                    recoverInitState: LoadingStatus.COMPLETE
                }
            })} />

            <Button title="failed" onPress={() => dispatch({
                type: "RECOVER_INIT_STATE_SET",
                payload: {
                    recoverInitState: LoadingStatus.FAILED
                }
            })} />
            <Button title="loading" onPress={() => dispatch({
                type: "RECOVER_INIT_STATE_SET",
                payload: {
                    recoverInitState: LoadingStatus.LOADING
                }
            })} />
        </SafeAreaView>
    );
}



const buildCompanyPickerItems = (cld?: CompanyListData) => {
    if (!cld || !cld.companies || cld.companies.length < 1) {
        return;
    }

    return cld.companies.map(c => <Picker.Item key={c.id}
        label={`${c.name} - ${c.address.city}, ${c.address.state}`} value={c.id} />);
}