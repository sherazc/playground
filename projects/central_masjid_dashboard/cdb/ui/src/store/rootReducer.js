import {combineReducers} from 'redux';
import {companyReducer} from "./company/companyReducer";
import common from "./common";

export default combineReducers({
    common,
    companyReducer,
});