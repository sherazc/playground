export {
    isEqualStrings,
    isNotBlankString,
    isBlankString,
    numberNaNToZero,
    numberTo2DigitsString,
    subStringToNumber,
    findConfigurationByName,
    stringToHslColor,
    nameToInitials,
    trimEllipsis,
    logPromiseReject,
    logPromiseReason
} from "./common/Utilities";


export {
    REGX_TIME_24,
    REGX_DATE_TIME,
    REGX_DATE,
    REGX_HIJRI_STRING,
    MONTH_NAMES,
    MONTH_NAMES_HIJRI,
    isoDateToJsDate,
    jsDateToIsoDate,
    getSystemTimezone,
    getSystemTimezoneDateIsoString,
    getCurrentSystemDate,
    isoDateFixToSystemTimezone,
    getTodaysDate,
    getTodaysMonth,
    stringH24MinToDate,
    MdDate,
    parseObjectsIsoDateToMdDate,
    promiseParseObjectsIsoDateToMdDate,
    dateToDisplayDateShort,
    time24To12,
    dateToTime12h,
    addYears,
    addDays,
    addMinutes,
    addMinutesTo24hTime,
    millisecondDurationToMinSecTime,
    dayOfTheYear,
    isSameMonthDate,
    isTimeBetweenAzans,
    isValidJsDate,
    dateToDisplayDateLong,
    hijriStringToDisplayDateLong,
    dateToDisplayDate
} from "./services/DateService";


export {
    ExpirableVersion,
    PrayersDay,
    Month,
    PrayersMonth,
    PrayersYear,
    Address,
    Company,
    CompanyNotification,
    ScheduleNotification,
    ServiceResponse,
    CompanyListData,
    CompanyData,
    Tracker,
    createEmptyCompanyData,
    createEmptyCompanyListData,
    SettingData,
    createDefaultSettingData,
    CompanyDataVersion,
    CompanyListVersion,
    LoadingStatus,
    Loading,
    PrayerTimeSummary,
    PrayerTime,
    CustomConfiguration,
    CentralControl,
    CentralControlCompany,
    createEmptyCentralControlCompany,
    Announcement,
    MhEvent,
    Expense,
    Fund,
    Jummah,
    Sheet,
    ReminderDetail,
    AyaDetail,
    Line,
    Hadith
} from "./types/types";



export {
    ApiHeaders,
    ApiRequest,
    InterceptorCallBacks,
    ApiMethod,
    callApiIntercept,
    callApi,
    addHeadersInRequest
} from "./api/ApiCore";


export {
    cdbApis,
    cdbEndpoints
} from "./api/ApiCdb";
