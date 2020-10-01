import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MasjidSelect } from './MasjidSelect';
import { PrayerTime } from './PrayerTime';
import { Settings } from './Settings';
import {useSelector, useDispatch} from "react-redux"

const Stack = createStackNavigator<MdParamList>();

interface Props {
}

export type MdParamList = {
    MasjidSelect: undefined;
    PrayerTime: undefined;
    Settings: undefined;
}

const noHeaderOptions =  {
        header: () => null
    };


export const NavRoutes: React.FC<Props> = () => {

    useEffect(() => {
        // TODO load data from async storage
        // on complete load it in redux

        fetch('https://www.masjiddashboard.com/api/auth/companies/active')
            .then(response => response.text())
            .then(data => console.log(data));
    }, [])


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MasjidSelect">
                <Stack.Screen name="MasjidSelect" component={MasjidSelect} options={noHeaderOptions}/>
                <Stack.Screen name="PrayerTime" component={PrayerTime} options={noHeaderOptions} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
