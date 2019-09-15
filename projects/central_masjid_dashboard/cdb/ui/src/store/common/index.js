import {combineReducers} from 'redux';
import {alert} from "./alert";
import {loading} from "./loading";
import {configurations} from "./configurations/configurationsState";

const common = combineReducers({
    alert, loading, configurations
});

export default common;
