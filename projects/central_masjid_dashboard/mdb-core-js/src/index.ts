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
    TIME_24_REGX,
    DATE_TIME_REGX,
    DATE_REGX,
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
    isValidJsDate
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
