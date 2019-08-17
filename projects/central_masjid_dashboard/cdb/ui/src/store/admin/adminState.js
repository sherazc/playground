import {createEmptyPrayerConfig} from "../../services/domain/EmptyObject";

const initialStateCreator = () => {
    return {
        prayerConfig: createEmptyPrayerConfig()
    };
};

const initialState = initialStateCreator();

export const admin = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
