
import { Company, CompanyListData, CompanyListVersion } from '../types/types';
import { createOrRefreshExpirableVersion, isExpired } from './ExpirableVersionService';
import store from '../store/rootReducer';
import { END_POINT_COMPANY_LIST_VERSION, END_POINT_COMPANIES_ACTIVE } from './Constants';

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

const updateCompanyListDataState = (companyListData: CompanyListData) => {
    store.dispatch({
        type: "COMPANY_LIST_SET",
        payload: companyListData
    });
}
/*
const apiCompanyListVersion = (callback: (c: CompanyListVersion) => any, errorCallback?: (error?: any) => any) => {
    fetch(END_POINT_COMPANY_LIST_VERSION)
        .then(response => response.json())
        .then(responseBody => callback(responseBody as CompanyListVersion))
        .catch(error => errorCallback && errorCallback(error));
}

const apiCompaniesActive = (callback: (companies: Company[]) => any, errorCallback?: (error?: any) => any) => {
    fetch(END_POINT_COMPANIES_ACTIVE)
        .then(response => response.json())
        .then(responseBody => callback(responseBody as Company[]))
        .catch(error => errorCallback && errorCallback(error));
}
*/

const apiCompanyListVersion = (): Promise<CompanyListVersion> => {
    console.log("Calling API ", END_POINT_COMPANY_LIST_VERSION);
    return fetch(END_POINT_COMPANY_LIST_VERSION).then(response => response.json());
}

const apiCompaniesActive = (): Promise<Company[]> => {
    console.log("Calling API ", END_POINT_COMPANIES_ACTIVE);
    return fetch(END_POINT_COMPANIES_ACTIVE).then(response => response.json());
}

const refeashCompanyListData = () => {
    const companyListData = createCompanyListData();
    apiCompanyListVersion().then(companyListVersion => {
        if (companyListVersion && companyListVersion.version != null && companyListVersion.version != undefined) {
            if (companyListData.expirableVersion) {
                companyListData.expirableVersion.version = companyListVersion.version;
            }

            apiCompaniesActive().then(companies => {
                companyListData.companies = companies;
                updateCompanyListDataState(companyListData)
            }).catch(e => {
                console.log("Error Getting Company", e)
            });
        }
    }).catch(e => {
        console.log("Error Getting Version", e)
    });
}

export const updateCompanyListData = (companyListData: CompanyListData) => {
    console.log("Updating Company List Data ", companyListData);
    if (isValidCompanyListData(companyListData)) {
        if (isExpired(companyListData.expirableVersion)) {
            apiCompanyListVersion().then(companyListVersion => {
                if (isCompanyListVersionSame(companyListData, companyListVersion)) {
                    refeashCompanyListDataExpirableVersion(companyListData)
                    updateCompanyListDataState(companyListData)
                } else {
                    refeashCompanyListData();
                }
            })
        }
    } else {
        refeashCompanyListData();
    }
}
