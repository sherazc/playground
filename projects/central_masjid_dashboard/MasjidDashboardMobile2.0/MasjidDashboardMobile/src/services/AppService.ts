import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store/rootReducer';
import {
    STORAGE_COMPANY_LIST_DATA,
    STORAGE_COMPANY_DATA,
    STORAGE_SETTING_DATA
} from '../storage/Storage';

import {
    RecoverInitCompleteAction,
    RecoverInitFailedAction
} from '../store/LoadingReducer';

import { CompanyData, CompanyListData, SettingData } from '../types/types';
import { isCompanyListDataVersionSame, updateCompanyListData } from './CompanyListDataService';
import { Constants } from './Constants';
import { isValidCompany, updateCompanyData2 } from './CompanyDataService';

import { fixObjectDates } from './DateService';

export const recoverAppFromStorage = () => {
    console.log("Recovering App from storage");

    const promises = [
        AsyncStorage.getItem(STORAGE_COMPANY_LIST_DATA),
        AsyncStorage.getItem(STORAGE_COMPANY_DATA),
        AsyncStorage.getItem(STORAGE_SETTING_DATA)
    ];

    Promise.all(promises)
        .then(processStorage)
        .catch(processStorageFailed);
}

const processStorage = (data: (string | null)[]) => {
    console.log("Processing recovered storage data", data);

    if (data[0]) {
        const companyListData = JSON.parse(data[0])
        fixObjectDates(companyListData);
        store.dispatch({
            type: "COMPANY_LIST_SET",
            payload: companyListData as CompanyListData
        });
    }

    if (data[1]) {
        const companyData = JSON.parse(data[1])
        fixObjectDates(companyData);
        store.dispatch({
            type: "COMPANY_DATA_SET",
            payload: companyData as CompanyData
        });
    }

    if (data[2]) {
        const settingData = JSON.parse(data[2]) as SettingData;
        store.dispatch({
            type: "SETTING_SET",
            payload: settingData
        });
    }
    store.dispatch(RecoverInitCompleteAction)
}

const processStorageFailed = () => {
    AsyncStorage.multiRemove([STORAGE_COMPANY_LIST_DATA, STORAGE_COMPANY_DATA, STORAGE_SETTING_DATA]);
    store.dispatch(RecoverInitFailedAction)
}


export const destroyedCompanyListDataInterval = () => {
    console.log("Destroying CompanyListDataInterval");
    /* 
    if (updateCompanyListDataInterval) {
        clearInterval(updateCompanyListDataInterval);
    }
 */

/* 
    if (updateCompanyDataInterval) {
        clearInterval(updateCompanyDataInterval);
    }
     */
}

// Interval to update API prayer, configurations and version
/* 
export const beginCompanyDataInterval = (companyData: CompanyData, month: string, day: string) => {
    if (!companyData || !isValidCompany(companyData.company)) return;

    if (!isCompanyDataCompanySame(previousCompanyData, companyData)
        || !isCompanyDataVersionSame(previousCompanyData, companyData)
        || !isEqualStrings(previousCompanyDataPrayerMonth, month)
        || !isEqualStrings(previousCompanyDataPrayerDay, day)
        || isExpired(companyData.expirableVersion)) {

        destroyCompanyDataInterval()

        updateCompanyData(companyData, month, day);


        updateCompanyDataInterval = setInterval(() => {
            updateCompanyData(companyData, todaysMonth().toString(), todaysDay().toString());

        }, Constants.UPDATE_INTERVAL_MILLIS);

        previousCompanyData = companyData;
        previousCompanyDataPrayerMonth = month;
        previousCompanyDataPrayerDay = day;
    }
}

 */

// Interval to update API prayer, configurations and version
export const beginCompanyDataInterval2 = (companyData: CompanyData) => {
    console.log("beginCompanyDataInterval");
    if (!companyData || !isValidCompany(companyData.company)) return;

    const tracker = companyData.tracker;

    if (tracker.updateInterval) {
        clearInterval(tracker.updateInterval);
    }

    updateCompanyData2(companyData);
    tracker.updateInterval = setInterval(() => {
        updateCompanyData2(companyData);

    }, Constants.UPDATE_INTERVAL_MILLIS);
}



// Interval to update companyList and Version
export const beginCompanyListDataInterval2 = (companyListData: CompanyListData) => {
    console.log("beginCompanyListDataInterval");
    const tracker = companyListData.tracker;

    if (tracker.updateInterval) {
        clearInterval(tracker.updateInterval);
    }
    
    updateCompanyListData2(companyListData);
    
    tracker.updateInterval = setInterval(() => {
        updateCompanyListData2(companyListData);
    }, Constants.UPDATE_INTERVAL_MILLIS);
}



// let updateCompanyListDataInterval: NodeJS.Timeout;
// let previousCompanyListData: CompanyListData;

/* // Interval to update companyList and Version
export const beginCompanyListDataInterval = (companyListData: CompanyListData) => {
    if (isCompanyListDataVersionSame(previousCompanyListData, companyListData)) {
        return;
    }

    console.log("Restarting updateCompanyListDataInterval");
    updateCompanyListData(companyListData);
    if (updateCompanyListDataInterval) {
        clearInterval(updateCompanyListDataInterval);
    }
    updateCompanyListDataInterval = setInterval(() => {
        updateCompanyListData(companyListData);
    }, Constants.UPDATE_INTERVAL_MILLIS);
    previousCompanyListData = companyListData;

}
 */