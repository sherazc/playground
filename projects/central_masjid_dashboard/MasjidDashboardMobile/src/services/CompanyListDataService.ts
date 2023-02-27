import { CompanyListData, CompanyListVersion, createEmptyCompanyListData } from "mdb-core-js";
import { createOrRefreshExpirableVersion, isExpired } from './ExpirableVersionService';
import { storeDispatchCompanyListData } from '../store/ReduxStoreService';
import { apiCompaniesActive, apiCompanyListVersion } from './ApiMdb';


const isValidCompanyListData = (companyListData?: CompanyListData) => {
    return companyListData && companyListData.companies
        && companyListData.companies.length > 0;
}


const getCompanyListVersionNumber = (companyListData?: CompanyListData): (number | undefined) => {
    if (companyListData
        && companyListData.tracker
        && companyListData.tracker.expirableVersion
        && companyListData.tracker.expirableVersion.version) {
        return companyListData.tracker.expirableVersion.version;
    }
}


const isCompanyListVersionSame = (cld: CompanyListData, clv: CompanyListVersion) => {
    const companyListVersionNumber = getCompanyListVersionNumber(cld);
    return companyListVersionNumber
        && clv
        && clv.version
        && companyListVersionNumber === clv.version;
}


const refreshCompanyListDataExpirableVersion = (companyListData: CompanyListData) => {
    if (!companyListData) {
        return;
    }
    if (!companyListData.tracker) {
        companyListData.tracker = {};
    }
    companyListData.tracker.expirableVersion = createOrRefreshExpirableVersion(companyListData.tracker.expirableVersion);
}


const updateCompanyListDataState = (companyListData: CompanyListData) => {
    storeDispatchCompanyListData(companyListData);
}


// Creates new CompanyList by calling APIs
const refreshCompanyListData = (companyListData: CompanyListData, companyListVersion: CompanyListVersion) => {
    const freshCompanyListData: CompanyListData = {
        ...createEmptyCompanyListData(),
        tracker: {
            ...companyListData.tracker,
            expirableVersion: {
                ...createOrRefreshExpirableVersion(),
                version: companyListVersion.version
            }
        }
    };


    apiCompaniesActive().then(companies => {
        freshCompanyListData.companies = companies;
        updateCompanyListDataState(freshCompanyListData)
    }).catch(e => console.log("Error calling GET Active Company List API", e));
}


// Creates new CompanyList by calling APIs or updates expirationData if online version is the same
export const updateCompanyListData = (companyListData: CompanyListData) => {
    console.log("Attempting update CompanyListData", companyListData);
    const tracker = companyListData.tracker;
    const expired = isExpired(tracker.expirableVersion);

    if (!expired) {
        console.log("Not updating CompanyListData. CompanyListData is not expired.");
        return;
    }

    apiCompanyListVersion().then(companyListVersion => {
        const versionSame = isCompanyListVersionSame(companyListData, companyListVersion);
        const validData = isValidCompanyListData(companyListData);
        if (versionSame && validData) {
            refreshCompanyListDataExpirableVersion(companyListData)
            updateCompanyListDataState(companyListData)
        } else {
            refreshCompanyListData(companyListData, companyListVersion);
        }
    });
}

