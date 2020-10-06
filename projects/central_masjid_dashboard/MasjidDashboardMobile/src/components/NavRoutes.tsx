import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MasjidSelect } from './MasjidSelect';
import { PrayerTime } from './PrayerTime';
import { Settings } from './Settings';

const Stack = createStackNavigator<MdParamList>();

interface Props {
}

export type MdParamList = {
    MasjidSelect: undefined;
    PrayerTime: undefined;
    Settings: undefined;
}

const noHeaderOptions = {
    header: () => null
};


export const NavRoutes: React.FC<Props> = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MasjidSelect">
                <Stack.Screen name="MasjidSelect" component={MasjidSelect} options={noHeaderOptions} />
                <Stack.Screen name="PrayerTime" component={PrayerTime} options={noHeaderOptions} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
