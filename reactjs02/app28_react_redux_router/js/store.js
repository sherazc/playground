import {createStore, applyMiddleware, combineReducers} from "redux";
import logger from "redux-logger";
import ProfileReducer from "./reducers/ProfileReducer";

const store = createStore(
    combineReducers({profile: ProfileReducer}),
    {},
    applyMiddleware(logger()));

export default store;