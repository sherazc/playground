export const isEqualStrings = (s1?:string, s2?: string) => s1 && s2 && s1 === s2;

export const numberTo2DigitsString = (number: number) => {
    return number < 10 && number > -1 ? `0${number}` : number;
};