import React from "react";

interface Props { }

export const Login: React.FC<Props> = () => {

  return (
    <div>
      <h1>Login</h1>
      <form>
        User Name: <input/>
        <br />
        Password: <input/>
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
