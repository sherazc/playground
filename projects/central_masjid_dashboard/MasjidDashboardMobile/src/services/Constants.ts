const BASE_URL = "https://www.masjiddashboard.com";
const PRAYER_DURATION_MIN = 15; // 15 Min. Duration for "Salah in progress"
const MAGHRIB_LIMIT_MIN = 40; // 40 Min. Maghrib salah will end in.

export const Constants = {
    BASE_URL,
    END_POINT_COMPANIES_ACTIVE: `${BASE_URL}/api/auth/companies/active`,
    END_POINT_COMPANY_LIST_VERSION: `${BASE_URL}/api/version/company/list`,
    createCompanyDataVersionEndpoint: (companyId: string) => `${BASE_URL}/api/version/company/${companyId}/data`,
    createPrayerEndpoint: (companyId: string, month: string, day: string) => `${BASE_URL}/api/prayer/companyId/${companyId}/month/${month}/day/${day}`,
    EXPIRATION_MILLIS: 1500 * 60 * 1000, // 15 mins
    UPDATE_INTERVAL_MILLIS: 6000 * 1000,
    PRAYER_NAME: ["Fajar", "Zuhar", "Asr", "Maghrib", "Isha", "Shurooq"],
    MAGHRIB_LIMIT_MILLIS: MAGHRIB_LIMIT_MIN * 1000 * 60,
    SALAH_DURATION_MILLIS: PRAYER_DURATION_MIN * 1000 * 60,
    PRAYER_DURATION_MIN,
    MAGHRIB_LIMIT_MIN,
}
/*
Example Version calls:

Company List
https://www.masjiddashboard.com/api/version/company/list
https://www.masjiddashboard.com/api/version/company/list/upgrade
https://www.masjiddashboard.com/api/auth/companies/active

Company Data
https://www.masjiddashboard.com/api/version/company/5f709f2e4f16bc7f7632ee42/data
https://www.masjiddashboard.com/api/version/company/5f709f2e4f16bc7f7632ee42/data/upgrade

Company Configuration

https://www.masjiddashboard.com/api/auth/companies/5f709f2e4f16bc7f7632ee42/configurations


Company Prayers
https://www.masjiddashboard.com/api/prayer/companyId/5f709f2e4f16bc7f7632ee42/month/01/day/01


Company Year Prayers
Gregorian
https://www.masjiddashboard.com/api/calendar/companyId/5f709f2e4f16bc7f7632ee42/type/gregorian/year/2020
Hijri
https://www.masjiddashboard.com/api/calendar/companyId/5f709f2e4f16bc7f7632ee42/type/hijri/year/1440
*/