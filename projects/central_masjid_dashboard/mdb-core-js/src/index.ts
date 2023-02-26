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
