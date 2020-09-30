import {createStore, combineReducers} from "redux";
// import counterReducer from "./counterReducer";
// import nameReducer from "./nameReducer";

const INITIAL_STATE = {};

const rootReducer = combineReducers({
    // counterReducer,
    // nameReducer
});

const store = createStore(rootReducer, INITIAL_STATE);

export default store;