import {combineReducers} from 'redux';
import {company} from "./company/index";
import common from "./common";

export default combineReducers({
    common,
    company,
});