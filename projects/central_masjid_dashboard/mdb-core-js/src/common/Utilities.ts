import {CustomConfiguration} from '../types/types';

/* ############## String Utilities ############## */

export const isEqualStrings = (s1?: string, s2?: string): boolean => s1 !== undefined && s2 !== undefined && s1 === s2;
export const isNotBlankString = (s?: string): boolean => s !== undefined && typeof s === 'string' && s.trim().length > 0;
export const isBlankString = (s?: string): boolean => !isNotBlankString(s);


/* ############## Number Utilities ############## */

export const numberNaNToZero = (num?: number | null): number => {
    return (num && num != null) ? num : 0;
};

// TODO: check if is it better to return negative numbers as '00'
export const numberTo2DigitsString = (num?: number | null): string => {
    num = numberNaNToZero(num);
    if (num && num != null) {
        return num < 10 && num > -1 ? `0${num}` : num + "";
    } else {
        return "00";
    }

};

export const subStringToNumber = (stringInput: string, fromIndex: number, toIndex: number) => {
    let subStringResult = stringInput.substring(fromIndex, toIndex);
    let numberResult = parseInt(subStringResult);
    if (numberResult) {
        return numberResult;
    } else {
        return 0;
    }
};


/* ############## Business Utilities ############## */

export const findConfigurationByName = (configurations: CustomConfiguration[], name: string, defaultValue?: string) => {
    if (!configurations || configurations.length < 1 || !name) {
        if (defaultValue) {
            return defaultValue
        } else {
            return "";
        }
    
    }
    const filteredConfigurations = configurations.filter(c => c.name === name);

    let result = "";

    if (filteredConfigurations && filteredConfigurations.length > 0 && filteredConfigurations[0].value) {
        
        result = filteredConfigurations[0].value;
    } else if (defaultValue) {
        
        result = defaultValue
    }

    return result;
}


/* ############## Display Utilities ############## */

export const stringToHslColor = (str: string, saturation: number,
    lightness: number) => {

    let hash = 10;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 4) - hash);
    }

    const h = hash % 360;
    return `hsl(${h}, ${saturation}%, ${lightness}%)`;
}

export const nameToInitials = (name: string) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}

export const trimEllipsis = (str: string, maxLength: number) => {
    if (!str) {
        return "";
    }
    if (str.length > maxLength) {
        return `${str.substring(0, maxLength)}...`;
    } else {
        return str;
    }
};


// TODO Unit test it
export const logPromiseReject = (message: string, reason: any, reject: (reason?: any) => void) => {
    console.log("Rejecting Promise. " + message, reason);
    reject(reason);
}


// TODO: Unit test it
export const logPromiseReason = (reason: any) => console.log("Promise error. ", reason);

export const padLeft = (input: (number | string), length: number, padString: string = '0') => {
    if (length < 2) {
        return input;
    }
    return `${padString.repeat(length - 1)}${input}`.slice(-length);
}