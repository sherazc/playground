import { loadCompanyPrayerYear } from './CalendarService';
import { PrayersYear } from '../types/types';
import { nowUtcDate } from './DateService';

// TODO: find proper way to call it. Once if not expired.
// TODO: accecpt company data instead of company id
export default function setupNotifications(companyId: string) {
    const now = nowUtcDate();

    // Set delay to setup notifications. Maybe create a new setupNotificationWithDelay(); Or maybe accecpt
    // loadCompanyPrayerYear(companyId, now.getFullYear())
    //     .then(loadPrayersYearSuccessful, loadPrayersYearFailed);
}

const loadPrayersYearSuccessful = (prayersYear: PrayersYear) => {
    console.log(prayersYear);
}

const loadPrayersYearFailed = (error: any) => {
    console.log("Prayer notification will not be updated. Failed to load PrayersYear", error);
}
