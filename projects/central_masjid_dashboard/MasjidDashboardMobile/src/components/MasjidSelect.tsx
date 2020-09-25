import React, { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "./NavRoutes";
import { Picker } from "@react-native-community/picker";

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const MasjidSelect: React.FC<Props> = ({navigation}) => {
    const [selectedMasjid, setSelectedMasjid] = useState<React.ReactText>("mh");
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
        </SafeAreaView>
    );
}
