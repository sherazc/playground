import {combineReducers} from 'redux';
import {alert} from "./alert";
import {loading} from "./loading";

const common = combineReducers({
    alert,loading
});

export default common;
