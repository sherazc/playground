import axios from "axios";
export const COMPANY_CONFIGURATIONS = "COMPANY_CONFIGURATIONS";
const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const apiGetCompanyConfigurations = (companyId, setConfigurationInState) => dispatch => {
    axios.get(`${baseUrl}/api/auth/companies/${companyId}/configurations`)
        .then(response => {
            if (response.data && response.data.length > 0) {
                if (setConfigurationInState) {
                    setConfigurationInState(response.data);
                }
                dispatch({
                    type: COMPANY_CONFIGURATIONS,
                    payload: response.data
                });
            }

        })
        .catch(error => {
            console.error(error);
        });
};

