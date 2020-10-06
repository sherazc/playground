import AsyncStorage from '@react-native-community/async-storage';

export const COMPANY_LIST_DATA = 'COMPANY_LIST_DATA';
export const COMPANY_DATA = 'COMPANY_DATA';
export const SETTING_DATA = 'SETTING_DATA';

export const saveStorage = <T>(key: string, data: T) => {
    try {
        AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.error('Failed to save the data to the storage', e)
    }
}

export const readStorage = (key: string,
    callback: (o: any) => any, errorCallback?: (error?: any) => any) => {
    AsyncStorage
        .getItem(key)
        .then(d => d ? JSON.parse(d) : {})
        .then(callback)
        .catch(errorCallback ? errorCallback : e => console.log(e));
}

export const removeStorage = (key: string) => {
    AsyncStorage.removeItem(key)
}
