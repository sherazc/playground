import { CompanyData, CompanyListData, SettingData } from "mdb-core-js";
import { RecoverInitCompleteAction, RecoverInitFailedAction } from "./LoadingReducer";
import store from "./rootReducer";


/**
 * 
 * Created storeDispatch**() functions. 
 *   - It is a refactoring effort.
 *   - In unit tests its easier to mock them.
 *   - It will bring all store dependency in this file.
 *   - In .tsx files it will replace this kind of code
 * 
 * const dispatch = useTypedDispatch();
 * dispatch({type: "COMPANY_DATA_SET", payload: companyData});
 * 
 *   - In .ts files it will replace this kind of code
 * 
 * store.dispatch({type: "COMPANY_DATA_SET", payload: companyData});
 * 
 */


export const storeGetCompanyData = ():CompanyData => store.getState().companyData;
export const storeDeleteCompanyData = () => {store.dispatch({type: "COMPANY_DATA_DELETE"})};
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