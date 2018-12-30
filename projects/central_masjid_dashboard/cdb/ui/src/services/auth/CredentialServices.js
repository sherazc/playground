import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const companyUserCredentialsReset = (email, newCredentials) => {

};

export const companyUserCredentialsUpdate = (email, existingCredential, newCredential) => {
    axios.put(`${baseUrl}/api/auth/credential/update/user/${email}`, {existingCredential, newCredential})
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
};
