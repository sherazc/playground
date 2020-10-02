import {createStore, combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from "react-redux"
import companyListDataReducer from './CompanyListDataReducer';

const INITIAL_STATE = {};

const rootReducer = combineReducers({
  companyListData: companyListDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
