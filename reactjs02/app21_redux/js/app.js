import {createStore} from "redux";

// Step 1: Create a reducer function and pass it to store
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            state = state + action.payload;
            break;
        case "SUBSTRACT":
            state = state - action.payload;
            break;
    }
    return state;
};

// Step 2: create a redux store
// 1 is initial state. It could be array or object
const store = createStore(reducer, 1);

// Step 3: subscribe to the store
store.subscribe(() => {
    console.log("Store updated!", store.getState());
});

// Step 4: Dispatch different type of action objects
// Convention is to give "type" and "payload" but not mandatory
store.dispatch({
    type: "ADD",
    payload: 10
});

store.dispatch({
    type: "ADD",
    payload: 50
});

store.dispatch({
    type: "SUBSTRACT",
    payload: 22
});
