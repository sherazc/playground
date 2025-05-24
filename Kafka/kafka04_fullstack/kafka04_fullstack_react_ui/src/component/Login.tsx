import React from "react";

interface Props { }

export const Login: React.FC<Props> = () => {

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input/>
        <input/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
