import { saveStorage, STORAGE_SETTING_DATA } from '../storage/Storage';
import { createDefaultSettingData, SettingData } from '../types/types';

// Types
export const SETTING_SET = "SETTING_SET";

export type SettingSet = {
    type: typeof SETTING_SET;
    payload: SettingData;
}

export type SettingActionTypes = SettingSet;

// Initial State
const INITIAL_STATE = createDefaultSettingData();

// Reducer
export default function settingReducer(
    state = INITIAL_STATE, action: SettingActionTypes) {

    switch (action.type) {
        case "SETTING_SET":
            saveStorage(STORAGE_SETTING_DATA, action.payload);
            const newSettingState = {...state, ...action.payload};
            console.log("Updating Setting in store and storage.", newSettingState);
            return newSettingState;
        default:
            return state;
    }
}
