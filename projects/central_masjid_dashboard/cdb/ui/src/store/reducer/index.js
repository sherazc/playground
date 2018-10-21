import {combineReducers} from 'redux';
import {countReducer} from "./countReducer";
import {userReducer} from "./userReducer";
import {companyReducer} from "./companyReducer";
import common from "../common";
import {loadingReducer} from "./loadingReducer";

export default combineReducers({
    countReducer,
    userReducer,
    companyReducer,
    common,
    loadingReducer
});