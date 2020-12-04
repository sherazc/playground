import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CompanySelect } from './CompanySelect/CompanySelect';
import { PrayerTime } from './PrayerTime/PrayerTime';
import { Settings } from './Settings';
import { useTypedSelector } from '../store/rootReducer'
import { Company, LoadingStatus } from '../types/types';
import { RecoveringFromStorage } from './RecoveringFromStorage';
import { recoverAppFromStorage, destroyedApp, beginApp } from '../services/AppService';

const Stack = createStackNavigator<MdParamList>();

interface Props {
}

export type MdParamList = {
    CompanySelect: undefined;
    PrayerTime: { selectedCompany?: Company };
    Settings: {backScreenName: string};
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

/*
https://reactnative.dev/docs/dimensions
TODO: set dimention and in redux store and use it to size components
    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });
*/

    if (loading.recoverInitState === LoadingStatus.LOADING
        || loading.recoverInitState === LoadingStatus.INIT) {
        return <RecoveringFromStorage />
    } else {
        beginApp(companyListData);
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="CompanySelect">
                    <Stack.Screen name="CompanySelect" component={CompanySelect} options={noHeaderOptions} />
                    <Stack.Screen name="PrayerTime" component={PrayerTime} options={noHeaderOptions} />
                    <Stack.Screen name="Settings" component={Settings} options={noHeaderOptions} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

/*

TODO
####
On api calls in catch update store that api failed. 
Update user message on loading screen
Do a retry


Application Flow
################

NavRoutes Component
===================
    - on app init recoverAppFromStorage()
    - Start application beginApp(companyListData);
    - on app destroy destroyedApp()

recoverAppFromStorage()
-----------------------
    - Use AsyncStorage to load promisses of
        - STORAGE_COMPANY_LIST_DATA
        - STORAGE_COMPANY_DATA
        - STORAGE_SETTING_DATA
    - dispatches recovered data in Store
    - dispatches recovery complete flag in Store

destroyedApp()
--------------
    - Clear intervals
        - updateCompanyListDataInterval
        - updateCompanyDataInterval

beginApp(companyListData)
-----------------------
This method runs on every rerender when companyListData is updated in the store.
Because of this it run only if arguments are different from last execution.

    - If true isCompanyListDataVersionSame(previousCompanyListData, companyListData) prevents re-run.
    - updateCompanyListData(companyListData)
    - clear interval updateCompanyListDataInterval
    - Sets updateCompanyListDataInterval interval for every Constants.UPDATE_INTERVAL_MILLIS to run updateCompanyListData(companyListData)
    - Sets global variable previousCompanyListData

updateCompanyListData(companyListData)
-------------------------------------
Creates new CompanyList by calling APIs or updates expirationData if online version is the same

    - if companyListData valid and expired
        - calls apiCompanyListVersion() API
            If isCompanyListVersionSame(companyListData, companyListVersion)
                refresh version refeashCompanyListDataExpirableVersion(companyListData)
                updateCompanyListDataState(companyListData)
            else 
                refeashCompanyListData()
    - else 
        - refeashCompanyListData()

refeashCompanyListData()
------------------------


Modern Programming language


False God Money
    - Mufti relationship elfy
        - Pupi naraz - shadi dancing
    - Quran people of hell fire. Sadaka
    - Office politics

    



*/