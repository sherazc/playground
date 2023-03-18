import {
    Company,
    CompanyDataVersion,
    CompanyListVersion,
    CustomConfiguration,
    PrayersDay,
    PrayersMonth,
    ServiceResponse
} from "mdb-core-js";
import { Constants } from "./Constants";

export const apiYearCalendar = (companyId: string, year: number): Promise<ServiceResponse<PrayersMonth[]>> => {
    const endpoint = Constants.createYearCalendarEndpoint(companyId, year);
    console.log("Calling year API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

export const apiCompanyDataVersion = (companyId: string): Promise<CompanyDataVersion> => {
    const endpoint = Constants.createCompanyDataVersionEndpoint(companyId)
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

export const apiPrayer = (companyId: string, month: number, day: number): Promise<ServiceResponse<PrayersDay>> => {
    const endpoint = Constants.createPrayerEndpoint(companyId, month, day);
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

export const apiConfiguration = (companyId: string): Promise<CustomConfiguration[]> => {
    const endpoint = Constants.createConfigurationEndpoint(companyId);
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}


export const apiCompanyListVersion = (): Promise<CompanyListVersion> => {
    console.log("Calling API ", Constants.END_POINT_COMPANY_LIST_VERSION);
    return fetch(Constants.END_POINT_COMPANY_LIST_VERSION).then(response => response.json());
}

export const apiCompaniesActive = (): Promise<Company[]> => {
    console.log("Calling API ", Constants.END_POINT_COMPANIES_ACTIVE);
    return fetch(Constants.END_POINT_COMPANIES_ACTIVE).then(response => response.json());
}
