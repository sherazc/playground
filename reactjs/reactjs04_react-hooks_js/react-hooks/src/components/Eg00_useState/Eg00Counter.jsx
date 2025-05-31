import React, { useState } from "react"

export default function Eg00Counter(props) {

    const [count, setCount] = useState(0);

    return (<>
        <div>{count}</div>
        <div>
            <button onClick={() => setCount(count + 1)}>Add</button>
            <button onClick={() => setCount(count - 1)}>Subtract</button>
        </div>
    </>);
}