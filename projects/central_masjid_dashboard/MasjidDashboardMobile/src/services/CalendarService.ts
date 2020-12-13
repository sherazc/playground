import { PrayersMonth, PrayersYear } from '../types/types';
import { Constants } from './Constants';
import store from '../store/rootReducer';

const apiYearCalendar = (companyId: string, year: number): Promise<PrayersMonth[]> => {
    const endpoint = Constants.createYearCalendarEndpoint(companyId, year);
    console.log("Calling year API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

const loadCompanyPrayerYear = (companyId: string, year: number): Promise<PrayersYear[]> => {

    return new Promise((resolve, reject) => {
        const companyDataInStore = store.getState().companyData;
        if (companyDataInStore.prayersYear && companyDataInStore.prayersMonths.length > 11) {
            // resolve here
        } else {
            // call api and resolve in side api promise
        }
    });
}