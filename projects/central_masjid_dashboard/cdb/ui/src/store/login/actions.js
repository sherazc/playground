import axios from "axios";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGIN_RESET = "USER_LOGIN_RESET";

const baseUrl = 'http://localhost:8085';

export const loginAction = loginRequest => dispatch => {
    axios.post(`${baseUrl}/auth/login`, loginRequest)
        .then(response => {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: response.data
                });
            }
        )
        .catch(error => {
            dispatch({
                type: USER_LOGIN_FAILED
            });
        });
};

export const loginResetAction = () => {
    return {type: USER_LOGIN_RESET};
};