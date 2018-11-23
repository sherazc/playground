import axios from "axios";
import {ALERT_SUCCESS, showAlert} from "../../store/common/alert/actions";
import history from "../../services/app-browse-history";

export const SAVE_COMPANY = "SAVE_COMPANY";
export const SAVE_COMPANY_USER = "SAVE_COMPANY_USER";
export const SAVE_COMPANY_FINISH = "SAVE_COMPANY_FINISH";

const baseUrl = 'http://localhost:8085';

export const saveCompanyAction = company => dispatch => {
    axios.post(`${baseUrl}/company`, company)
        .then(response => {
             dispatch({
                    type: SAVE_COMPANY,
                    payload: response.data
                });

             dispatch(showAlert(ALERT_SUCCESS, "Successfully saved company"));
             history.push("/register/user");
            }
        )
        .catch(error => {
            dispatch({
                type: SAVE_COMPANY,
                payload: error.response.data
            });
        });
};


export const saveCompanyUserAction = user => dispatch => {
    axios.post(`${baseUrl}/company/user`, user)
        .then(response => {
                dispatch({
                    type: SAVE_COMPANY_USER,
                    payload: response.data
                });

                dispatch(showAlert(ALERT_SUCCESS, "Successfully saved company user"));
            }
        )
        .catch(error => {
            dispatch({
                type: SAVE_COMPANY_USER,
                payload: error.response.data
            });
        });
};