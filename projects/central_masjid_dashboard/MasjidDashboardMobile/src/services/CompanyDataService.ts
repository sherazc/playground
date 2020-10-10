import { Company, CompanyData, CompanyDataVersion, Prayer } from "../types/types";
import { createOrRefreshExpirableVersion, isExpired } from "./ExpirableVersionService";
import { COMPANY_DATA_SET } from '../store/CompanyDataReducer';
import store from '../store/rootReducer';
import { createCompanyDataVersionEndpoint } from '../services/Constants';
import { createPrayerEndpoint } from './Constants';

const isValidCompanyData = (companyData?: CompanyData) => {
    return companyData && isValidCompany(companyData.company) && isValidPrayer(companyData.prayer);
}

const isValidCompany = (company?: Company) => {
    return company && company.id;
}

const isValidPrayer = (prayer?: Prayer) => {
    return prayer && prayer.date;
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
            // @ts-ignore companyData.expirableVersion will be created in createCompanyData() call
            companyData.expirableVersion.version = companyDataVersion.version;

            apiPrayer(company.id, month, day).then(prayer => {
                companyData.prayer = prayer;
                updateCompanyDataState(companyData)
            }).catch(e => console.log("Error calling GET Prayer API", e));
        }
    }).catch(e => console.log("Error calling GET Company Data version API", e));
}

const shouldUpdateCompanyData = (companyData?: CompanyData) => {
    return companyData
        && isValidCompany(companyData.company)
        && (isExpired(companyData.expirableVersion) || !isValidPrayer(companyData.prayer));
}

// Creates new CompanyData by calling APIs or updates expirationData if online version is the same
export const updateCompanyData = (companyData: CompanyData, month: string, day: string) => {
    console.log("Attempting update CompanyData ", companyData);
    if (shouldUpdateCompanyData(companyData)) {
        // @ts-ignore
        apiCompanyDataVersion(companyData.company.id).then(companyDataVersion => {
            if (isCompanyVersionSame(companyData, companyDataVersion)) {
                refeashCompanyDataExpirableVersion(companyData)
                updateCompanyDataState(companyData)
            } else {
                // @ts-ignore
                refeashCompanyData(companyData.company, month, day);
            }
        });

    } else {
        console.error("Can not refresh CompanyData. Maybe no Company selected")
    }
}
