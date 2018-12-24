import axios from "axios";
import {ALERT_SUCCESS, showAlert} from "../../store/common/alert/actions";
import history from "../../services/app-browse-history";

export const SAVE_COMPANY = "SAVE_COMPANY";
export const SAVE_COMPANY_USER = "SAVE_COMPANY_USER";
export const SAVE_COMPANY_FINISH = "SAVE_COMPANY_FINISH";
export const REGISTER_COMPANY_PREPARE_FOR_EDIT = "REGISTER_COMPANY_PREPARE_FOR_EDIT";
export const REGISTER_COMPANY_PREPARE_FOR_CREATE = "REGISTER_COMPANY_PREPARE_FOR_CREATE";
export const REGISTER_COMPANY_USER_PREPARE_FOR_EDIT = "REGISTER_COMPANY_USER_PREPARE_FOR_EDIT";


const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const saveCompanyAction = company => dispatch => {
    axios.post(`${baseUrl}/api/auth/companies`, company)
        .then(response => {
             dispatch({
                    type: SAVE_COMPANY,
                    payload: response.data
                });

             dispatch(showAlert(ALERT_SUCCESS, "Successfully saved company"));
             history.push(`${process.env.PUBLIC_URL}/register/user`);
            }
        )
        .catch(error => {
            dispatch({
                type: SAVE_COMPANY,
                payload: error.response.data
            });
        });
};


export const saveCompanyUserAction = (company, user) => dispatch => {
    axios.post(`${baseUrl}/company/user`, user)
        .then(response => {
                dispatch({
                    type: SAVE_COMPANY_USER,
                    payload: response.data
                });

                dispatch(showAlert(ALERT_SUCCESS, "Successfully saved company user"));
                dispatch({
                    type: SAVE_COMPANY_FINISH,
                    payload: {
                        email: user.email,
                        companyName: company.name
                    }
                });
                history.push(`${process.env.PUBLIC_URL}/register/finish`);
            }
        )
        .catch(error => {
            dispatch({
                type: SAVE_COMPANY_USER,
                payload: error.response.data
            });
        });
};


export const prepareCompanyToEdit = company => {
    return {
        type: REGISTER_COMPANY_PREPARE_FOR_EDIT,
        payload: company
    };
};

export const prepareCompanyUserToEdit = user => {
    return {
        type: REGISTER_COMPANY_USER_PREPARE_FOR_EDIT,
        payload: user
    };
};

export const prepareCompanyToCreate = () => {
    return {
        type: REGISTER_COMPANY_PREPARE_FOR_CREATE
    };
};
