import { RegisterRole } from "../types"

export enum ActionNameRegisterRoles {
    addRegisterRoles = "ADD_REGISTER_ROLES",
    removeRegisterRoles = "REMOVE_REGISTER_ROLES",
}

export type RegisterRolesAction = {
    type: ActionNameRegisterRoles,
    payload: RegisterRole[]
}

export const registerRolesReducer = (registerRoles: RegisterRole[], action: RegisterRolesAction): RegisterRole[] => {
    switch (action.type) {
        case ActionNameRegisterRoles.addRegisterRoles:
            return action.payload;
        case ActionNameRegisterRoles.removeRegisterRoles:
            return [];
        default:
            return registerRoles;
    }
}