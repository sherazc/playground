export const isEqualStrings = (s1?:string, s2?: string) => s1 && s2 && s1 === s2;
import { Configuration } from '../types/types';

export const numberTo2DigitsString = (number: number) => {
    return number < 10 && number > -1 ? `0${number}` : number;
};

export const subStringToNumber = (stringInput:string, fromIndex:number, toIndex:number) => {
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
