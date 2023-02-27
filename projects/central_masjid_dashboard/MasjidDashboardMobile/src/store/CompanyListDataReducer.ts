import { removeStorage, saveStorage, STORAGE_COMPANY_LIST_DATA } from '../storage/Storage';
import {CompanyListData} from "mdb-core-js";

// Types
export const COMPANY_LIST_SET = "COMPANY_LIST_SET";
export const COMPANY_LIST_DELETE = "COMPANY_LIST_DELETE";

export type CompanyListSet = {
    type: typeof COMPANY_LIST_SET;
    payload: CompanyListData;
}

export type CompanyListDelete = {
    type: typeof COMPANY_LIST_DELETE;
}

export type CompanyListActionTypes = CompanyListSet | CompanyListDelete;

// Initial State
const INITIAL_STATE: CompanyListData = {
    companies: [],
    tracker: {}
};

// Reducer
export default function companyListDataReducer(
    state = INITIAL_STATE, action: CompanyListActionTypes) {

    switch (action.type) {
        case "COMPANY_LIST_SET":
            console.log("Updating CompanyListData in store and storage.", action.payload);
            saveStorage(STORAGE_COMPANY_LIST_DATA, action.payload);
            return {...state, ...action.payload};
        case "COMPANY_LIST_DELETE":
            console.log("Removing CompanyListData from store and storage.");
            removeStorage(STORAGE_COMPANY_LIST_DATA);
            return {...state, ...INITIAL_STATE};
        default:
            return state;
    }
}
