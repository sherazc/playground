import {createStore, applyMiddleware} from "redux"

let reducerPerson = (state = {name: "", location: ""}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {...state, name: action.payload.name};
            break;
        case "SET_LOCATION":
            state = {...state, location: action.payload.location};
            break;
    }
    return state;
};

/*
middleware is like a interceptor that is called just before
store dispatches action.

line below is currying javascript technique
*/
let loggerMiddleware = (store) => (next) => (action) => {
    console.log("Logger Middleware>", action);
    // next(action) is required otherwise processing next dispatch event
    next(action)
};

// applyMiddleware(...) could take in multiple middleware function
let store = createStore(reducerPerson, null, applyMiddleware(loggerMiddleware));

store.subscribe(() => {
    console.log("Listener> store update", store.getState());
});

store.dispatch({
    type: "SET_NAME",
    payload: {name: "Sheraz"}
});

store.dispatch({
    type: "SET_LOCATION",
    payload: {location: "Atlant"}
});