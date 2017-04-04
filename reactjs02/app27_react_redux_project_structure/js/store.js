import {createStore, applyMiddleware, combineReducers} from "redux";
import logger from "redux-logger";
import calculatorReducer from  "./reducers/calculatorReducer";

const store = createStore(
    combineReducers({calculatorState: calculatorReducer}),
    {},
    applyMiddleware(logger())
);

export default store;