import { createContext } from "react";
import { RegisterRole } from "../types"
import { RegisterRolesAction } from "./RegisterRolesReducer";

type RootStateType = {
    registerRoles: RegisterRole[];
}

const initialAppState: RootStateType = {
    registerRoles: []
}

type RootAction = RegisterRolesAction

const AppContext = createContext<[state: RootStateType, dispatch: React.Dispatch<RootAction>]>