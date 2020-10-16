import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MasjidSelect } from './MasjidSelect';
import { PrayerTime } from './PrayerTime/PrayerTime';
import { Settings } from './Settings';
import {useTypedSelector} from '../store/rootReducer'
import { Company, LoadingStatus } from '../types/types';
import { RecoveringFromStorage } from './RecoveringFromStorage';
import { recoverAppFromStorage, destroyedApp, beginApp } from '../services/AppService';

const Stack = createStackNavigator<MdParamList>();

interface Props {
}

export type MdParamList = {
    MasjidSelect: undefined;
    PrayerTime: {selectedCompany?: Company};
    Settings: undefined;
}

const noHeaderOptions = {
    header: () => null
};

export const NavRoutes: React.FC<Props> = () => {
    const loading = useTypedSelector(state => state.loading);
    const companyListData = useTypedSelector(state => state.companyListData);

    useEffect(() => {
        recoverAppFromStorage();
        return () => {
            destroyedApp();
        }
    }, []);

    if (loading.recoverInitState === LoadingStatus.LOADING
        || loading.recoverInitState === LoadingStatus.INIT) {
        return <RecoveringFromStorage/>
    } else {
        beginApp(companyListData);
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
}
