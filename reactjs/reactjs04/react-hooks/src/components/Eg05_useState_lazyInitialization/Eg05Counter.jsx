import React, {useState} from "react";

const expensiveOperation = () => {
    console.log("Expensive operation executed when component loaded.")
    return 10 * 10;
}

export default function() {
    const [count, setCount] = useState(expensiveOperation);

    const onAddClick = () => {
        setCount(count + 1);
    };

    return (<>
        <div>Count: {count}</div>
        <button onClick={onAddClick}>Add</button>
    </>);
};
