import { PrayersMonth, PrayersYear } from 'mdb-core-js';
import { apiYearCalendar } from './ApiMdb';
import { getCurrentSystemDate, parseObjectsIsoDateToMdDate } from "mdb-core-js";


export const getPrayersYear = (companyId: string, year?: number): Promise<PrayersYear> => {
    let calendarYear = getCurrentSystemDate().getFullYear();
    if (year != undefined) {
        calendarYear = year;
    }

    return new Promise((resolve, reject) => {
        apiYearCalendar(companyId, calendarYear)
            .then(
                (response) => {
                    if (response && response.successful && isValidPrayersMonths(response.target)) {
                        parseObjectsIsoDateToMdDate(response.target);
                        const prayersYear: PrayersYear = {
                            year: calendarYear,
                            prayersMonths: response.target
                        }
                        resolve(prayersYear);
                    } else {
                        rejectNewPrayerYear(reject, response);
                    }
                },
                (error) => rejectNewPrayerYear(reject, error))
            .catch((error) => rejectNewPrayerYear(reject, error));

    });    
}

// @Deprecated
/*
const loadCompanyPrayerYear = (companyId: string, year: number): Promise<PrayersYear> => {

    return new Promise((resolve, reject) => {
        const companyDataInStore = storeDispatchCompanyData();
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
*/
// @Deprecated
/*
const resolveNewPrayerYear = (resolve: Function, companyData: CompanyData, year: number, prayersMonths: PrayersMonth[]) => {
    companyData.prayersYear = { year, prayersMonths };
    storeDispatchCompanyData(companyData);
    resolve(companyData.prayersYear);
}
*/


const rejectNewPrayerYear = (reject: Function, error: any) => {
    console.log("Can not load company. Failed to call apiYearCalendar().", error);
    reject(error);
}

// @Deprecated
/*
const isCompanyDataContainsPrayersYear = (companyData: CompanyData): boolean => {
    return companyData != undefined
        && isValidCompany(companyData.company)
        && isValidPrayersYear(companyData.prayersYear);
}
*/

// @Deprecated
/*
const isValidPrayersYear = (prayersYear?: PrayersYear): boolean => {
    return prayersYear != undefined
        && prayersYear.year != undefined
        && isValidPrayersMonths(prayersYear.prayersMonths);
}
*/

const isValidPrayersMonths = (prayersMonths: PrayersMonth[]): boolean => {
    return prayersMonths != undefined && prayersMonths.length > 11;
}
