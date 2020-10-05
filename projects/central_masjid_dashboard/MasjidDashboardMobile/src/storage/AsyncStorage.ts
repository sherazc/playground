import AsyncStorage from '@react-native-community/async-storage';

export const COMPANY_LIST_DATA = 'COMPANY_LIST_DATA';
export const COMPANY_DATA = 'COMPANY_DATA';
export const SETTING_DATA = 'SETTING_DATA';

export const saveAsyncStorage = async <T>(key: string, data: T) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.error('Failed to save the data to the storage', e)
    }
}


export const readAsyncStorage1 = async <T>(key: string): Promise<T | undefined> => {
    try {
        const stringData = await AsyncStorage.getItem(key)

        if (stringData) {
            return JSON.parse(stringData) as T;
        }
    } catch (e) {
        console.error('Failed to fetch the data from storage', e)
    }
}


export const readAsyncStorage2 =  (key: string) => {
    /*
    let c = ''
    try {
        c = AsyncStorage.getItem(key) ;
    } catch (e) {
        console.error('Failed to fetch the data from storage', e)
    }
*/
    return AsyncStorage.getItem(key)
}
