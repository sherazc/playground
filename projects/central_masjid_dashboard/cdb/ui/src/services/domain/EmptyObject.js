export const createEmptyCompanyUser = () => {
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
        "url": "",
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

export const createEmptyServiceResponse = (targetCreatetor) => {
    return {
        "successful": undefined,
        "message": "",
        "fieldErrors": {},
        "target": targetCreatetor()
    };
};


export const createEmptyFinishRegister = () => {
    return {
        email: "",
        companyName: ""
    };
};


export const createEmptyPrayerConfig = () => {
    return {
        "companyId": "",
        "location": "",
        "calculationMethod": "",
        "asrJuristicMethod": "",
        "prayerOffsetMinutes": [0, 0, 0, 0, 0, 0, 0],
        "geoCode": {
            "latitude": 0,
            "longitude": 0,
            "timezone": 0,
            "timezoneId": "",
            "timezoneName": ""
        },
        "prayers": []
    };
};