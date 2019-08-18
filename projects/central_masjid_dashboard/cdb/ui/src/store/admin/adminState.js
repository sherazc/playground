import {createEmptyPrayerConfig} from "../../services/domain/EmptyObject";
import {
    ADMIN_PRAYER_CONFIG_RESET,
    ADMIN_PRAYER_CONFIG_UPDATE
} from "./adminActions";

const initialStateCreator = () => {
    return {
        prayerConfig: createEmptyPrayerConfig()
    };
};

const initialState = initialStateCreator();

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_PRAYER_CONFIG_UPDATE:
            return {...state, prayerConfig: action.payload};
        case ADMIN_PRAYER_CONFIG_RESET:
            return {...state, prayerConfig: createEmptyPrayerConfig()};
        default:
            return state;
    }
};
