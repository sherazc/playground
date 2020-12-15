import { CompanyData, PrayersMonth, PrayersYear, ServiceResponse } from '../types/types';
import { Constants } from './Constants';
import store from '../store/rootReducer';
import { isValidCompany, isValidCompanyData } from './CompanyDataService';
import { fixObjectDates, nowUtcDate } from './DateService';

const apiYearCalendar = (companyId: string, year: number): Promise<ServiceResponse<PrayersMonth[]>> => {
    
    // @ts-ignore
    const endpoint = Constants.createYearCalendarEndpoint(companyId, year);
    console.log("Calling year API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

export const apiPrayersYear = (companyId: string, year?: number): Promise<PrayersYear> => {
    let calendarYear = nowUtcDate().getFullYear();
    if (year != undefined) {
        calendarYear = year;
    }

    return new Promise((resolve, reject) => { 
        apiYearCalendar(companyId, calendarYear)
            .then(
                (response) => {
                    if (response && response.successful && isValidPrayersMonths(response.target)) {
                        fixObjectDates(response.target);
                        const prayersYear:PrayersYear = {
                            year: calendarYear,
                            prayersMonths: response.target
                        }
                        // TODO resolve prayersYear
                    } else {
                        rejectNewPrayerYear(reject, response);
                    }
                }, 
                (error) => rejectNewPrayerYear(reject, error))
                .catch((error) => rejectNewPrayerYear(reject, error));
    });
}

// @Depricated
export const loadCompanyPrayerYear = (companyId: string, year: number): Promise<PrayersYear> => {

    return new Promise((resolve, reject) => {
        const companyDataInStore = store.getState().companyData;
        const prayersYearInStore = companyDataInStore.prayersYear;

        if (isCompanyDataContainsPrayersYear(companyDataInStore)) {
            // @ts-ignore
            resolve(prayersYearInStore);

        } else {
            if (isValidCompany(companyDataInStore.company)) {
                apiYearCalendar(companyId, year)
                    .then(
                        (response) => {
                            fixObjectDates(response);
                            if (response && response.successful && isValidPrayersMonths(response.target)) {
                                resolveNewPrayerYear(resolve, companyDataInStore, year, response.target);
                            } else {
                                rejectNewPrayerYear(reject, response);
                            }
                        },
                        (error) => rejectNewPrayerYear(reject, error))
                    .catch((error) => rejectNewPrayerYear(reject, error));
            }
        }
    });
}

// @Depricated
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

const isCompanyDataContainsPrayersYear = (companyData: CompanyData): boolean => {
    return companyData != undefined
        && isValidCompany(companyData.company)
        && isValidPrayersYear(companyData.prayersYear);
}

const isValidPrayersYear = (prayersYear?: PrayersYear): boolean => {
    return prayersYear != undefined
        && prayersYear.year != undefined
        && isValidPrayersMonths(prayersYear.prayersMonths);
}

const isValidPrayersMonths = (prayersMonths: PrayersMonth[]): boolean => {
    return prayersMonths != undefined && prayersMonths.length > 11;
}