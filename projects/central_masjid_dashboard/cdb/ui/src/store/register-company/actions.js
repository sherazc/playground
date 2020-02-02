import axios from "axios";
import {ALERT_ERROR, ALERT_SUCCESS, showAlert} from "../../store/common/alert/actions";
import history from "../../services/app-browse-history";

export const REGISTER_COMPANY_SAVE = "REGISTER_COMPANY_SAVE";
export const REGISTER_COMPANY_USER_SAVE = "REGISTER_COMPANY_USER_SAVE";
export const REGISTER_COMPANY_RESET = "REGISTER_COMPANY_RESET";
export const REGISTER_COMPANY_FINISH = "REGISTER_COMPANY_FINISH";
export const REGISTER_COMPANY_PREPARE_FOR_EDIT = "REGISTER_COMPANY_PREPARE_FOR_EDIT";
export const REGISTER_COMPANY_PREPARE_FOR_CREATE = "REGISTER_COMPANY_PREPARE_FOR_CREATE";
export const REGISTER_COMPANY_USER_PREPARE_FOR_CREATE = "REGISTER_COMPANY_USER_PREPARE_FOR_CREATE";
export const REGISTER_COMPANY_USER_PREPARE_FOR_EDIT = "REGISTER_COMPANY_USER_PREPARE_FOR_EDIT";
export const REGISTER_COMPANY_USER_PREPARE_FOR_PROFILE = "REGISTER_COMPANY_USER_PREPARE_FOR_PROFILE";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const createCompanyAction = company => dispatch => {
    axios.post(`${baseUrl}/api/auth/companies`, company)
        .then(response => {
             dispatch({
                    type: REGISTER_COMPANY_SAVE,
                    payload: response.data
                });
             dispatch(showAlert(ALERT_SUCCESS, "Successfully saved company"));
             history.push(`${process.env.PUBLIC_URL}/auth/company/user/create`);
            }
        )
        .catch(error => {
            dispatch({
                type: REGISTER_COMPANY_SAVE,
                payload: error.response.data
            });
        });
};

export const updateCompanyAction = company => dispatch => {
    axios.put(`${baseUrl}/api/auth/companies/${company.id}`, company)
        .then(response => {
                dispatch({
                    type: REGISTER_COMPANY_SAVE,
                    payload: response.data
                });
                dispatch(showAlert(ALERT_SUCCESS, "Successfully updated company"));
                history.push(`${process.env.PUBLIC_URL}/auth/company/view`);
            }
        )
        .catch(error => {
            dispatch({
                type: REGISTER_COMPANY_SAVE,
                payload: error.response.data
            });
        });
};

export const updateCompanyUserAction = user => dispatch => {
    axios.put(`${baseUrl}/api/auth/companies/${user.companyId}/users/${user.id}`, user)
        .then(response => {
            dispatch({
                type: REGISTER_COMPANY_USER_SAVE,
                payload: response.data
            });

            dispatch(showAlert(ALERT_SUCCESS, "Successfully updated company user"));
            history.push(`${process.env.PUBLIC_URL}/auth/company/user/view`);
        })
        .catch(error => {
            dispatch(showAlert(ALERT_ERROR, "Failed to update company user."));
            console.log(error);
        });
};


export const createCompanyUserAction = (company, user, addUserToLoggedInCompany) => dispatch => {
    axios.post(`${baseUrl}/api/auth/companies/${company.id}/users`, user)
        .then(response => {
                dispatch({
                    type: REGISTER_COMPANY_USER_SAVE,
                    payload: response.data
                });
                if (addUserToLoggedInCompany) {
                    dispatch(showAlert(ALERT_SUCCESS, "Successfully added company user"));
                    history.push(`${process.env.PUBLIC_URL}/auth/company/user/view`);
                } else {
                    dispatch(showAlert(ALERT_SUCCESS, "Successfully created company user"));
                    dispatch({
                        type: REGISTER_COMPANY_FINISH,
                        payload: {
                            email: user.email,
                            companyName: company.name
                        }
                    });
                    history.push(`${process.env.PUBLIC_URL}/auth/register/finish`);
                }
            }
        )
        .catch(error => {
            dispatch(showAlert(ALERT_ERROR, "Failed to save company user"));
            dispatch({
                type: REGISTER_COMPANY_USER_SAVE,
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
    return {type: REGISTER_COMPANY_PREPARE_FOR_CREATE};
};

export const prepareCompanyUserToCreate = () => {
    return {type: REGISTER_COMPANY_USER_PREPARE_FOR_CREATE};
};
