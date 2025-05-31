import React, { useState, useEffect } from "react";

export default function Eg01Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.getElementById("countElement").innerHTML = count;
    });

    return (<>
        <div>State re-render: {count}</div>
        <div>DOM update: <span id="countElement"></span></div>
        <button onClick={() => setCount(count + 1)}>Add</button>
    </>);
}
