import {combineReducers} from 'redux';
import {registerCompany} from "./register-company/index";
import common from "./common";
import {login} from "./login/loginState";
import {admin} from "./admin/adminState";
import {picklist} from "./picklist/picklistState";

export default combineReducers({
    common,
    registerCompany,
    login,
    admin,
    picklist
});