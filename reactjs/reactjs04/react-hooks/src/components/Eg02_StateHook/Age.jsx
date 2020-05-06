import React, {useState} from "react"

export default function Age(props) {

    const [age, setAge] = useState(20);

    return (
        <div>
            <div>{age}</div>
            <div>
                <button onClick={() => setAge(age + 1)}>Add</button>
                <button onClick={() => setAge(age - 1)}>Subtract</button>
            </div>
        </div>
    );
}