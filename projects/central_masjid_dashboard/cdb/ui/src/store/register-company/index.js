import {
    REGISTER_COMPANY_PREPARE_FOR_CREATE,
    REGISTER_COMPANY_PREPARE_FOR_EDIT,
    REGISTER_COMPANY_USER_PREPARE_FOR_CREATE,
    REGISTER_COMPANY_USER_PREPARE_FOR_EDIT,
    REGISTER_COMPANY_SAVE,
    REGISTER_COMPANY_FINISH,
    REGISTER_COMPANY_USER_SAVE, REGISTER_COMPANY_USER_PREPARE_FOR_PROFILE, REGISTER_COMPANY_RESET
} from "./actions";
import {
    createEmptyCompany,
    createEmptyFinishRegister,
    createEmptyServiceResponse,
    createEmptyCompanyUser
} from "../../services/domain/EmptyObject";

// TODO create new or edit flags.
// TODO create success company and user register summary start and its page.
const initialStateCreator = () => {
    return {
        companyServiceResponse: createEmptyServiceResponse(createEmptyCompany),
        companyUserServiceResponse: createEmptyServiceResponse(createEmptyCompanyUser),
        finishRegister: createEmptyFinishRegister()
    }
};

const initialState = initialStateCreator();

export const registerCompany = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_COMPANY_SAVE:
            return {...state, companyServiceResponse: action.payload};
        case REGISTER_COMPANY_USER_SAVE:
            return {...state, companyUserServiceResponse: action.payload};
        case REGISTER_COMPANY_FINISH:
            return {...initialStateCreator(), finishRegister: action.payload};
        case REGISTER_COMPANY_RESET:
            return {...initialStateCreator()};
        case REGISTER_COMPANY_PREPARE_FOR_EDIT:
            const companyServiceResponse = createEmptyServiceResponse(() => action.payload);
            return {...state, companyServiceResponse: companyServiceResponse};
        case REGISTER_COMPANY_PREPARE_FOR_CREATE:
            return {...state, companyServiceResponse: createEmptyServiceResponse(createEmptyCompany)};
        case REGISTER_COMPANY_USER_PREPARE_FOR_CREATE:
            return {...state, companyUserServiceResponse: createEmptyServiceResponse(createEmptyCompanyUser)};
        case REGISTER_COMPANY_USER_PREPARE_FOR_EDIT:
            const companyUserServiceResponse = createEmptyServiceResponse(() => action.payload);
            return {...state, companyUserServiceResponse: companyUserServiceResponse};
        case REGISTER_COMPANY_USER_PREPARE_FOR_PROFILE:
            const loginCompanyUserServiceResponse = createEmptyServiceResponse(() => action.payload);
            return {...state, companyUserServiceResponse: loginCompanyUserServiceResponse};
        default:
            return state;
    }
};