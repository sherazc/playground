import React from "react";

export const ListUsers = (props) => {
    return (
        <ul>
            {props.users.map((user, index) => <li key={index}>id: {user.id},Name: {user.name}, age: {user.age}</li>)}
        </ul>
    );
};
