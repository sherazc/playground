import {removeStorage, saveStorage, STORAGE_COMPANY_DATA} from '../storage/Storage';
import { CompanyData, createEmptyCompanyData } from "mdb-core-js";

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
const INITIAL_STATE = createEmptyCompanyData();

// Reducer
export default function companyDataReducer(
    state = INITIAL_STATE, action: CompanyDataActionTypes) {

    switch (action.type) {
        case "COMPANY_DATA_SET":
            console.log("Updating CompanyData in store and storage.", action.payload);
            saveStorage(STORAGE_COMPANY_DATA, action.payload);
            return {...state, ...action.payload};
        case "COMPANY_DATA_DELETE":
            console.log("Removing CompanyData from store and storage.");
            removeStorage(STORAGE_COMPANY_DATA);
            return { ...state, ...INITIAL_STATE, company: undefined };
        default:
            return state;
    }
}
