import React, {useState, useEffect} from "react";

function useCountHook(elementId, count) {
    useEffect(() => {
        document.getElementById(elementId).innerHTML =
            `Count updated count = ${count}`;
    });
}

function CounterA() {
    const [count, setCount] = useState(10);
    useCountHook("domElementA", count);

    const onAddClick = () => {
        setCount(count + 1);
    };

    return (<>
        <div>Counter A: {count}</div>
        <div id="domElementA"></div>
        <button onClick={onAddClick}>Add</button>
    </>);
};

function CounterB() {
    const [count, setCount] = useState(20);
    useCountHook("domElementB", count);

    const onAddClick = () => {
        setCount(count + 1);
    };

    return (<>
        <div>Counter B: {count}</div>
        <div id="domElementB"></div>
        <button onClick={onAddClick}>Add</button>
    </>);
};

export default function() {
    return (<>
        <CounterA/>
        <hr/>
        <CounterB/>
    </>);
}
