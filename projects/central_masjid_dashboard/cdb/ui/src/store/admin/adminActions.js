export const ADMIN_RESET = "ADMIN_RESET";
export const ADMIN_PRAYER_CONFIG = "ADMIN_PRAYER_CONFIG";
export const ADMIN_PRAYER_CONFIG_EDIT = "ADMIN_PRAYER_CONFIG_EDIT";
export const ADMIN_PRAYER_CONFIG_RESET = "ADMIN_PRAYER_CONFIG_RESET";
export const ADMIN_CENTRAL_CONTROL = "ADMIN_CENTRAL_CONTROL";
export const ADMIN_CENTRAL_CONTROL_EDIT = "ADMIN_CENTRAL_CONTROL_EDIT";

export const setAdminPrayerConfig = (prayerConfig) => {
    return {
        type: ADMIN_PRAYER_CONFIG,
        payload: prayerConfig
    };
};

export const adminPrayerConfigReset = () => {
    return {type: ADMIN_PRAYER_CONFIG_RESET};
};

export const setAdminPrayerConfigEdit = (prayerConfig) => {
    return {
        type: ADMIN_PRAYER_CONFIG_EDIT,
        payload: prayerConfig
    };
};


export const setCentralControl = (centralControl) => {
    return {
        type: ADMIN_CENTRAL_CONTROL,
        payload: centralControl
    };
};


export const setCentralControlEdit = (centralControlEdit) => {
    return {
        type: ADMIN_CENTRAL_CONTROL_EDIT,
        payload: centralControlEdit
    };
};
