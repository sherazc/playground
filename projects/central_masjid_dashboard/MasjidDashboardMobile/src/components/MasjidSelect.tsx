import React, { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "./NavRoutes";
import { Picker } from "@react-native-community/picker";
import { useTypedDispatch, useTypedSelector } from '../store/rootReducer';
import { LoadingStatus } from "../types/types";

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const MasjidSelect: React.FC<Props> = ({navigation}) => {
    const [selectedMasjid, setSelectedMasjid] = useState<React.ReactText>("mh");

    const dispatch = useTypedDispatch();

    return (
        <SafeAreaView>
            <Text style={{ textAlign: "center", fontSize: 30, marginBottom: '10%' }}>Masjid Dashboard</Text>
            <Picker
                selectedValue={selectedMasjid}
                style={{ height: 150 }}
                itemStyle={{ height: 150 }}
                onValueChange={(itemValue: React.ReactText, itemIndex: number) => setSelectedMasjid(itemValue)}>
                <Picker.Item label="Masjid Hamzah" value="mh" />
                <Picker.Item label="Darul Arqam Institute" value="darularqam" />
            </Picker>
            <Button title="Set Masjid" onPress={() => { navigation.navigate("PrayerTime") }} />
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
