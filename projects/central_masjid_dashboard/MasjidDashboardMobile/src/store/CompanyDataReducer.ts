import { removeStorage, saveStorage, STORAGE_COMPANY_DATA } from '../storage/Storage';
import { CompanyData } from '../types/types';

// Types
export const COMPANY_DATA_SET = "COMPANY_DATA_SET";
export const COMPANY_DATA_DELETE = "COMPANY_DATA_DELETE";

export type CompanyDataSet = {
    type: typeof COMPANY_DATA_SET;
    payload: CompanyData;
}

export type CompanyDataDelete = {
    type: typeof COMPANY_DATA_DELETE;
}

export type CompanyDataActionTypes = CompanyDataSet | CompanyDataDelete;

// Initial State
const INITIAL_STATE: CompanyData = {
    company: undefined,
    prayer: undefined,
    expirableVersion: {}
};

// Reducer
export default function companyDataReducer(
    state = INITIAL_STATE, action: CompanyDataActionTypes) {

    switch (action.type) {
        case "COMPANY_DATA_SET":
            const companyDataString = JSON.stringify(action.payload);
            console.log("Updating CompanyData in store and storage.", companyDataString);
            saveStorage(STORAGE_COMPANY_DATA, companyDataString);
            return {
                ...state,
                company: action.payload.company,
                prayer: action.payload.prayer,
                configurations: action.payload.configurations,
                expirableVersion: action.payload.expirableVersion
            };
        case "COMPANY_DATA_DELETE":
            console.log("Removing CompanyData from store and storage.");
            // removeStorage(STORAGE_COMPANY_DATA);
            return { ...state, ...INITIAL_STATE, company: undefined };
        default:
            return state;
    }
}
