import {combineReducers} from 'redux';
import {countReducer} from "./countReducer";
import {userReducer} from "./userReducer";
import {companyReducer} from "./companyReducer";

export default combineReducers({
    countReducer: countReducer,
    userReducer: userReducer,
    companyReducer: companyReducer
});