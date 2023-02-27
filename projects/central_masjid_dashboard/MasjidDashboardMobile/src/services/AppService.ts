import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    STORAGE_COMPANY_LIST_DATA,
    STORAGE_COMPANY_DATA,
    STORAGE_SETTING_DATA
} from '../storage/Storage';

import { CompanyData, CompanyListData, SettingData, Tracker } from "mdb-core-js";
import { updateCompanyListData } from './CompanyListDataService';
import { Constants } from './Constants';
import { isValidCompany, updateCompanyData } from './CompanyDataService';
import { parseObjectsIsoDateToMdDate } from "mdb-core-js";
import { storeDispatchCompanyData, storeDispatchCompanyListData, storeDispatchRecoverInitComplete, storeDispatchRecoverInitFailed, storeDispatchSetting } from '../store/ReduxStoreService';


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
        // TODO use reviver like this JSON.parse(exampleSerialize, MdDate.mdDateJsonReviver)
        const companyListData = JSON.parse(data[0])
        parseObjectsIsoDateToMdDate(companyListData);
        storeDispatchCompanyListData(companyListData);
    }

    if (data[1]) {
        // TODO use reviver like this JSON.parse(exampleSerialize, MdDate.mdDateJsonReviver)
        const companyData = JSON.parse(data[1])
        parseObjectsIsoDateToMdDate(companyData);
        storeDispatchCompanyData(companyData);
    }

    if (data[2]) {
        // TODO use reviver like this JSON.parse(exampleSerialize, MdDate.mdDateJsonReviver)
        const settingData = JSON.parse(data[2]) as SettingData;
        storeDispatchSetting(settingData);
        
    }
    storeDispatchRecoverInitComplete();
}


const processStorageFailed = () => {
    AsyncStorage.multiRemove([STORAGE_COMPANY_LIST_DATA, STORAGE_COMPANY_DATA, STORAGE_SETTING_DATA]);
    storeDispatchRecoverInitFailed();
}


// Interval to update API prayer, configurations and version
export const beginCompanyDataInterval = (companyData: CompanyData) => {
    console.log("beginCompanyDataInterval");
    if (!companyData || !isValidCompany(companyData.company)) return;

    const tracker = companyData.tracker;

    destroyTrackerInterval("CompanyDataInterval", tracker);

    updateCompanyData(companyData);
    tracker.updateInterval = setInterval(() => {
        updateCompanyData(companyData);
    }, Constants.UPDATE_INTERVAL_MILLIS);
}

export const restartCompanyDataInterval = (companyData: CompanyData) => {
    console.log("restartCompanyDataInterval");
    const companyDataResetTracker:CompanyData = {...companyData};
    companyDataResetTracker.tracker.expirableVersion.version = -1
    companyDataResetTracker.tracker.expirableVersion.expirationDate = undefined;
    storeDispatchCompanyData(companyDataResetTracker);
    beginCompanyDataInterval(companyDataResetTracker);
}


// Interval to update companyList and Version
export const beginCompanyListDataInterval = (companyListData: CompanyListData) => {
    console.log("beginCompanyListDataInterval");
    const tracker = companyListData.tracker;

    destroyTrackerInterval("CompanyListDataInterval", tracker);
    
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

