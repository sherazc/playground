
export type AuthUserType = {
  id: number,
  name: string
}

export type AuthUserActionType = { type: "logout" }
  | { type: "login", payload: AuthUserType };

export const authUserReducer = (authUser: AuthUserType, action: AuthUserActionType): AuthUserType => {

  switch (action.type) {
    case "logout": return { id: 0, name: "Logged out" };
    case "login": return action.payload;
    default: return authUser;
  }
}