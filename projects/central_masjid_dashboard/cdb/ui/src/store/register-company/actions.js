import axios from "axios";
export const CREATE_UPDATE_COMPANY = "CREATE_UPDATE_COMPANY";

const baseUrl = 'http://localhost:8085';

export const createUpdateCompanyAction = company => dispatch => {
    axios.post(`${baseUrl}/company`, company)
        .then(response =>
            dispatch({
                type: CREATE_UPDATE_COMPANY,
                payload: response.data
            })
        )
        .catch(function (error) {
            console.log(error);
        });
};