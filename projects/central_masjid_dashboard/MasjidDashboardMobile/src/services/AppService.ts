import AsyncStorage from '@react-native-community/async-storage';
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
import { UPDATE_INTERVAL_MILLIS } from './Constants';
import { isCompanyDataCompanySame, isCompanyDataVersionSame, isValidCompany, updateCompanyData } from './CompanyDataService';
import { isEqualStrings } from './Utilities';

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
        store.dispatch({
            type: "COMPANY_LIST_SET",
            payload: JSON.parse(data[0]) as CompanyListData
        });
    }

    if (data[1]) {
        const companyData = JSON.parse(data[1]) as CompanyData;
        store.dispatch({
            type: "COMPANY_DATA_SET",
            payload: JSON.parse(data[1]) as CompanyData
        });
    }

    if (data[2]) {
        const settingData = JSON.parse(data[2]) as SettingData;
    }
    store.dispatch(RecoverInitCompleteAction)
}

const processStorageFailed = () => {
    AsyncStorage.multiRemove([STORAGE_COMPANY_LIST_DATA, STORAGE_COMPANY_DATA, STORAGE_SETTING_DATA]);
    store.dispatch(RecoverInitFailedAction)
}

let updateCompanyListDataInterval: NodeJS.Timeout;
let previousCompanyListData: CompanyListData;

export const beginApp = (companyListData: CompanyListData) => {
    if (!isCompanyListDataVersionSame(previousCompanyListData, companyListData)) {
        console.log("Restarting updateCompanyListDataInterval");
        updateCompanyListData(companyListData);
        if (updateCompanyListDataInterval) {
            clearInterval(updateCompanyListDataInterval);
        }
        updateCompanyListDataInterval = setInterval(() => {
            updateCompanyListData(companyListData);
        }, UPDATE_INTERVAL_MILLIS);
        previousCompanyListData = companyListData;
    }
}

export const destroyedApp = () => {
    console.log("Destroying app");
    if (updateCompanyListDataInterval) {
        clearInterval(updateCompanyListDataInterval);
    }
}

let updateCompanyDataInterval: NodeJS.Timeout;
let previousCompanyData: CompanyData;
let previousCompanyDataPrayerMonth: string;
let previousCompanyDataPrayerDay: string;
export const beginPrayerTimeInterval = (companyData: CompanyData, month: string, day: string) => {
    if (!companyData || !isValidCompany(companyData.company)) return;

    if (!isCompanyDataCompanySame(previousCompanyData, companyData)
        || !isCompanyDataVersionSame(previousCompanyData, companyData)
        || !isEqualStrings(previousCompanyDataPrayerMonth, month)
        || !isEqualStrings(previousCompanyDataPrayerDay, day)) {

        console.log("Restarting updateCompanyListDataInterval");
        updateCompanyData(companyData, month, day);
        if (updateCompanyDataInterval) {
            clearInterval(updateCompanyListDataInterval);
        }
        updateCompanyDataInterval = setInterval(() => {
            updateCompanyData(companyData, month, day);
        }, UPDATE_INTERVAL_MILLIS);

        previousCompanyData = companyData;
        previousCompanyDataPrayerMonth = month;
        previousCompanyDataPrayerDay = day;
    }
}

export const destroyCompanyDataInterval = () => {
    console.log("Destroying updateCompanyDataInterval", updateCompanyDataInterval);
    if (updateCompanyDataInterval) {
        clearInterval(updateCompanyDataInterval);
    }
}