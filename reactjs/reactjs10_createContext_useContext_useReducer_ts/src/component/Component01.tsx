import React, { useContext } from "react";
import { AppContext } from "../store/contextStore";

interface Props { }

export const Component01: React.FC<Props> = (): React.JSX.Element => {

  const [{ authUser, countState }, dispatch] = useContext(AppContext);

  return (
    <div>
      Component 01
      <br />
      User: {authUser.id} = {authUser.name}
      <br />
      Count: {countState.count}
      <br />
      <button onClick={() => dispatch({ type: "increment" })}>Increment Count</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement Count</button>
      <br />
      <button onClick={() => dispatch({
        type: "login", payload: {
          id: 100, name: "Sheraz"
        }
      })}>
        Login Sheraz
      </button>
      <button onClick={() => dispatch({ type: "logout" })}>Logout</button>

    </div>
  );
};
