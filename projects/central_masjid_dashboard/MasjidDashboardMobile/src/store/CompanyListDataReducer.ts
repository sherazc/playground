import {  } from '../storage/Storage';
import {CompanyListData} from '../types/types';

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
    expirableVersion: {}
};

// Reducer
export default function companyListDataReducer(
    state = INITIAL_STATE, action: CompanyListActionTypes) {

    switch (action.type) {
        case "COMPANY_LIST_SET":
            return {
                ...state,
                companies: action.payload.companies,
                expirableVersion: action.payload.expirableVersion
            };
        case "COMPANY_LIST_DELETE":
            return {...state, ...INITIAL_STATE};
        default:
            return state;
    }
}
