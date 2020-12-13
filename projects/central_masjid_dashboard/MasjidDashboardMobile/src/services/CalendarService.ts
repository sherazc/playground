import { CompanyData, PrayersMonth, PrayersYear } from '../types/types';
import { Constants } from './Constants';
import store, { useTypedDispatch } from '../store/rootReducer';
import { isValidCompanyData } from './CompanyDataService';

const apiYearCalendar = (companyId: string, year: number): Promise<PrayersMonth[]> => {
    const endpoint = Constants.createYearCalendarEndpoint(companyId, year);
    console.log("Calling year API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

export const loadCompanyPrayerYear = (companyId: string, year: number): Promise<PrayersYear> => {

    return new Promise((resolve, reject) => {
        const companyDataInStore = store.getState().companyData;
        const prayersYearInStore = companyDataInStore.prayersYear;

        if (isValidCompanyData(companyDataInStore)
            && isValidPrayerYear(prayersYearInStore)
            && companyDataInStore.company?.id === companyId
            && prayersYearInStore?.year === year) {

            resolve(prayersYearInStore);

        } else {
            apiYearCalendar(companyId, year)
                .then(
                    (prayersMonths) => resolveNewPrayerYear(resolve, companyDataInStore, year, prayersMonths),
                    (error) => rejectNewPrayerYear(reject, error))
                .catch((error) => rejectNewPrayerYear(reject, error))
        }
    });
}

const resolveNewPrayerYear = (resolve: Function, companyData: CompanyData, year: number, prayersMonths: PrayersMonth[]) => {
    companyData.prayersYear = {year, prayersMonths};
    store.dispatch({
        type: "COMPANY_DATA_SET",
        payload: companyData
    });
    resolve(companyData.prayersYear);
}

const rejectNewPrayerYear = (reject: Function, error: any) => {
    console.log("Can not load company. Failed to call apiYearCalendar().", error);
    reject(error);
}

const isValidPrayerYear = (prayersYear?: PrayersYear): boolean => {
    return prayersYear != undefined
        && prayersYear.year != undefined
        && prayersYear.prayersMonths != undefined
        && prayersYear.prayersMonths.length > 11;
}
