import { 
    Company, 
    CompanyData, 
    CompanyDataVersion, 
    Configuration, 
    createEmptyCompanyData, 
    Prayer, 
    PrayersYear, 
    ServiceResponse 
} from "../types/types";
import { createOrRefreshExpirableVersion, isExpired } from "./ExpirableVersionService";
import store from '../store/rootReducer';
import setupNotifications from "./NotificationService";
import { 
    isSameMonthDate, 
    getTodaysDate, 
    getTodaysMonth, 
    parseObjectsIsoDateToMdDate 
} from "./common/DateService";
import { apiCompanyDataVersion, apiConfiguration, apiPrayer } from "./ApiMdb";
import { getPrayersYear } from "./CalendarService";


export const isValidCompany = (company?: Company) => {
    return company != undefined && company.id != undefined;
}


const isCompanyVersionSame2 = (version?: number, cdv2?: CompanyDataVersion) => {
    return version !== undefined && cdv2 && version === cdv2?.version;
}

const updateCompanyDataState = (companyData: CompanyData) => {
    store.dispatch({
        type: "COMPANY_DATA_SET",
        payload: companyData
    });
}


const isValidServiceResponsePrayer = (serviceResponse: ServiceResponse<Prayer>) => {
    return serviceResponse && serviceResponse.successful
        && serviceResponse.target && serviceResponse.target.date;
}

// Creates new CompanyData by calling APIs
const refreshCompanyData = (companyData: CompanyData, companyDataVersion: CompanyDataVersion, versionSame: (boolean | undefined), month: number, date: number) => {

    // @ts-ignore
    const company: Company = companyData.company;

    const freshCompanyData: CompanyData = {
        ...createEmptyCompanyData(),
        company: companyData.company,
        tracker: {
            ...companyData.tracker,
            expirableVersion: {
                ...createOrRefreshExpirableVersion(),
                version: companyDataVersion.version
            }
        }
    };

    const promises: (Promise<ServiceResponse<Prayer>> | Promise<Configuration[]> | Promise<PrayersYear>)[] = [
        apiPrayer(company.id, month, date)];

    if (versionSame) {
        freshCompanyData.configurations = companyData.configurations;
        freshCompanyData.prayersYear = companyData.prayersYear;
    } else {
        promises.push(apiConfiguration(company.id));
        promises.push(getPrayersYear(company.id));
    }

    // @ts-ignore
    Promise.all(promises).then(apiResponses => processCompanyData(freshCompanyData, apiResponses))
        .catch(e => console.log("Error calling company data APIs", e));

}

const processCompanyData = (companyData: CompanyData, apiResponses: (ServiceResponse<Prayer> | Configuration[] | PrayersYear)[]) => {
    if (!apiResponses || apiResponses.length < 1) {
        return;
    }

    const prayerResponse = apiResponses[0] as ServiceResponse<Prayer>;

    if (isValidServiceResponsePrayer(prayerResponse)) {
        parseObjectsIsoDateToMdDate(prayerResponse.target); // TODO: check if this can be done in API call function.
        companyData.prayer = prayerResponse.target;
        if (apiResponses.length > 2) {
            companyData.configurations = apiResponses[1] as Configuration[];
            companyData.prayersYear = apiResponses[2] as PrayersYear;
        }

        updateCompanyDataState(companyData)
    }
}


export const updateCompanyData = (companyData: CompanyData) => {
    console.log("Attempting update CompanyData", companyData);
    if (!isValidCompany(companyData.company)) {
        console.log("Not updating CompanyData. CompanyData.company is not valid.");
        return;
    }

    const nowMonth = getTodaysMonth();
    const nowDate = getTodaysDate();
    const tracker = companyData.tracker;
    const sameMonthDate = isSameMonthDate(tracker.previousMonth, nowMonth, tracker.previousDate, nowDate);
    const expired = isExpired(tracker.expirableVersion);

    if (!expired && sameMonthDate) {
        console.log("Not updating CompanyData. Not expired and current date data is already loaded.");
        return;
    }


    // TODO test what would happened if tracker is update inside refresh
    tracker.previousDate = nowDate;
    tracker.previousMonth = nowMonth;

    // @ts-ignore
    apiCompanyDataVersion(companyData.company.id).then(companyDataVersion => {
        const versionSame = isCompanyVersionSame2(tracker.expirableVersion?.version, companyDataVersion);

        /*
        ✅ TODO: If version is the same then do not update yearMonthPrayers or configurations. Pass version inside refreshCompanyData

        TODO: Check why should we call setupNotifications here. It would be better if we call it once refresh is complete

        TODO: Maybe Make updateCompanyListData2() work the same.
        I think companyList do not need to be updated daily
        I think companyList needs to be updated only when companyListVersion is updated.

        */


        // if (!isCompanyVersionSame2(tracker.expirableVersion?.version, companyDataVersion) || !sameMonthDate) {
        refreshCompanyData(companyData, companyDataVersion, versionSame, nowMonth, nowDate);
        // Setup notifications
        // @ts-ignore
        setupNotifications(companyData.company.id, false);
        // }
    });

}


export const getCompanyName = (company: (Company | undefined)): string => {
    return company && company.name ? company.name : "";
}

export const getCompanyId = (company: (Company | undefined)): (string | undefined) => {
    return company && company.id ? company.id : undefined;
}

