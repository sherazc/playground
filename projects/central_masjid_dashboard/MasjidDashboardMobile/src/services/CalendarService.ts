import { CompanyData, PrayersMonth, PrayersYear, ServiceResponse } from '../types/types';
import { Constants } from './Constants';
import store from '../store/rootReducer';
import { isValidCompanyData } from './CompanyDataService';

const apiYearCalendar = (companyId: string, year: number): Promise<ServiceResponse<PrayersMonth[]>> => {
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
                    (response) => {
                        if (response && response.successful && isValidPrayersMonths(response.target)) {
                            resolveNewPrayerYear(resolve, companyDataInStore, year, response.target);
                        } else {
                            rejectNewPrayerYear(reject, response);
                        }
                    },
                    (error) => rejectNewPrayerYear(reject, error))
                .catch((error) => rejectNewPrayerYear(reject, error));
        }
    });
}

const resolveNewPrayerYear = (resolve: Function, companyData: CompanyData, year: number, prayersMonths: PrayersMonth[]) => {
    companyData.prayersYear = { year, prayersMonths };
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
        && isValidPrayersMonths(prayersYear.prayersMonths);
}

const isValidPrayersMonths = (prayersMonths: PrayersMonth[]): boolean => {
    return prayersMonths != undefined && prayersMonths.length > 11;
}