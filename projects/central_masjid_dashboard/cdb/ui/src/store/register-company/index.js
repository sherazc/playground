import {SAVE_COMPANY, SAVE_COMPANY_FINISH, SAVE_COMPANY_USER} from "./actions";
import {
    createEmptyCompany,
    createEmptyFinishRegister,
    createEmptyServiceResponse,
    createEmptyUser
} from "../../services/domain/EmptyObject";

// TODO create new or edit flags.
// TODO create success company and user register summary start and its page.
const initialStateCreator = () => {
    return {
        companyServiceResponse: createEmptyServiceResponse(createEmptyCompany),
        companyUserServiceResponse: createEmptyServiceResponse(createEmptyUser),
        finishRegister: createEmptyFinishRegister()
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