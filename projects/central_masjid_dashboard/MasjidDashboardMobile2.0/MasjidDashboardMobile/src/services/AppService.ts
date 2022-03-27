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

import { CompanyData, CompanyListData, SettingData, Tracker } from '../types/types';
import { updateCompanyListData } from './CompanyListDataService';
import { Constants } from './Constants';
import { isValidCompany, updateCompanyData } from './CompanyDataService';
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


// Interval to update API prayer, configurations and version
export const beginCompanyDataInterval = (companyData: CompanyData) => {
    console.log("beginCompanyDataInterval");
    if (!companyData || !isValidCompany(companyData.company)) return;

    const tracker = companyData.tracker;

    if (tracker.updateInterval) {
        clearInterval(tracker.updateInterval);
    }

    updateCompanyData(companyData);
    tracker.updateInterval = setInterval(() => {
        updateCompanyData(companyData);

    }, Constants.UPDATE_INTERVAL_MILLIS);
}


// Interval to update companyList and Version
export const beginCompanyListDataInterval = (companyListData: CompanyListData) => {
    console.log("beginCompanyListDataInterval");
    const tracker = companyListData.tracker;

    if (tracker.updateInterval) {
        clearInterval(tracker.updateInterval);
    }
    
    updateCompanyListData(companyListData);
    
    tracker.updateInterval = setInterval(() => {
        updateCompanyListData(companyListData);
    }, Constants.UPDATE_INTERVAL_MILLIS);
}


export const destroyTrackerInterval = (intervalName: string, tracker?: Tracker) => {
    if (!tracker?.updateInterval) {
        return;
    }
    console.log("Destroying ", intervalName, tracker.updateInterval);
    clearInterval(tracker.updateInterval);
}

