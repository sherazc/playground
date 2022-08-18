import { PrayersMonth, ServiceResponse } from "../types/types";
import { Constants } from "./Constants";

export const apiYearCalendar = (companyId: string, year: number): Promise<ServiceResponse<PrayersMonth[]>> => {

    // @ts-ignore
    const endpoint = Constants.createYearCalendarEndpoint(companyId, year);
    console.log("Calling year API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}