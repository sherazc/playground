import React, { useContext } from "react";
import {
    GlobalStateContext,
    TYPE_INCREMENT,
    TYPE_DECREMENT
} from "../store/reducer";

export default function () {
    const [state, dispatch] = useContext(GlobalStateContext)

    const onClickIncrement = () => {
        dispatch({type: TYPE_INCREMENT});
    }

    const onClickDecrement = () => {
        dispatch({type: TYPE_DECREMENT});
    }

    return (<>
        <div>Name in counter: {state.name}</div>
        <button onClick={onClickIncrement}>+</button>
        <button onClick={onClickDecrement}>-</button>
    </>)
}
