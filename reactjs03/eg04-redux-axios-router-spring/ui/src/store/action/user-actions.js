export const USER_FETCH_ALL = "USERS_FETCH_ALL";
export const USER_CREATE = "USER_CREATE";

/*
For async calls we will have to call dispatch() when async completes.

TODO: Research if below statement is true
This is possible because of thunk library.
*/

export const userFetchAllAction = () => dispatch => {
    fetch("http://localhost:9000/user")
        .then(response => response.json())
        .then(allUsers => {
            dispatch({
                type: USER_FETCH_ALL,
                payload: allUsers
            });
        })
};

export const userCreateAction = (newUser) => dispatch => {
    fetch('http://localhost:9000/user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(res => res.json())
        .then(createdUser =>
            dispatch({
                type: USER_CREATE,
                payload: createdUser
            })
        );
};