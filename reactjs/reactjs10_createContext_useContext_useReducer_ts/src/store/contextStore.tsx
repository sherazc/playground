import { createContext, useReducer } from "react";
import { AuthUserActionType, authUserReducer, AuthUserType } from "./authUserReducer"
import { CountActionType, countReducer, CountStateType } from "./countReducer";

type RootStateType = {
  authUser: AuthUserType;
  countState: CountStateType;
};

const initialState = (): RootStateType => ({
  authUser: {id: 0, name: ""},
  countState: {count: 0}
});

type RootAction = AuthUserActionType | CountActionType;

export const AppContext = createContext<[RootStateType, React.Dispatch<RootAction>]>
  ([initialState(), () => null]);

const mainReducer = ({authUser, countState}: RootStateType, action: RootAction) => ({
  authUser: authUserReducer(authUser, action as AuthUserActionType),
  countState: countReducer(countState, action as CountActionType)
});

interface Props {
  children: React.JSX.Element;
}

export const AppProvider: React.FC<Props> = ({children}): React.JSX.Element => {

  const [state, dispatch] = useReducer(mainReducer, initialState());

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}