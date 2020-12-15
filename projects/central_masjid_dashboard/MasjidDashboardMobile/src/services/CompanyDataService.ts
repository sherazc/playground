import { Company, CompanyData, CompanyDataVersion, Configuration, createEmptyCompanyData, Prayer, PrayersMonth, ServiceResponse } from "../types/types";
import { createOrRefreshExpirableVersion, isExpired } from "./ExpirableVersionService";
import store from '../store/rootReducer';
import { Constants } from './Constants';
import setupNotifications from "./NotificationService";
import { fixObjectDates } from "./DateService";
import { apiYearCalendar } from "./CalendarService";

export const isValidCompanyData = (companyData?: CompanyData) => {
    return companyData && isValidCompany(companyData.company) && isValidPrayer(companyData.prayer);
}

export const isValidCompany = (company?: Company) => {
    return company != undefined && company.id != undefined;
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

export const isCompanyDataCompanySame = (c1?: CompanyData, c2?: CompanyData) => {
    return c1 && c2 && isCompanySame(c1.company, c2.company);
}

export const isCompanySame = (c1?: Company, c2?: Company) => {
    return c1 && c2 && c1.id && c2.id && c1.id === c2.id;
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
    const endpoint = Constants.createCompanyDataVersionEndpoint(companyId)
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

const apiPrayer = (companyId: string, month: string, day: string): Promise<ServiceResponse<Prayer>> => {
    const endpoint = Constants.createPrayerEndpoint(companyId, month, day);
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

const apiConfiguration = (companyId: string): Promise<Configuration[]> => {
    const endpoint = Constants.createConfigurationEndpoint(companyId);
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

const isValidServiceResponsePrayer = (serviceResponse: ServiceResponse<Prayer>) => {
    return serviceResponse && serviceResponse.successful
        && serviceResponse.target && serviceResponse.target.date;
}

// Creates new CompanyData by calling APIs
const refeashCompanyData = (company: Company, month: string, day: string) => {
    const companyData:CompanyData = {
        ...createEmptyCompanyData(),
        expirableVersion: createOrRefreshExpirableVersion()
    };
    companyData.company = company;

    apiCompanyDataVersion(company.id).then(companyDataVersion => {
        if (companyDataVersion && companyDataVersion.version != null && companyDataVersion.version != undefined) {
            // @ts-ignore companyData.expirableVersion will be created in createCompanyData() call
            companyData.expirableVersion.version = companyDataVersion.version;

            const promises = [
                apiPrayer(company.id, month, day),
                apiConfiguration(company.id),
                apiYearCalendar(company.id)];

            // @ts-ignore
            Promise.all(promises).then(apiResponses => processCompanyData(companyData, apiResponses))
                .catch(e => console.log("Error calling company data APIs", e));
        }
    }).catch(e => console.log("Error calling GET Company Data version API", e));
}

const processCompanyData = (companyData: CompanyData, apiResponses: (ServiceResponse<Prayer> | Configuration[] | ServiceResponse<PrayersMonth[]>)[]) => {
    if (!apiResponses || apiResponses.length < 3) {
        return;
    }

    const prayerResponse = apiResponses[0] as ServiceResponse<Prayer>;
    const configurations = apiResponses[1] as Configuration[];
    const yearPrayersResponse = apiResponses[2] as ServiceResponse<PrayersMonth[]>;
    
    if (isValidServiceResponsePrayer(prayerResponse)) {
        fixObjectDates(prayerResponse.target); // TODO: check if this can be done in API call function.
        companyData.prayer = prayerResponse.target;
        companyData.configurations = configurations;
        companyData.prayersYear = yearPrayersResponse.target;
        updateCompanyDataState(companyData)
    }
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
        // @ts-ignore
        setupNotifications(companyData.company.id)

    } else {
        console.log("Not updating CompanyData. Maybe no Company selected or its still a non expired CompanyData.")
    }
}
