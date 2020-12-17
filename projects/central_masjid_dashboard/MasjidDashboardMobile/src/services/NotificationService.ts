import { PrayersYear, CompanyData } from '../types/types';
import { nowUtcDate } from './DateService';
import store from '../store/rootReducer';
import { Constants } from './Constants';

// TODO: find proper way to call it. Once if not expired.
// TODO: accecpt company data instead of company id
export default function setupNotifications(companyId: string) {
    if (!isNotificationAlreadySet(companyId)) {
        console.log(`Not setting up notification. Notification already set for ${companyId}.`);
        return
    }

    // TODO: do this in an interval
    // Run the interval in a promise
    if (!isValidCompanyDataAvailable(companyId, companyData)) {
        console.log("Not setting up ")
        return
    }

    // Set delay to setup notifications. Maybe create a new setupNotificationWithDelay(); Or maybe accecpt
    // loadCompanyPrayerYear(companyId, now.getFullYear())
    //     .then(loadPrayersYearSuccessful, loadPrayersYearFailed);
}

const isNotificationAlreadySet = (companyId: string): boolean => {
    const companyData = store.getState().companyData;
    const notificationExpirationMillis = companyData.notificationExpirationMillis == undefined
        ? 0 : companyData.notificationExpirationMillis;

    const currentTimeMillis = nowUtcDate().getTime();

    return isSameCompany(companyId, companyData)
        && currentTimeMillis < notificationExpirationMillis;
}



// Checks same company and valid prayerYear
const isValidCompanyDataAvailable = (companyId: string, companyData: CompanyData): boolean => {
    return isSameCompany(companyId, companyData)
        && companyData.prayersYear != undefined && companyData.prayersYear.year != undefined
        && companyData.prayersYear.prayersMonths != undefined
        && companyData.prayersYear.prayersMonths.length > 11;
}

const isSameCompany = (companyId: string, companyData: CompanyData): boolean => {
    return companyData != undefined && companyData.company != undefined
        && companyData.company.id != undefined && companyData.company.id === companyId;
}

