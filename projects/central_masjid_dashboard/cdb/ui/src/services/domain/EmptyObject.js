export const createEmptyUser = () => {
    return {
        "id": null,
        "companyId": null,
        "email": "",
        "password": "",
        "firstName": "",
        "lastName": "",
        // TODO: set admin role in register company user components
        "roles": ["ADMIN"],
        "active": true,
        "verified": true
    };
};

export const createEmptyCompany = () => {
    return {
        "id": null,
        "name": "",
        "address": {
            "street": "",
            "city": "",
            "state": "",
            "zip": "",
            "longitude": "",
            "latitude": ""
        },
        "active": true,
        "expirationDate": ""
    };
};


export const createEmptyFinishRegister = () => {
    return {
        email: "",
        companyName: ""
    };
};
