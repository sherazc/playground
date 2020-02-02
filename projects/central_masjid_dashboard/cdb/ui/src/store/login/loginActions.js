import axios from "axios";
import {REGISTER_COMPANY_RESET, REGISTER_COMPANY_USER_PREPARE_FOR_PROFILE} from "../register-company/actions";
import {ADMIN_RESET} from "../admin/adminActions";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGIN_RESET = "USER_LOGIN_RESET";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const loginAction = loginRequest => dispatch => {
    dispatch({type: ADMIN_RESET});
    dispatch({type: USER_LOGIN_RESET});
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

export const loginResetAction = () => dispatch => {
    dispatch({type: ADMIN_RESET});
    dispatch({type: USER_LOGIN_RESET});
    dispatch({type: REGISTER_COMPANY_RESET});
};

export const viewMyProfileAction = (user) => {
    return {type: REGISTER_COMPANY_USER_PREPARE_FOR_PROFILE, payload: user};
};

