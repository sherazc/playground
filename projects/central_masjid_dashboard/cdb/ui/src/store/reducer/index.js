import {combineReducers} from 'redux';
import {countReducer} from "./countReducer";
import {userReducer} from "./userReducer";
import {companyReducer} from "./companyReducer";
import {alertReducer} from "./alertReducer";

export default combineReducers({
    countReducer,
    userReducer,
    companyReducer,
    alertReducer
});