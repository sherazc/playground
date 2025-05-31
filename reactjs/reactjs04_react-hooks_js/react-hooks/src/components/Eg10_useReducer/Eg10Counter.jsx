import React, {useReducer} from "react";

const TYPE_INCREMENT = "TYPE_INCREMENT";
const TYPE_DECREMENT = "TYPE_DECREMENT";

const INITIAL_STATE = {counter: {count: 0}};

function rootReducer(state, action) {
    switch (action.type) {
        case TYPE_INCREMENT:
            return {...state, counter: {count: state.counter.count + 1}};
        case TYPE_DECREMENT:
            return {...state, counter: {count: state.counter.count - 1}}
        default:
            break;
    }
}

export default function Counter() {
    const [state, dispatch] = useReducer(rootReducer, INITIAL_STATE);
    return (<>
        <div>Count: {state.counter.count}</div>
        <button onClick={() => dispatch({type: TYPE_INCREMENT})}>+</button>
        <button onClick={() => dispatch({type: TYPE_DECREMENT})}>-</button>
    </>);
}
