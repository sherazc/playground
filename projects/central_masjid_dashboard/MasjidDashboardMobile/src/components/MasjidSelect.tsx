import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MdParamList } from "./NavRoutes";
import { Picker } from "@react-native-community/picker";

interface Props {
    navigator: StackNavigationProp<MdParamList, "MasjidSelect">
    route: RouteProp<MdParamList, "MasjidSelect">
}

export const MasjidSelect: React.FC<Props> = ({ navigator }) => {
    const [selectedMasjid, setSelectedMasjid] = useState<React.ReactText>("mh");

    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 30, marginTop: 30, marginBottom: 30 }}>Masjid Dashboard</Text>
            <Picker
                selectedValue={selectedMasjid}
                style={{ height: 150 }}
                itemStyle={{ height: 150 }}
                onValueChange={(itemValue: React.ReactText, itemIndex: number) => setSelectedMasjid(itemValue)}>
                <Picker.Item label="Masjid Hamzah" value="mh" />
                <Picker.Item label="Darul Arqam Institute" value="darularqam" />
            </Picker>
            <Button title="Set Masjid" onPress={() => { console.log("Masjid Set") }} />
        </View>
    );
}
