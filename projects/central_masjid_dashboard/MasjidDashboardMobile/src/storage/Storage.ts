import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_COMPANY_LIST_DATA = 'STORAGE_COMPANY_LIST_DATA';
export const STORAGE_COMPANY_DATA = 'STORAGE_COMPANY_DATA';
export const STORAGE_SETTING_DATA = 'STORAGE_SETTING_DATA';

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
