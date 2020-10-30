export interface ExpirableVersion {
    expirationDate?: Date;
    version?: number;
}

export interface Prayer {
    date: Date;
    hijrahDate: string; // HijrahDate
    hijriString: string;
    fajr: string;
    fajrIqama: string;
    dhuhr: string;
    dhuhrIqama: string;
    asr: string;
    asrIqama: string;
    maghrib: string;
    maghribIqama: string;
    isha: string;
    ishaIqama: string;
    sunrise: string;
    fajrChange: string;
    fajrChangeDate: Date;
    dhuhrChange: string;
    dhuhrChangeDate: Date;
    asrChange: string;
    asrChangeDate: Date;
    maghribChange: string;
    maghribChangeDate: Date;
    ishaChange: string;
    ishaChangeDate: Date;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    longitude?: string;
    latitude?: string;
}

export interface Company {
    id: string;
    name: string;
    url: string;
    website: string;
    address: Address;
    active: boolean;
    expirationDate: Date;
}

export interface ServiceResponse<T> {
    successful: boolean;
    message: string;
    fieldErrors: object;
    target: T;
}

// Redux/Async store
export interface CompanyListData {
    companies: Array<Company>;
    expirableVersion?: ExpirableVersion;
}

// Redux/Async store
export interface CompanyData {
    company?: Company;
    prayer?: Prayer;
    configurations: Configuration[];
    expirableVersion?: ExpirableVersion;
}

export const createEmptyCompanyData = (): CompanyData => {
    return {
        company: undefined,
        prayer: undefined,
        configurations: [],
        expirableVersion: {}
    };
}

// Redux/Async store
export interface SettingData {
    azanAlert: boolean;
    iqamaAlert: boolean;
    iqamaChangeAlert: boolean;
}

export interface CompanyDataVersion {
    id: string;
    companyId: string;
    version: number;
}

export interface CompanyListVersion {
    id: string;
    version: number;
}

export enum LoadingStatus { INIT, LOADING, COMPLETE, FAILED }

export interface Loading {
    recoverInitState: LoadingStatus;
}

export interface PrayerTimeSummary {
    currentPrayerPeriod: (PrayerTime[] | undefined);
    sunriseTime: Date | undefined;
    timeBetweenShrooqAndZuhar: boolean;
    prayerInProgressMillis: number;
    prayerAboutToStartMillis: number;
    nextPrayerInMillis: number;
    currentPrayerName: string;
    currentPrayerNumber: number;
}

export interface PrayerTime {
    name: string;
    azan: Date;
    iqamah: Date;
}

export interface Configuration {
    name: string;
    value: string;
}
