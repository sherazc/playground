"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPromiseReason = exports.logPromiseReject = exports.trimEllipsis = exports.nameToInitials = exports.stringToHslColor = exports.findConfigurationByName = exports.subStringToNumber = exports.numberTo2DigitsString = exports.numberNaNToZero = exports.isBlankString = exports.isNotBlankString = exports.isEqualStrings = void 0;
/* ############## String Utilities ############## */
const isEqualStrings = (s1, s2) => s1 !== undefined && s2 !== undefined && s1 === s2;
exports.isEqualStrings = isEqualStrings;
const isNotBlankString = (s) => s !== undefined && typeof s === 'string' && s.trim().length > 0;
exports.isNotBlankString = isNotBlankString;
const isBlankString = (s) => !(0, exports.isNotBlankString)(s);
exports.isBlankString = isBlankString;
/* ############## Number Utilities ############## */
const numberNaNToZero = (num) => {
    return (num && num != null) ? num : 0;
};
exports.numberNaNToZero = numberNaNToZero;
// TODO: check if is it better to return negative numbers as '00'
const numberTo2DigitsString = (num) => {
    num = (0, exports.numberNaNToZero)(num);
    if (num && num != null) {
        return num < 10 && num > -1 ? `0${num}` : num + "";
    }
    else {
        return "00";
    }
};
exports.numberTo2DigitsString = numberTo2DigitsString;
const subStringToNumber = (stringInput, fromIndex, toIndex) => {
    let subStringResult = stringInput.substring(fromIndex, toIndex);
    let numberResult = parseInt(subStringResult);
    if (numberResult) {
        return numberResult;
    }
    else {
        return 0;
    }
};
exports.subStringToNumber = subStringToNumber;
/* ############## Business Utilities ############## */
const findConfigurationByName = (configurations, name, defaultValue) => {
    if (!configurations || configurations.length < 1 || !name) {
        if (defaultValue) {
            return defaultValue;
        }
        else {
            return "";
        }
    }
    const filteredConfigurations = configurations.filter(c => c.name === name);
    let result = "";
    if (filteredConfigurations && filteredConfigurations.length > 0 && filteredConfigurations[0].value) {
        result = filteredConfigurations[0].value;
    }
    else if (defaultValue) {
        result = defaultValue;
    }
    return result;
};
exports.findConfigurationByName = findConfigurationByName;
/* ############## Display Utilities ############## */
const stringToHslColor = (str, saturation, lightness) => {
    let hash = 10;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 4) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, ${saturation}%, ${lightness}%)`;
};
exports.stringToHslColor = stringToHslColor;
const nameToInitials = (name) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};
exports.nameToInitials = nameToInitials;
const trimEllipsis = (str, maxLength) => {
    if (!str) {
        return "";
    }
    if (str.length > maxLength) {
        return `${str.substring(0, maxLength)}...`;
    }
    else {
        return str;
    }
};
exports.trimEllipsis = trimEllipsis;
// TODO Unit test it
const logPromiseReject = (message, reason, reject) => {
    console.log("Rejecting Promise. " + message, reason);
    reject(reason);
};
exports.logPromiseReject = logPromiseReject;
// TODO: Unit test it
const logPromiseReason = (reason) => console.log("Promise error. ", reason);
exports.logPromiseReason = logPromiseReason;
