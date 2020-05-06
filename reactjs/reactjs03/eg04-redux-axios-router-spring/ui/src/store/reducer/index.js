import {combineReducers} from 'redux';
import {countReducer} from "./countReducer";
import {userReducer} from "./userReducer";

export default combineReducers({
    countReducer: countReducer,
    userReducer: userReducer
});