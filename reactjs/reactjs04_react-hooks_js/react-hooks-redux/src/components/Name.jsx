import React from "react";
import {useSelector, useDispatch} from "react-redux"
import { TYPE_UPDATE_NAME } from "../store/nameReducer";

export default function () {
    const {count, name} = useSelector(state => ({
        ...state.counterReducer,
        ...state.nameReducer,
    }));

    const dispatch = useDispatch();

    const onChangeName = (event) => {
        dispatch({
            type: TYPE_UPDATE_NAME,
            payload: event.target.value
        })
    };

    return (<>
        <div>Counter in Name: {count}</div>
        <input type="text" placeholder="Enter Name"
            onChange={onChangeName} value={name}/>
    </>)
};