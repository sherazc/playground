import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MasjidSelect } from './MasjidSelect';
import { PrayerTime } from './PrayerTime';
import { Settings } from './Settings';
import { useDispatch } from "react-redux"
import { RootState, useTypedSelector } from "../store/rootReducer";

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
    const companyListData = useTypedSelector((state: RootState) => state.companyListData);


    const dispatch = useDispatch();

    useEffect(() => {
        // Redux already valid and not expired companyListData

        /*
        if (isValidCompanyListData(companyListData) && !isExpired(companyListData.expirableVersion)) {
            console.log("Redux already valid and non expired companyListData");
            return;
        }

        readAsyncStorage(COMPANY_LIST_DATA).then((companyListDataInStorage) => {
            console.log("Checking Async Storage for companyListData.");
            // TODO: find out how to this better.
            const companyListDataInStorageTyped = companyListDataInStorage as CompanyListData;
            if (isValidCompanyListData(companyListDataInStorageTyped) && !isExpired(companyListDataInStorageTyped.expirableVersion)) {
                dispatch({
                    type: COMPANY_LIST_SET,
                    payload: companyListDataInStorageTyped
                });
            } else {
                fetch(END_POINT_COMPANY_LIST_VERSION)
                    .then(response => response.json())
                    .then((data) => {
                        const remoteCompanyListVersion = data as CompanyListVersion;
                        let storageCompanyListVersionNumber = getCompanyListVersionNumber(companyListDataInStorageTyped)

                        if (remoteCompanyListVersion
                            && remoteCompanyListVersion.version
                            && remoteCompanyListVersion.version === storageCompanyListVersionNumber) {
                            // refresh expiration date in storage and redux
                        } else {
                            // get new companyListData
                            // Set its expiration
                            // Set it in storage and redux
                        }

                    });


                // check internet version
                // if internet
                // get it from internet

                // put it in redux store,
                // put it in async store
            }
        });

        */

        // TODO load data from async storage
        // on complete load it in redux
        /*
                fetch('https://www.masjiddashboard.com/api/auth/companies/active')
                    .then(response => response.json())
                    .then(data => console.log(data));
        */
    }, [])




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
