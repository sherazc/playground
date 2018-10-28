import axios from "axios";
import {ALERT_SUCCESS, showAlert} from "../../store/common/alert/actions";

export const SAVE_COMPANY = "SAVE_COMPANY";

const baseUrl = 'http://localhost:8085';

export const saveCompanyAction = company => dispatch => {
    axios.post(`${baseUrl}/company`, company)
        .then(response => {
             dispatch({
                    type: SAVE_COMPANY,
                    payload: response.data
                });

             dispatch(showAlert(ALERT_SUCCESS, "Successfully saved company"));
            }
        )
        .catch(error => {
            dispatch({
                type: SAVE_COMPANY,
                payload: error.response.data
            });
        });
};