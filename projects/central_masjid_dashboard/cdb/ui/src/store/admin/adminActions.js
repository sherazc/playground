export const ADMIN_PRAYER_CONFIG_RESET = "ADMIN_PRAYER_CONFIG_RESET";
export const ADMIN_PRAYER_CONFIG_UPDATE = "ADMIN_PRAYER_CONFIG_UPDATE";
export const ADMIN_PRAYER_CONFIG_EDIT = "ADMIN_PRAYER_CONFIG_EDIT";

export const adminPrayerConfigUpdate = (prayerConfig) => {
    return {
        type: ADMIN_PRAYER_CONFIG_UPDATE,
        payload: prayerConfig
    };
};

export const adminPrayerConfigReset = () => {
    return {type: ADMIN_PRAYER_CONFIG_RESET};
};

export const adminPrayerConfigEdit = (prayerConfig) => {
    return {
        type: ADMIN_PRAYER_CONFIG_EDIT,
        payload: prayerConfig
    };
};
