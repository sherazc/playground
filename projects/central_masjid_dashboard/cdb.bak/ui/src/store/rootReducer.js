import {combineReducers} from 'redux';
import {registerCompany} from "./register-company/index";
import common from "./common";
import {login} from "./login"

export default combineReducers({
    common,
    registerCompany,
    login,
});