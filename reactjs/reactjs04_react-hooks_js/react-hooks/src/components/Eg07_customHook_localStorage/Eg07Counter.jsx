import React, {useState, useEffect} from "react";

function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
        let value;
        try {
            value = JSON.parse(
                window.localStorage.getItem(key) || String(defaultValue)
            );
        } catch (error) {
            value = defaultValue
        }
        return value;
    });

    useEffect(() => {
        window.localStorage.setItem(key, state);
    }, [state])

    return [state, setState];
}

export default function() {

    const [count, setCount] = useLocalStorage("myCount", 0);

    return (<>
        <div>Count: {count}</div>
        <button onClick={() => setCount(count + 1)}>Add</button>
        <button onClick={() => setCount(count - 1)}>Subtract</button>
    </>);
};
