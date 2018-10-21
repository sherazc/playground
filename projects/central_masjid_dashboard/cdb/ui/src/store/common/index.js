import {combineReducers} from 'redux';
import {alertReducer} from "./alert/alertReducer";

const common = combineReducers({
    alertReducer,
});

export default common;
