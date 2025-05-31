import React, {useState, useContext} from "react";

const MyGlobalStateContext = React.createContext([{}, () => {}]);

function Counter() {
    const [count, setCount] = useContext(MyGlobalStateContext);
    return (<>
        <div>Count: {count}</div>
        <button onClick={() => setCount(count + 1)}>Add</button>
    </>);
}

export default function() {
    const [count, setCount] = useState(0);
    return(
        <MyGlobalStateContext.Provider value={[count, setCount]}>
            <Counter/>
        </MyGlobalStateContext.Provider>
    );
}
