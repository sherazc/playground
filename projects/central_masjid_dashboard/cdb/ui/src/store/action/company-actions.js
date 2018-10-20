import axios from "axios";
export const CREATE_COMPANY = "CREATE_COMPANY";

const baseUrl = 'http://localhost:8085';

export const createCompanyAction = newCompany => dispatch => {
    axios.post(`${baseUrl}/company`, newCompany)
        .then(response =>
            dispatch({
                type: CREATE_COMPANY,
                payload: response.data
            })
        )
        .catch(function (error) {
            console.log(error);
        });
};