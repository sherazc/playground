import {createStore, combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from "react-redux"
import companyListDataReducer from './CompanyListDataReducer';
import loadingReducer from './LoadingReducer';

const INITIAL_STATE = {};

const rootReducer = combineReducers({
  companyListData: companyListDataReducer,
  loading: loadingReducer
});

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
