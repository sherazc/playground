import { Loading, LoadingStatus } from "../types/types";

// Types
export const RECOVER_INIT_STATE_SET = "RECOVER_INIT_STATE_SET";

export type RecoverInitStateSet = {
    type: typeof RECOVER_INIT_STATE_SET;
    payload: Loading;
}

export type LoadingActionTypes = RecoverInitStateSet;

// Initial State
const INITIAL_STATE: Loading = {
    recoverInitState: LoadingStatus.LOADING
};

// Reducer
export default function loadingReducer(
    state = INITIAL_STATE, action: LoadingActionTypes) {

    switch (action.type) {
        case "RECOVER_INIT_STATE_SET":
            return {
                ...state,
                recoverInitState: action.payload.recoverInitState,
            };
        default:
            return state;
    }
}
