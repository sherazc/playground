import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
const initialState = {};

const middleware = [thunk];

let allMiddlewares;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    allMiddlewares = compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    allMiddlewares = compose(
        applyMiddleware(...middleware));
}

const store = createStore(rootReducer, initialState, allMiddlewares);
export default store;