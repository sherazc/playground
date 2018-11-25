import axios from "axios";

export const USER_LOGIN = "USER_LOGIN";

const baseUrl = 'http://localhost:8085';

export const loginAction = loginRequest => dispatch => {
    axios.post(`${baseUrl}/auth/login`, loginRequest)
        .then(response => {
                dispatch({
                    type: USER_LOGIN,
                    payload: response.data
                });
            }
        )
        .catch(error => {
            dispatch({
                type: USER_LOGIN,
                payload: error.response.data
            });
        });
};