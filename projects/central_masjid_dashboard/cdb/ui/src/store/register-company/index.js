import {
    REGISTER_COMPANY_PREPARE_FOR_CREATE,
    REGISTER_COMPANY_PREPARE_FOR_EDIT,
    REGISTER_COMPANY_USER_PREPARE_FOR_CREATE,
    REGISTER_COMPANY_USER_PREPARE_FOR_EDIT,
    SAVE_COMPANY,
    SAVE_COMPANY_FINISH,
    SAVE_COMPANY_USER
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
        case SAVE_COMPANY:
            return {...state, companyServiceResponse: action.payload};
        case SAVE_COMPANY_USER:
            return {...state, companyUserServiceResponse: action.payload};
        case SAVE_COMPANY_FINISH:
            const cleanInitialState = initialStateCreator();
            return {...cleanInitialState, finishRegister: action.payload};
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
        default:
            return state;
    }
};