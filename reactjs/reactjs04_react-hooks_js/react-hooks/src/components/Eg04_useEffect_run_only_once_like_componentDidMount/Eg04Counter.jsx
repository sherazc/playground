import React, {useEffect, useState} from "react";

export default function Eg04Counter(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.getElementById("domElement").innerHTML = "DOM updated. count = " + count;
    }, []);

    return (<>
        <div>Count = {count}</div>
        <div id="domElement">DOM element not updated</div>
        <button onClick={() => setCount(count + 1)}>Add</button>
    </>)
}
