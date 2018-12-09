import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;
export const getAllCompanies = (cb) => {
    axios.get(`${baseUrl}/api/auth/companies`)
        .then(response => cb(response.data))
        .catch(error => console.log(error));
};
