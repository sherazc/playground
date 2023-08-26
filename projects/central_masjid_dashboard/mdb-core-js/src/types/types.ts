import {MdDate} from "../services/DateService";

export interface ExpirableVersion {
    expirationDate?: MdDate;
    version?: number;
}

export interface PrayersDay {
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
    prayers: PrayersDay[];
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
    longitude?: string | null;
    latitude?: string | null;
}

export interface Company {
    id: string;
    name: string;
    url: string;
    website: string;
    address: Address;
    active: boolean;
    expirationDate?: MdDate;
}

export interface CompanyNotification {
    companyId: string;
    expirationMilliseconds: number;
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
    prayer?: PrayersDay;
    configurations: CustomConfiguration[];
    prayersYear?: PrayersYear;
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
    companyNotification: CompanyNotification;
}

export const createDefaultSettingData = (): SettingData => {
    return {
        azanAlert: false,
        iqamaAlert: false,
        beforeIqamaAlert: false,
        companyNotification: {
            companyId: "",
            expirationMilliseconds: -1
        }
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
    iqamaInMillis: number;
    currentPrayerName: string;
    currentPrayerNumber: number;
    azanCalled: boolean;
}

export interface PrayerTime {
    name: string;
    azan: Date;
    iqamah: Date;
}


// Renamed from
export interface CustomConfiguration {
    name: string;
    value: string;
}


export interface CentralControl {
    id: string;
    companyId: string;
    announcements: Announcement[];
    customConfigurations: CustomConfiguration[];
    events: MhEvent[];
    expenses: Expense[];
    funds: Fund[];
    jummahs: Jummah[];
    expenseSheets: Sheet[];
}

export interface CentralControlCompany extends CentralControl {
    company: Array<Company>
}

export const createEmptyCentralControlCompany = (): CentralControlCompany => {
    return {
        "id": "",
        "companyId": "",
        "announcements": [],
        "customConfigurations": [],
        "events": [],
        "expenses": [],
        "funds": [],
        "jummahs": [],
        "expenseSheets": [],
        "company": []
    };
}


export interface Sheet {
    name: string;
    description: string;
    enabled: boolean;
    rows: SheetRow[];
}

export interface SheetRow {
    order: number;
    label: string;
    value: string;
}

export interface Announcement {
    detail: string
}

// Created MhEvent and not Event because there is a dom type Event
export interface MhEvent {
    date: MdDate;
    title: string;
    time: string;
    description: string;
}

export interface Expense {
    lineItem: string;
    amount: number;
    enabled: boolean;
}

export interface Fund {
    name: string;
    goal: number;
    current: number;
    pledge: number;
    endDate: MdDate;
    enabled: boolean;
}

export interface Jummah {
    date: MdDate;
    khateeb: string;
    enabled: boolean;
}


export interface ReminderDetail {
    suraNumber: number;
    suraNameArabic: string;
    suraDescription: string;
    suraNameEnglish: string;
    ayaDetail: AyaDetail;
    translationName: string;
}


export interface AyaDetail {
    sequenceNumberSeed: number;
    quranLineNumber: number;
    date: MdDate
    firstAyaSuraName: string;
    displayDate: string;
    ayas: Line[];
    translations: Line[];
}

export interface Line {
    suraNumber: number;
    ayaNumber: number;
    lineString: string;
}


export interface Hadith {
    id: string;
    text: string;
    reference: string;
}
