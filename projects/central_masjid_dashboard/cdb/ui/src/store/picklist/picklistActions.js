import axios from "axios";
export const PICKLIST_CONFIGURATIONS = "PICKLIST_CONFIGURATIONS";
const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const apiGetConfigurations = setConfigurationInComponentState => dispatch => {
    axios.get(`${baseUrl}/api/picklist/configuration`)
        .then(response => {
                setConfigurationInComponentState(response.data);
                dispatch({
                    type: PICKLIST_CONFIGURATIONS,
                    payload: response.data
                });
            }
        )
        .catch(error => {
            console.error(error);
        });
};