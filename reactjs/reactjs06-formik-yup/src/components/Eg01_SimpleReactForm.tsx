import React, { useState } from "react";

type UserState = {
    name: string;
    email: string;
    password: string;
}

const createInitFormState = (): UserState => ({
    name: "",
    email: "",
    password: ""
});

export const Eg01_SimpleReactForm = () => {

    const [user, setUser] = useState<UserState>(createInitFormState());

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, ...{ [event.target.name]: event.target.value } });
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <div>
            <h1>Example 01 - Simple React form</h1>
            <form onSubmit={onSubmit}>
                <div>
                    Name: <input type="text" name="name" value={user.name} onChange={onChange} />
                </div>
                <div>
                    Email: <input type="text" name="email" value={user.email} onChange={onChange} />
                </div>
                <div>
                    Password: <input type="text" name="password" value={user.password} onChange={onChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}