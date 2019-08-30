export const ADMIN_PRAYER_CONFIG = "ADMIN_PRAYER_CONFIG";
export const ADMIN_PRAYER_CONFIG_EDIT = "ADMIN_PRAYER_CONFIG_EDIT";
export const ADMIN_PRAYER_CONFIG_RESET = "ADMIN_PRAYER_CONFIG_RESET";

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
