import { CompanyData, CompanyListData, SettingData } from "../types/types";
import { RecoverInitCompleteAction, RecoverInitFailedAction } from "./LoadingReducer";
import store from "./rootReducer";


export const storeGetCompanyData = ():CompanyData => store.getState().companyData;
export const storeDispatchCompanyData = (companyData:CompanyData) => {
    store.dispatch({
        type: "COMPANY_DATA_SET",
        payload: companyData as CompanyData
    });
}

export const storeGetSetting = ():SettingData => store.getState().setting;
export const storeDispatchSetting = (settingData:SettingData) => {
    store.dispatch({
        type: "SETTING_SET",
        payload: settingData
    });
}

export const storeDispatchCompanyListData = (companyListData : CompanyListData) => {
    store.dispatch({
        type: "COMPANY_LIST_SET",
        payload: companyListData as CompanyListData
    });
}

export const storeDispatchRecoverInitComplete = () => {
    store.dispatch(RecoverInitCompleteAction);
}

export const storeDispatchRecoverInitFailed = () => {
    store.dispatch(RecoverInitFailedAction);
}