import {
    PICKLIST_CONFIGURATIONS
} from "./picklistActions";

const initialStateCreator = () => {
    return {
        configurations: []
    };
};

const initialState = initialStateCreator();

export const picklist = (state = initialState, action) => {
    switch (action.type) {
        case PICKLIST_CONFIGURATIONS:
            return {...state, configurations: action.payload};
        default:
            return state;
    }
};
