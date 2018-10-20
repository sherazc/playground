/**
 *
 * THIS IS JUST FOR REFERENCE. DELETE IT ONCE ITS NOT NEEDED ANYMORE.
 *
 */
import axios from "axios";

export const USER_FETCH_ALL = "USERS_FETCH_ALL";
export const USER_CREATE = "USER_CREATE";

const baseUrl = 'http://localhost:9000';
/*
For async calls we will have to call dispatch() when async completes.

TODO: Research if below statement is true
This is possible because of thunk library.
*/

export const userFetchAllAction = () => dispatch => {
    axios.get(`${baseUrl}/user`)
        .then(response =>
            dispatch({
                type: USER_FETCH_ALL,
                payload: response.data
            })
        )
        .catch(error => console.log(error))
        .then(() => console.log("Done with get user API!", new Date())); // .then() after catch is always called.
};

export const userCreateAction = (newUser) => dispatch => {
    axios.post(`${baseUrl}/user`, newUser)
        .then(response =>
            dispatch({
                type: USER_CREATE,
                payload: response.data
            })
        )
        .catch(function (error) {
            console.log(error);
        })
        .then(() => console.log("Done with create user API!", new Date())); // .then() after catch is always called.;
};