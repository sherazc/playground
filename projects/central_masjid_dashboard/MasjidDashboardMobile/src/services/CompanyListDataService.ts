
import { CompanyListData, CompanyListVersion } from '../types/types';
import { createOrRefreshExpirableVersion } from './ExpirableVersionService';
import store from '../store/rootReducer';
import { END_POINT_COMPANY_LIST_VERSION } from './Constants';

const isValidCompanyListData = (companyListData: CompanyListData) => {
    return companyListData && companyListData.companies
        && companyListData.companies.length > 0;
}

const getCompanyListVersionNumber = (companyListData?: CompanyListData): (number | undefined) => {
    if (companyListData
        && companyListData.expirableVersion
        && companyListData.expirableVersion.version) {

        return companyListData.expirableVersion.version;
    }
}

const isCompanyListVersionSame = (c1: CompanyListData, clv: CompanyListVersion) => {
    return c1 && clv
        && c1.expirableVersion
        && c1.expirableVersion.version
        && clv.version
        && c1.expirableVersion.version === clv.version;
}

const createCompanyListData = (): CompanyListData => {
    return {
        companies: [],
        expirableVersion: createOrRefreshExpirableVersion()
    };
}

const refeashCompanyListDataExpirableVersion = (companyListData: CompanyListData) => {
    if (!companyListData) {
        return;
    }
    companyListData.expirableVersion = createOrRefreshExpirableVersion(companyListData.expirableVersion);
}

const updateCompanyListDataState = (companyListData : CompanyListData) => {
    store.dispatch({
        type: "COMPANY_LIST_SET",
        payload: companyListData
    });
}


const getOnlineCompanyListVersion = (callback: (c: CompanyListVersion) => any, errorCallback?: (error?: any) => any) => {
    fetch(END_POINT_COMPANY_LIST_VERSION)
        .then(response => response.json())
        .then(responseBody => callback(responseBody as CompanyListVersion))
        .catch(error => errorCallback && errorCallback(error));
}

