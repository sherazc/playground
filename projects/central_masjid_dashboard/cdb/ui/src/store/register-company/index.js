import {SAVE_COMPANY, SAVE_COMPANY_FINISH, SAVE_COMPANY_USER} from "./actions";

// TODO create new or edit flags.
// TODO create success company and user register summary start and its page.
const initialStateCreator = () => {
    return {
        companyServiceResponse: {
            "successful": undefined,
                "message": "",
                "fieldErrors": {},
            "target": {
                "id": undefined,
                "name": "",
                "address": {
                "street": "",
                    "city": "",
                    "state": "",
                    "zip": ""
                },
                "active": true
            }
        },
        companyUserServiceResponse: {
            "successful": undefined,
                "message": "",
                "fieldErrors": {},
            "target": {
                "id": undefined,
                "companyId": undefined,
                "email": "",
                "password": "",
                "firstName": "",
                "lastName": "",
                "roles": ["ADMIN"],
                "active": true,
                "verified": true
            }
        },
        finishRegister: {
            email: "",
            companyName: ""
        }
    }
};

const initialState = initialStateCreator();

export const registerCompany = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_COMPANY:
            return {...state, companyServiceResponse: action.payload};
        case SAVE_COMPANY_USER:
            return {...state, companyUserServiceResponse: action.payload};
        case SAVE_COMPANY_FINISH:
            const cleanInitialState = initialStateCreator();
            return {...cleanInitialState, finishRegister: action.payload};
        default:
            return state;
    }
};