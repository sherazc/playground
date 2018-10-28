import axios from "axios";
export const SAVE_COMPANY = "SAVE_COMPANY";

const baseUrl = 'http://localhost:8085';

export const saveCompanyAction = company => dispatch => {
    axios.post(`${baseUrl}/company`, company)
        .then(response => {
             dispatch({
                    type: SAVE_COMPANY,
                    payload: response.data
                });
            }
        )
        .catch(error => {
            dispatch({
                type: SAVE_COMPANY,
                payload: error.response.data
            });
        });
};