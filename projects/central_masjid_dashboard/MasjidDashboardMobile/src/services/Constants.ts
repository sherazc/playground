export const BASE_URL = "https://www.masjiddashboard.com";
export const END_POINT_COMPANIES_ACTIVE = `${BASE_URL}/api/auth/companies/active`;
export const END_POINT_COMPANY_LIST_VERSION = `${BASE_URL}/api/version/company/list`;
export const createCompanyDataEndpoint = (companyId: string) => `${BASE_URL}/api/version/company/${companyId}/data`;
export const EXPIRATION_MILLIS = 15 * 60 * 1000; // 15 mins
export const UPDATE_INTERVAL_MILLIS = 60 * 1000;