import React from "react";
import { Button, Text, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';
import { MasjidSelect } from './MasjidSelect';

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const Settings: React.FC<Props> = ({navigation}) => {
    return (
        <View>
            <Button title="Reset Masjid" onPress={() => {navigation.navigate("MasjidSelect")}}/>
        </View>
    );
}
