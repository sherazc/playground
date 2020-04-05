import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const getAllCompanies = (cb) => {
    axios.get(`${baseUrl}/api/auth/companies`)
        .then(response => cb(response.data))
        .catch(error => console.log(error));
};

export const getAllCompaniesAllUsers = (cb) => {
    axios.get(`${baseUrl}/api/auth/companies/all/users`)
        .then(response => cb(response.data))
        .catch(error => console.log(error));
};

export const getCompanyAllUsers = (cb, companyId) => {
    axios.get(`${baseUrl}/api/auth/companies/${companyId}/users`)
        .then(response => cb(response.data))
        .catch(error => console.log(error));
};

export const activateCompany = (cb, companyId, active) => {
    axios.get(`${baseUrl}/api/auth/companies/${companyId}/activate?active=${active}`)
        .then(response => cb(response.data))
        .catch(error => console.log(error));
};

export const activateUser = (cb, userId, active) => {
    axios.get(`${baseUrl}/api/auth/users/${userId}/activate?active=${active}`)
        .then(response => cb(response.data))
        .catch(error => console.log(error));
};

export const deleteCompany = (cb, companyId) => {
    axios.delete(`${baseUrl}/api/auth/companies/${companyId}`)
        .then(response => cb(response.data))
        .catch(error => console.log(error));
};
