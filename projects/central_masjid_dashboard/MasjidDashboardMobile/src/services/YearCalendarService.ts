import { PrayersMonth } from '../types/types';
import { Constants } from './Constants';

const apiYearCalendar = (companyId: string, year: number): Promise<PrayersMonth[]> => {
    const endpoint = Constants.createYearCalendarEndpoint(companyId, year);
    console.log("Calling year API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

