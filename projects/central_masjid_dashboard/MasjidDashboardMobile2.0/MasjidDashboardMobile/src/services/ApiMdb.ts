import { CompanyDataVersion, Configuration, Prayer, PrayersMonth, ServiceResponse } from "../types/types";
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

export const apiPrayer = (companyId: string, month: number, day: number): Promise<ServiceResponse<Prayer>> => {
    const endpoint = Constants.createPrayerEndpoint(companyId, month, day);
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

export const apiConfiguration = (companyId: string): Promise<Configuration[]> => {
    const endpoint = Constants.createConfigurationEndpoint(companyId);
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}
