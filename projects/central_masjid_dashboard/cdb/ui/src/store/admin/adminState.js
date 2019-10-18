import {createEmptyPrayerConfig} from "../../services/domain/EmptyObject";
import {
    ADMIN_PRAYER_CONFIG_EDIT,
    ADMIN_PRAYER_CONFIG,
    ADMIN_PRAYER_CONFIG_RESET,
    ADMIN_CENTRAL_CONTROL,
    ADMIN_CENTRAL_CONTROL_EDIT,
    ADMIN_RESET
} from "./adminActions";

const initialStateCreator = () => {
    return {
        prayerConfig: createEmptyPrayerConfig(),
        prayerConfigEdit: {},
        centralControl: {},
        centralControlEdit: {}
    };
};

const initialState = initialStateCreator();

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_RESET:
            const emptyAdminState = initialStateCreator();
            return {...state, ...emptyAdminState};
        case ADMIN_PRAYER_CONFIG:
            return {...state, prayerConfig: action.payload};
        case ADMIN_PRAYER_CONFIG_RESET:
            return {...state, prayerConfig: createEmptyPrayerConfig()};
        case ADMIN_PRAYER_CONFIG_EDIT:
            return {...state, prayerConfigEdit: action.payload};
        case ADMIN_CENTRAL_CONTROL:
            return {...state, centralControl: action.payload};
        case ADMIN_CENTRAL_CONTROL_EDIT:
            return {...state, centralControlEdit: action.payload};
        default:
            return state;
    }
};
