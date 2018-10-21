import axios from "axios";
export const CREATE_UPDATE_COMPANY = "CREATE_UPDATE_COMPANY";

const baseUrl = 'http://localhost:8085';

export const createUpdateCompanyAction = createUpdateCompany => dispatch => {
    axios.post(`${baseUrl}/company`, createUpdateCompany)
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