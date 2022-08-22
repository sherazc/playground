import { MdDate } from "../services/common/DateService";

export interface ExpirableVersion {
    expirationDate?: MdDate;
    version?: number;
}

export interface Prayer {
    date: MdDate;
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
    fajrChange?: string | null;
    fajrChangeDate?: MdDate | null;
    dhuhrChange?: string | null;
    dhuhrChangeDate?: MdDate | null;
    asrChange?: string | null;
    asrChangeDate?: MdDate | null;
    maghribChange?: string | null;
    maghribChangeDate?: MdDate | null;
    ishaChange?: string | null;
    ishaChangeDate?: MdDate | null;
}

export interface Month {
    number: number;
    name: string;
}

export interface PrayersMonth {
    month: Month;
    prayers: Prayer[];
}

export interface PrayersYear {
    year: number;
    prayersMonths: PrayersMonth[]
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

export interface CompanyNotification {
    companyId: string;
    expirationMillis: number;
}

export interface ScheduleNotification {
    date: Date;
    title: string;
    message: string;
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
    tracker: Tracker;
}

// Redux/Async store
export interface CompanyData {
    company?: Company;
    prayer?: Prayer;
    configurations: Configuration[];
    prayersYear?: PrayersYear;
    companyNotification?: CompanyNotification;
    tracker: Tracker;
}

export interface Tracker {
    expirableVersion?: ExpirableVersion;
    updateInterval?: NodeJS.Timeout;
    previousMonth?: number;
    previousDate?: number;
}


export const createEmptyCompanyData = (): CompanyData => {
    return {
        company: undefined,
        prayer: undefined,
        configurations: [],
        tracker: {},
        prayersYear: undefined
    };
}


export const createEmptyCompanyListData = (): CompanyListData => {
    return {
        companies: [],
        tracker: {}
    };
}

// Redux/Async store
export interface SettingData {
    azanAlert: boolean;
    iqamaAlert: boolean;
    beforeIqamaAlert: boolean;
}

export const createDefaultSettingData = (): SettingData => {
    return {
        azanAlert: false,
        iqamaAlert: false,
        beforeIqamaAlert: false
    }
}

// API Response
export interface CompanyDataVersion {
    id: string;
    companyId: string;
    version: number;
}

// API Response
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
    timeBetweenMaghribLimitAndIsha: boolean;
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
