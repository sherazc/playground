/*
"createStore()" can only take in one reducer.
To use multiple reducers we can use "combineReducers()"
 */
import {createStore, combineReducers} from "redux";

/*
Which reducer will get the message depends on store's dispatch object's
"action.type" (As a convention. Because we a switching on "action.type").

This is why we have created action type constants to easly maintain
uniqueness. We don't have to use "type" property of dispatch object.
But its just a convention to make dispatch object properties "type"
and "payload".
 */
const ACTION_TYPE_MATH_ADD = "ACTION_TYPE_MATH_ADD";
const ACTION_TYPE_MATH_SUBTRACT = "ACTION_TYPE_MATH_SUBTRACT";
const ACTION_TYPE_PERSON_UPDATE = "ACTION_TYPE_PERSON_UPDATE";

/*
In our application we can use multiple state object.
As a convention we can use one reducer to handel business login of one
state object.

We are giving initial state (using ES6 method) here because createStore()
only takes one initial state object.
*/
const reducerMath = (state = 0, action) => {
    switch (action.type) {
        case ACTION_TYPE_MATH_ADD:
            state = state + action.payload;
            break;
        case ACTION_TYPE_MATH_SUBTRACT:
            state = state - action.payload;
            break;
    }
    return state;
};

const reducerPerson = (state = {name: "No Name", age: 0},
                       action) => {
    switch (action.type) {
        case ACTION_TYPE_PERSON_UPDATE:
            state = {
                ...state,
                ...action.payload
            };
            break;
    }
    return state;
};

/*
Note:
Not giving initial state because we are using multiple reducer, and each
reducer handle different state. Create store only takes one initial state
*/
const store = createStore(combineReducers({reducerMath, reducerPerson}));

store.subscribe(() => {
/*
All state will be merged and will be available here. To get them out
individually we have to use the same names that we
*/
    console.log("Store updated!");
    console.log("reducerMath: ", store.getState().reducerMath);
    console.log("reducerPerson: ", store.getState().reducerPerson);
});

// Note we can pass object in payload
store.dispatch({
    type: ACTION_TYPE_MATH_ADD,
    payload: 60
});

store.dispatch({
    type: ACTION_TYPE_MATH_SUBTRACT,
    payload: 33
});


store.dispatch({
    type: ACTION_TYPE_PERSON_UPDATE,
    payload: {
        name: "Sheraz"
    }
});

store.dispatch({
    type: ACTION_TYPE_PERSON_UPDATE,
    payload: {
        age: 20
    }
});
