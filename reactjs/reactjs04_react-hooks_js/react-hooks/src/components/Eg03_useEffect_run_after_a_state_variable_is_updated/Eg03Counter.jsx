import React, {useState, useEffect} from "react";

export default function Eg03Counter() {

    const [countA, setCountA] = useState(0);
    useEffect(() => {
        document.getElementById("effectStatus").innerHTML = "countA updated";
    }, [countA]);

    const [countB, setCountB] = useState(0);
    useEffect(() => {
        document.getElementById("effectStatus").innerHTML = "countB updated";
    }, [countB]);

    return (<>
        <div>State re-render countA = {countA}</div>
        <div>State re-render countB = {countB}</div>

        <div>Effect update = <span id="effectStatus">State not updated</span></div>

        <button onClick={() => setCountA(countA + 1)}>Add countA</button>
        <button onClick={() => setCountB(countB + 1)}>Add countB</button>
    </>);
}
