import {combineReducers} from 'redux';
import {registerCompany} from "./register-company/index";
import common from "./common";

export default combineReducers({
    common,
    registerCompany,
});