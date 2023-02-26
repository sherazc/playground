const BASE_URL = "https://www.masjiddashboard.com";
const PRAYER_DURATION_MIN = 10; // 15 Min. Duration for "Salah in progress"
const PRAYER_ABOUT_TO_START_MIN = 10; // 15 Min. Prayer about to start.
const MAGHRIB_LIMIT_MIN = 40; // 40 Min. Maghrib salah will end in.

export const Constants = {
    BASE_URL,
    END_POINT_COMPANIES_ACTIVE: `${BASE_URL}/api/auth/companies/active`,
    END_POINT_COMPANY_LIST_VERSION: `${BASE_URL}/api/version/company/list`,
    createCompanyDataVersionEndpoint: (companyId: string) => `${BASE_URL}/api/version/company/${companyId}/data`,
    createPrayerEndpoint: (companyId: string, month: number, day: number) => `${BASE_URL}/api/prayer/companyId/${companyId}/month/${month}/day/${day}`,
    createConfigurationEndpoint: (companyId: string) => `${BASE_URL}/api/auth/companies/${companyId}/configurations`,
    createYearCalendarEndpoint: (companyId: string, year: number) => `${BASE_URL}/api/calendar/companyId/${companyId}/type/gregorian/year/${year}`,
    EXPIRATION_MILLIS: 120 * 60 * 1000, // CompanyList, CompanyData and Notification expiration.
    UPDATE_INTERVAL_MILLIS: 120 * 60 * 1000, // How often companyList and companyData expiration will be checked
    PRAYER_NAME: ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha", "Shurooq"],
    MAGHRIB_LIMIT_MILLIS: MAGHRIB_LIMIT_MIN * 1000 * 60,
    PRAYER_DURATION_MILLIS: PRAYER_DURATION_MIN * 1000 * 60,
    PRAYER_ABOUT_TO_START_MILLIS: PRAYER_ABOUT_TO_START_MIN * 1000 * 60,
    PRAYER_DURATION_MIN,
    MAGHRIB_LIMIT_MIN,
    PRAYER_ABOUT_TO_START_MIN
}

export const ConfigurationKey = {
    JUMAH_PRAYER: "jumah_prayer",
    MAGHRIB_IQAMA: "maghrib_iqama"
}

export const ConstantsStyles = {
    text: {
        colorLight: "#fff",
        colorDark: "#000"
    },
    color: {
        lines: "#ffffff55", // separators
        background1: "#183f62ef", // company select background
        background2: "#0c274b", // Prayer grid header and borders, Settings Header
        background3: "#183c5b", // Settings
        background4: "#f0f0f0", // Company List, Prayer Grid times
        background5: "#fff", // Company List Item
    },

    shadowSmall: {
        shadowColor: '#999',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    shadowSmallDark: {
        shadowColor: '#333',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    shadowSmallText: {
        textShadowColor: 'rgba(150, 150, 150, 0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 2
    },
    shadowSmallDarkText: {
        textShadowColor: 'rgba(50, 50, 50, 0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 2
    }
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

Old prayer time
https://www.masjidhamzah.com/dashboard/salat_time.php
https://www.masjidhamzah.com/dashboard/services/jummah.php
https://www.masjidhamzah.com/dashboard/salat_time.php?callback=buildSalatTable&_=1603507306208
https://www.masjidhamzah.com/dashboard/services/jummah.php?callback=buildJummahTable&_=1603507306209

Company Year Prayers
Gregorian
https://www.masjiddashboard.com/api/calendar/companyId/5f709f2e4f16bc7f7632ee42/type/gregorian/year/2020
Hijri
https://www.masjiddashboard.com/api/calendar/companyId/5f709f2e4f16bc7f7632ee42/type/hijri/year/1440
*/
