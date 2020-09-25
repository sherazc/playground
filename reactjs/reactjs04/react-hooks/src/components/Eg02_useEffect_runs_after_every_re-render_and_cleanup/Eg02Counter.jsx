import React, { useState, useEffect } from "react";

export default function Eg02Counter() {
    const [count, setCount] = useState(0);

    //  componentDidMount()
    useEffect(() => {
        console.log("useEffect. Setting interval.");
        let seconds = 0;
        let interval = window.setInterval(() => {
            document.getElementById("countElement").innerHTML = seconds++;
        }, 1000);

        // Returned function is like componentWillUnmount()
        return () => {
            console.log("Cleaning up effect");
            seconds = 0;
            window.clearInterval(interval);
        }
    });

    return (<>
        <div>State re-render: {count}</div>
        <div>State updated: <span id="countElement"></span> seconds ago</div>
        <button onClick={() => setCount(count + 1)}>Add</button>
    </>);
}
