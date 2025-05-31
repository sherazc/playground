import React, { useContext } from "react";
import {
    GlobalStateContext,
    TYPE_UPDATE_NAME
} from "../store/reducer";

export default function () {
    const [state, dispatch] = useContext(GlobalStateContext)

    const onChangeName = (event) => {
        dispatch({
            type: TYPE_UPDATE_NAME,
            payload: event.target.value
        })
    };

    return (<>
        <div>Counter in Name: {state.counter.count}</div>
        <input type="text" placeholder="Enter Name"
            onChange={onChangeName} value={state.name}/>
    </>)
};