import { Company, CompanyListData, CompanyListVersion } from '../types/types';
import { createOrRefreshExpirableVersion, isExpired } from './ExpirableVersionService';
import store from '../store/rootReducer';
import { Constants } from './Constants';

const isValidCompanyListData = (companyListData?: CompanyListData) => {
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

const isCompanyListVersionSame = (cld: CompanyListData, clv: CompanyListVersion) => {
    const companyListVersionNumber = getCompanyListVersionNumber(cld);
    return companyListVersionNumber
        && clv
        && clv.version
        && companyListVersionNumber === clv.version;
}

export const isCompanyListDataVersionSame = (c1?: CompanyListData, c2?: CompanyListData) => {
    let c1Version = getCompanyListVersionNumber(c1);
    let c2Version = getCompanyListVersionNumber(c2);
    return c1Version && c2Version && c1Version === c2Version;
}

const createCompanyListData = (): CompanyListData => {
    return {
        companies: [],
        expirableVersion: createOrRefreshExpirableVersion()
    };
}

const refreshCompanyListDataExpirableVersion = (companyListData: CompanyListData) => {
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

const apiCompanyListVersion = (): Promise<CompanyListVersion> => {
    console.log("Calling API ", Constants.END_POINT_COMPANY_LIST_VERSION);
    return fetch(Constants.END_POINT_COMPANY_LIST_VERSION).then(response => response.json());
}

const apiCompaniesActive = (): Promise<Company[]> => {
    console.log("Calling API ", Constants.END_POINT_COMPANIES_ACTIVE);
    return fetch(Constants.END_POINT_COMPANIES_ACTIVE).then(response => response.json());
}

// Creates new CompanyList by calling APIs
const refreshCompanyListData = () => {
    const companyListData = createCompanyListData();
    apiCompanyListVersion().then(companyListVersion => {
        if (companyListVersion && companyListVersion.version != null && companyListVersion.version != undefined) {
            // @ts-ignore companyData.expirableVersion will be created in createCompanyListData() call
            companyListData.expirableVersion.version = companyListVersion.version;

            apiCompaniesActive().then(companies => {
                companyListData.companies = companies;
                updateCompanyListDataState(companyListData)
            }).catch(e => console.log("Error calling GET Active Company List API", e));
        }
    }).catch(e => console.log("Error calling GET Company List version API", e));
}


// Creates new CompanyList by calling APIs or updates expirationData if online version is the same
export const updateCompanyListData = (companyListData: CompanyListData) => {
    return;
    console.log("Attempting update CompanyListData ", companyListData);
    if (isValidCompanyListData(companyListData) && isExpired(companyListData.expirableVersion)) {
        apiCompanyListVersion().then(companyListVersion => {
            if (isCompanyListVersionSame(companyListData, companyListVersion)) {
                refreshCompanyListDataExpirableVersion(companyListData)
                updateCompanyListDataState(companyListData)
            } else {
                refreshCompanyListData();
            }
        });
    } else {
        refreshCompanyListData();
    }
}
