import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {useSelector, TypedUseSelectorHook, useDispatch as _useDispatch} from "react-redux"
import companyListDataReducer, {CompanyListActionTypes} from './CompanyListDataReducer';
import loadingReducer, { LoadingActionTypes } from './LoadingReducer';
import companyDataReducer, { CompanyDataActionTypes } from './CompanyDataReducer';
import settingReducer, { SettingActionTypes } from './SettingReducer';
import thunk from 'redux-thunk';

const INITIAL_STATE = {};


const middleware = [thunk];

// TODO: Redux Devtools is not working.
let allMiddlewares; // @ts-ignore
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    allMiddlewares = compose(
        applyMiddleware(...middleware),// @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    allMiddlewares = compose(
        applyMiddleware(...middleware));
}

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

const store = createStore(rootReducer, INITIAL_STATE, allMiddlewares);

export default store;
