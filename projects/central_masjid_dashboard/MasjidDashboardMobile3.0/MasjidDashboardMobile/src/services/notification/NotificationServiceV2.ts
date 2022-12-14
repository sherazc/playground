import { storeGetCompanyData, storeGetSetting } from "../../store/ReduxStoreService";
import { CompanyData, CompanyNotification, SettingData } from "../../types/types";
import { debounce } from "../Debounce";
import { getCurrentSystemDate, dayOfTheYear, TIME_24_REGX, addMinutesTo24hTime } from '../common/DateService';




const setupNotificationV2 = (settingState: SettingData, companyId: string) => {

    const notificationPromise = new Promise<boolean>((resolve, reject) => {
        const currentTimeMillis = getCurrentSystemDate().getTime();
        
        const settingStore = storeGetSetting();
        const companyData = storeGetCompanyData();

        const sameSettingAlert = isSameSettingAlert(settingState, settingStore);
        const anyAlertOn = isAnyAlertOn(settingState);
        const validCompanyDataAvailable = isValidCompanyDataAvailable(companyId, companyData);

        

    });


    notificationPromise.then((updateExpiration: boolean) => {
        // On accept
    }, (rejectReason: any) => {
        // On reject
    });
}
export const setupNotificationV2Debounce = debounce(setupNotificationV2, 3000);


const isSameSettingAlert = (setting1: SettingData, setting2: SettingData) => {
    return setting1 && setting2
        && setting1.azanAlert === setting2.azanAlert
        && setting1.beforeIqamaAlert === setting2.beforeIqamaAlert
        && setting1.iqamaAlert === setting2.iqamaAlert;
}

const isAnyAlertOn = (setting: SettingData): boolean => {
    return setting.azanAlert || setting.beforeIqamaAlert || setting.iqamaAlert;
}

// Checks same company and valid prayerYear
const isValidCompanyDataAvailable = (companyId: string, companyData: CompanyData): boolean => {
    return isSameCompany(companyId, companyData)
        && companyData.prayersYear != undefined && companyData.prayersYear.year != undefined
        && companyData.prayersYear.prayersMonths != undefined
        && companyData.prayersYear.prayersMonths.length > 11;
}

const isSameCompany = (companyId: string, companyData: CompanyData): boolean => {
    return companyData != undefined && companyData.company != undefined
        && companyData.company.id != undefined && companyData.company.id === companyId;
}

const isNotificationExpired = (companyNotification?: CompanyNotification): boolean => {
    return companyData != undefined && companyData.company != undefined
        && companyData.company.id != undefined && companyData.company.id === companyId;
}


