import React, { ChangeEvent, ChangeEventHandler, FormEvent, useRef, useState } from "react";
import { RegisterUserRecord } from "../types";
import { createUser } from "../api/Api";

interface Props { }

const createEmptyUser = (): RegisterUserRecord => ({
  userName: "",
  email: "",
  userPassword: "",
  registerTime: "",
  registerRoleId: 0
});

export const UserCreate: React.FC<Props> = () => {

  const [registerUser, setRegisterUser] = useState<RegisterUserRecord>(createEmptyUser());

  const createResultRef = useRef<HTMLInputElement>(null);


  const handleCreateUser = (event: FormEvent) => {
    event.preventDefault();
    registerUser.registerTime = new Date().toISOString();
    console.log(registerUser);

    createUser(registerUser).then(successString => {
      console.log(successString);
      if (createResultRef.current) {
        createResultRef.current.innerHTML = 'Successfully Created User';
      }
    })
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div>
      <h1>Create New User</h1>
      <div ref={createResultRef}></div>

      <form onSubmit={handleCreateUser}>
        User Name: <input name="userName" value={registerUser.userName} onChange={handleInputChange} />
        <br />
        User Email: <input name="email" value={registerUser.email} onChange={handleInputChange} />
        <br />
        Password: <input name="userPassword" value={registerUser.userPassword} onChange={handleInputChange} />
        <br />
        Role: 
        <select name="userRole" onChange={handleSelectChange}>
          <option value="BASIC">BASIC</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
