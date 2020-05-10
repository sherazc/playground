import React, { useReducer } from "react";
import {
    INITIAL_STATE,
    reducer,
    GlobalStateContext
} from "./store/reducer";
import Name from "./components/Name";
import Counter from "./components/Counter";


export default function() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            <Name/>
            <hr/>
            <Counter/>
        </GlobalStateContext.Provider>
    );
}