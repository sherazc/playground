import { Configuration } from '../types/types';

export const isEqualStrings = (s1?: string, s2?: string): boolean => s1 !== undefined && s2 !== undefined && s1 === s2;
export const isNotBlankString = (s?: string): boolean => s !== undefined && typeof s === 'string' && s.trim().length > 0;
export const isBlankString = (s?: string): boolean => !isNotBlankString(s);

export const numberNaNToZero = (num?: number | null) : number => {
    return (num && num != null) ? num : 0;
};


export const numberTo2DigitsString = (num?: number | null): string => {
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

export const findConfigurationByName = (configurations: Configuration[], name: string) => {
    if (!configurations || configurations.length < 1 || !name) {
        return "";
    }
    const filteredConfigurations = configurations.filter(c => c.name === name);

    let result = "";

    if (filteredConfigurations && filteredConfigurations.length > 0 && filteredConfigurations[0].value) {
        result = filteredConfigurations[0].value;
    }

    return result;
}

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