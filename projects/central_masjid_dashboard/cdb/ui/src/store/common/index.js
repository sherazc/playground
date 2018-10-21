import {combineReducers} from 'redux';
import {alertReducer} from "./alert/alertReducer";
import {loadingReducer} from "./loading/loadingReducer";

const common = combineReducers({
    alertReducer,loadingReducer
});

export default common;
