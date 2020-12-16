import { PrayersYear, CompanyData } from '../types/types';
import { nowUtcDate } from './DateService';
import store from '../store/rootReducer';

// TODO: find proper way to call it. Once if not expired.
// TODO: accecpt company data instead of company id
export default function setupNotifications(companyId: string) {
    const companyData = store.getState().companyData;
    
    if (!isValidCompanyDataAvailable(companyId, companyData)) {
        return 
    }
    
    const now = nowUtcDate();

    

    // Set delay to setup notifications. Maybe create a new setupNotificationWithDelay(); Or maybe accecpt
    // loadCompanyPrayerYear(companyId, now.getFullYear())
    //     .then(loadPrayersYearSuccessful, loadPrayersYearFailed);
}

// Checks same company and valid prayerYear
const isValidCompanyDataAvailable = (companyId: string, companyData: CompanyData): boolean => {
    return companyData != undefined && companyData.company != undefined 
        && companyData.company.id != undefined && companyData.company.id === companyId
        && companyData.prayersYear != undefined && companyData.prayersYear.year != undefined
        && companyData.prayersYear.prayersMonths != undefined
        && companyData.prayersYear.prayersMonths.length >  11;
}


