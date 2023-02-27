import { Loading, LoadingStatus } from "mdb-core-js";

// Types
export const RECOVER_INIT_STATE_SET = "RECOVER_INIT_STATE_SET";

export type RecoverInitStateSet = {
    type: typeof RECOVER_INIT_STATE_SET;
    payload: Loading;
}

export type LoadingActionTypes = RecoverInitStateSet;

export const RecoverInitCompleteAction: RecoverInitStateSet = {
    type: "RECOVER_INIT_STATE_SET",
    payload: {recoverInitState: LoadingStatus.COMPLETE}
}

export const RecoverInitFailedAction: RecoverInitStateSet = {
    type: "RECOVER_INIT_STATE_SET",
    payload: {recoverInitState: LoadingStatus.FAILED}
}

// Initial State
const INITIAL_STATE: Loading = {
    recoverInitState: LoadingStatus.INIT
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
