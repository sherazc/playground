import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CompanySelect } from './CompanySelect/CompanySelect';
import { PrayerTime } from './PrayerTime/PrayerTime';
import { Settings } from './Settings';
import { useTypedSelector } from '../store/rootReducer'
import { Company, LoadingStatus } from "mdb-core-js";
import { recoverAppFromStorage } from '../services/AppService';
import { RegisterInfo } from './RegisterInfo';
import { RecoveringFromStorageImage } from "./RecoveringFromStorageImage";

const Stack = createStackNavigator<MdParamList>();

export type MdParamList = {
    CompanySelect: undefined;
    PrayerTime: { selectedCompany?: Company };
    Settings: { backScreenName: string };
    RegisterInfo: { backScreenName: string };
}

const noHeaderOptions = {
    header: () => null
};

export const NavRoutes: React.FC = () => {
    const loading = useTypedSelector(state => state.loading);

    useEffect(() => {
        recoverAppFromStorage();
    }, []);

    /*
    https://reactnative.dev/docs/dimensions
    TODO: set dimension and in redux store and use it to size components
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
        return <RecoveringFromStorageImage />
    } else {
        return (
            <NavigationContainer>
                
                <Stack.Navigator initialRouteName="CompanySelect">
                    <Stack.Screen name="CompanySelect" component={CompanySelect} options={noHeaderOptions} />
                    <Stack.Screen name="PrayerTime" component={PrayerTime} options={noHeaderOptions} />
                    <Stack.Screen name="Settings" component={Settings} options={noHeaderOptions} />
                    <Stack.Screen name="RegisterInfo" component={RegisterInfo} options={noHeaderOptions} />
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
    - on app destroy destroyedCompanyListDataInterval()

    - if LoadingStatus.LOADING LoadingStatus.INIT then
        - show RecoveringFromStorage component
    else
        - Start beginCompanyListDataInterval(companyListData);
        - Show CompanySelect Component


recoverAppFromStorage()
-----------------------
    - Use AsyncStorage to load promisses of
        - STORAGE_COMPANY_LIST_DATA
        - STORAGE_COMPANY_DATA
        - STORAGE_SETTING_DATA
    - dispatches recovered data in Store
    - dispatches recovery complete flag in Store RECOVER_INIT_STATE_SET = LoadingStatus.COMPLETE

destroyedCompanyListDataInterval()
--------------
    - Clear intervals
        - updateCompanyListDataInterval
        - updateCompanyDataInterval

beginCompanyListDataInterval(companyListData)
---------------------------------------------
Interval to update companyList and Version
This method runs on every rerender when companyListData is updated in the store.
Because of this it run only if arguments are different from last execution.
In other words if same arguments passed then prevent re-run

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
                refresh version refetchCompanyListDataExpirableVersion(companyListData)
                updateCompanyListDataState(companyListData)
            else
                refetchCompanyListData()
    - else
        - refeashCompanyListData()

refreshCompanyListData()
------------------------
    - apiCompanyListVersion() API
    - apiCompaniesActive() API
    - updateCompanyListDataState(companyListData)

CompanySelect Component
===================
    - On component mount, if companyData in store, navigate to PrayerTime Screen
    - On company select navigate to PrayerTime Screen. Pass selectedCompany as navigation parameter

PrayerTime
==========
    - On component mount, if selectedCompany then set company in store's companyData
    - On companyData set, if no company then navigate to CompanySelect
    - On companyData set
        - beginCompanyDataInterval() Interval to update API prayer and version
        - startPrayerTimeMessageInterval() Interval to update Azan, Salah and Jammat time messages on screen

beginCompanyDataInterval(companyData: CompanyData, month: string, day: string)
-------------------------
// Interval to update API prayer, configurations and version
Just list beginCompanyListDataInterval(companyListData) this method run on every re-render of PrayerTime
If same arguments passed then it will prevent re-run
    - If same arguments then prevent re-run
    - Clear previous interval
    - updateCompanyData(companyData, month, day)


updateCompanyData(companyData, month, day)
------------------------------------------
    - shouldUpdateCompanyData(companyData)
    - apiCompanyDataVersion()
    - if true isCompanyVersionSame() then
        - refreshCompanyDataExpirableVersion()
        - updateCompanyDataState()
    - else
        - refreshCompanyData()

refreshCompanyData()
--------------------
    - Create new companyData Object by
        - Setting company
        - ExpirableVersion
        - apiCompanyDataVersion() CompanyDataVersion
        - apiPrayer() Prayer
        - apiConfiguration() Configuration[]
    - Set companyData in store



startPrayerTimeMessageInterval()
--------------------------------
Interval to update Azan, Salah and Jammat time messages on screen

    - processPrayerTime() Builds PrayerTimeSummary
    - processPrayerTimeMessage() Builds PrayerTimeSummaryMessage
    - set PrayerTimeSummaryMessage in PrayerTime state

*/

