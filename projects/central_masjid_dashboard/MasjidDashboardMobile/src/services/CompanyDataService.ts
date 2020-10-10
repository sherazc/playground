import { Company, CompanyData, CompanyDataVersion, Prayer } from "../types/types";
import { createOrRefreshExpirableVersion } from "./ExpirableVersionService";
import { COMPANY_DATA_SET } from '../store/CompanyDataReducer';
import store from '../store/rootReducer';
import { createCompanyDataVersionEndpoint } from '../services/Constants';
import { createPrayerEndpoint } from './Constants';

const isValidCompanyData = (companyData: CompanyData) => {
    return companyData
        && companyData.company && companyData.company.id
        && companyData.prayer && companyData.prayer.date
        && companyData.expirableVersion && companyData.expirableVersion.version;
}

const getCompanyDataVersionNumber = (companyData?: CompanyData): (number | undefined) => {
    if (companyData
        && companyData.expirableVersion
        && companyData.expirableVersion.version) {

        return companyData.expirableVersion.version;
    }
}

const isCompanyVersionSame = (cd: CompanyData, cdv: CompanyDataVersion) => {
    const companyDataVersionNumber = getCompanyDataVersionNumber(cd);
    return companyDataVersionNumber
        && cdv
        && cdv.version
        && companyDataVersionNumber === cdv.version;
}

export const isCompanyDataVersionSame = (c1?: CompanyData, c2?: CompanyData) => {
    let c1Version = getCompanyDataVersionNumber(c1);
    let c2Version = getCompanyDataVersionNumber(c2);
    return c1Version && c2Version && c1Version === c2Version;
}

const createCompanyData = (): CompanyData => {
    return {
        company: undefined,
        prayer: undefined,
        expirableVersion: createOrRefreshExpirableVersion()
    };
}

const refeashCompanyDataExpirableVersion = (companyData: CompanyData) => {
    if (!companyData) {
        return;
    }
    companyData.expirableVersion = createOrRefreshExpirableVersion(companyData.expirableVersion);
}

const updateCompanyDataState = (companyData: CompanyData) => {
    store.dispatch({
        type: "COMPANY_DATA_SET",
        payload: companyData
    });
}

const apiCompanyDataVersion = (companyId: string): Promise<CompanyDataVersion> => {
    const endpoint = createCompanyDataVersionEndpoint(companyId)
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

const apiPrayer = (companyId: string, month: string, day: string): Promise<Prayer> => {
    const endpoint = createPrayerEndpoint(companyId, month, day);
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

// Creates new CompanyData by calling APIs
const refeashCompanyData = (company: Company, month: string, day: string) => {
    const companyData = createCompanyData();
    companyData.company = company;

    apiCompanyDataVersion(company.id).then(companyDataVersion => {
        if (companyDataVersion && companyDataVersion.version != null && companyDataVersion.version != undefined) {
            if (companyData.expirableVersion) {
                companyData.expirableVersion.version = companyDataVersion.version;
            }

            apiCompaniesActive().then(companies => {
                companyData.companies = companies;
                updateCompanyDataState(companyData)
            }).catch(e => console.log("Error Getting Company", e));
        }
    }).catch(e => console.log("Error Getting Version", e));
}

// Creates new CompanyData by calling APIs or updates expirationData if online version is the same
export const updateCompanyData = (companyData: CompanyData) => {
    console.log("Attempting update CompanyData ", companyData);
    if (isValidCompanyData(companyData)) {
        if (isExpired(companyData.expirableVersion)) {
            apiCompanyDataVersion().then(companyListVersion => {
                if (isCompanyDataVersionSame(companyData, companyListVersion)) {
                    refeashCompanyDataExpirableVersion(companyData)
                    updateCompanyDataState(companyData)
                } else {
                    refeashCompanyData();
                }
            })
        }
    } else {
        refeashCompanyData();
    }
}
