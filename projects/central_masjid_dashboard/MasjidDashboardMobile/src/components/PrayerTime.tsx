import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MdParamList } from "./NavRoutes";
import { RouteProp } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<MdParamList, "MasjidSelect">;
    route: RouteProp<MdParamList, "MasjidSelect">;
}

export const PrayerTime: React.FC<Props> = ({navigation}) => {
    return (
        <SafeAreaView>
            <Button title="Settings" onPress={() => {navigation.navigate("Settings")}}/>
            <Text>Prayer Time</Text>
        </SafeAreaView>
    );
}
