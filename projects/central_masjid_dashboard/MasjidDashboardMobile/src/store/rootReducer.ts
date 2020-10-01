import {createStore, combineReducers} from 'redux';
import companyListDataReducer from './CompanyListDataReducer';

const INITIAL_STATE = {};

const rootReducer = combineReducers({
  companyListDataReducer,
});

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
