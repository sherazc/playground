import React from "react";
import {useSelector, useDispatch} from "react-redux"
import { TYPE_INCREMENT, TYPE_DECREMENT } from "../store/counterReducer";

export default function () {
    const name = useSelector(state => state.nameReducer.name);
    const dispatch = useDispatch();

    const onClickIncrement = () => {
        dispatch({type: TYPE_INCREMENT});
    }

    const onClickDecrement = () => {
        dispatch({type: TYPE_DECREMENT});
    }

    return (<>
        <div>Name in counter: {name}</div>
        <button onClick={onClickIncrement}>+</button>
        <button onClick={onClickDecrement}>-</button>
    </>)
}
