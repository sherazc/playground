import { 
    Company, 
    CompanyData, 
    CompanyDataVersion,
    CustomConfiguration,
    createEmptyCompanyData, 
    PrayersDay, 
    PrayersYear, 
    ServiceResponse 
} from "mdb-core-js";
import { createOrRefreshExpirableVersion, isExpired } from "./ExpirableVersionService";
import { 
    isSameMonthDate, 
    getTodaysDate, 
    getTodaysMonth, 
    parseObjectsIsoDateToMdDate 
} from "mdb-core-js";
import { apiCompanyDataVersion, apiConfiguration, apiPrayer } from "./ApiMdb";
import { getPrayersYear } from "./CalendarService";
import { storeDispatchCompanyData } from "../store/ReduxStoreService";
import {logPromiseReason, logPromiseReject} from "mdb-core-js";
import {setupNotificationOnCompanyDataChangedHandler} from "./notification/NotificationService";


export const isValidCompany = (company?: Company) => {
    return company != undefined && company.id != undefined;
}


const isCompanyVersionSame = (version?: number, cdv2?: CompanyDataVersion) => {
    return version !== undefined && cdv2 && version === cdv2?.version;
}


const isValidServiceResponsePrayer = (serviceResponse: ServiceResponse<PrayersDay>) => {
    return serviceResponse && serviceResponse.successful
        && serviceResponse.target && serviceResponse.target.date;
}

//
/**
 * Creates new CompanyData by calling APIs
 *
 * TODO: Make this function return a promise. Resolve and reject promise in
 *
 * @param companyData
 * @param companyDataVersion
 * @param versionSame
 * @param month
 * @param date
 */
const refreshCompanyData = (companyData: CompanyData, companyDataVersion: CompanyDataVersion, versionSame: (boolean | undefined), month: number, date: number): Promise<any> => {

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

    return new Promise<CompanyData>((resolve, reject) => {
        const promises: (Promise<ServiceResponse<PrayersDay>> | Promise<CustomConfiguration[]> | Promise<PrayersYear>)[] = [
            apiPrayer(company.id, month, date)];

        if (!versionSame
            || !companyData.configurations || companyData.configurations.length < 1
            || !companyData.prayersYear || !companyData.prayersYear.prayersMonths || companyData.prayersYear.prayersMonths.length != 12) {

            promises.push(apiConfiguration(company.id));
            promises.push(getPrayersYear(company.id));
        } else {
            freshCompanyData.configurations = companyData.configurations;
            freshCompanyData.prayersYear = companyData.prayersYear;
        }

        // @ts-ignore
        Promise.all(promises).then(apiResponses => {
            processCompanyData(freshCompanyData, apiResponses);
            resolve(freshCompanyData);
        }).catch(e => logPromiseReject("Error calling company data APIs", e, reject));
    });
}


const processCompanyData = (companyData: CompanyData, apiResponses: (ServiceResponse<PrayersDay> | CustomConfiguration[] | PrayersYear)[]) => {
    if (!apiResponses || apiResponses.length < 1) {
        return;
    }

    const prayerResponse = apiResponses[0] as ServiceResponse<PrayersDay>;

    if (isValidServiceResponsePrayer(prayerResponse)) {
        parseObjectsIsoDateToMdDate(prayerResponse.target); // TODO: check if this can be done in API call function.
        companyData.prayer = prayerResponse.target;
        if (apiResponses.length > 2) {
            companyData.configurations = apiResponses[1] as CustomConfiguration[];
            companyData.prayersYear = apiResponses[2] as PrayersYear;
        }

        storeDispatchCompanyData(companyData);
    }
}


export const updateCompanyData = (companyData: CompanyData) => {
    console.log("Attempting to update CompanyData", companyData);
    if (!isValidCompany(companyData.company)) {
        console.log("Not updating CompanyData. CompanyData.company is not valid.");
        return;
    }

    const nowMonth = getTodaysMonth();
    const nowDate = getTodaysDate();
    const tracker = companyData.tracker;
    const sameMonthDate = isSameMonthDate(tracker.previousMonth, tracker.previousDate, nowMonth, nowDate);
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
        const versionSame = isCompanyVersionSame(tracker.expirableVersion?.version, companyDataVersion);
        /*
        ✅ TODO: If version is the same then do not update yearMonthPrayers or configurations. Pass version inside refreshCompanyData

        ✅ TODO: Check why should we call setupNotifications here. It would be better if we call it once refresh is complete

        TODO: Maybe Make updateCompanyListData2() work the same.
        I think companyList do not need to be updated daily
        I think companyList needs to be updated only when companyListVersion is updated.
        */
        refreshCompanyData(companyData, companyDataVersion, versionSame, nowMonth, nowDate)
            .then(freshCompanyData => setupNotificationOnCompanyDataChangedHandler(freshCompanyData), logPromiseReason)
            .catch(logPromiseReason);
    });
}
