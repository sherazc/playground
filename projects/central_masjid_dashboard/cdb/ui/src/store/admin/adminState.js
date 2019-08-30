import {createEmptyPrayerConfig} from "../../services/domain/EmptyObject";
import {
    ADMIN_PRAYER_CONFIG_EDIT,
    ADMIN_PRAYER_CONFIG,
    ADMIN_PRAYER_CONFIG_RESET
} from "./adminActions";

const initialStateCreator = () => {
    return {
        prayerConfig: createEmptyPrayerConfig(),
        prayerConfigEdit: {}
    };
};

const initialState = initialStateCreator();

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_PRAYER_CONFIG:
            return {...state, prayerConfig: action.payload};
        case ADMIN_PRAYER_CONFIG_RESET:
            return {...state, prayerConfig: createEmptyPrayerConfig()};
        case ADMIN_PRAYER_CONFIG_EDIT:
            return {...state, prayerConfigEdit: action.payload};
        default:
            return state;
    }
};
