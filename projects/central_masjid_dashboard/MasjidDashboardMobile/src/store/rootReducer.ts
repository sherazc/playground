import {createStore, combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook, useDispatch as _useDispatch} from "react-redux"
import companyListDataReducer, {CompanyListActionTypes} from './CompanyListDataReducer';
import loadingReducer, { LoadingActionTypes } from './LoadingReducer';
import companyDataReducer, { CompanyDataActionTypes } from './CompanyDataReducer';
import settingReducer, { SettingActionTypes } from './SettingReducer';

const INITIAL_STATE = {};

const rootReducer = combineReducers({
  companyListData: companyListDataReducer,
  companyData: companyDataReducer,
  loading: loadingReducer,
  setting: settingReducer
});

export type RootActionType = CompanyListActionTypes | CompanyDataActionTypes | LoadingActionTypes | SettingActionTypes;
export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTypedDispatch = () => {
  const dispatch = _useDispatch()
  return (event: RootActionType) => {
    dispatch(event)
  }
}

const store = createStore(rootReducer, INITIAL_STATE);

export default store;
