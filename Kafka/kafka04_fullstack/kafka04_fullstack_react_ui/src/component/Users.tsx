import React, { useEffect, useState } from "react";
import { RegisterUserRecord } from "../types";
import { getAllUsers } from "../api/Api";

interface Props { }

export const Users: React.FC<Props> = () => {

  const [registerUsers, setRegisterUsers] = useState<RegisterUserRecord[]>([]);

  useEffect(() => {
    getAllUsers().then((users) => setRegisterUsers(users));
  }, []);


  return (
    <div>
      <h1>All Users</h1>
      <ol>
        {registerUsers && registerUsers.map(user => (
          <li key={user.id}>{`${user.userName}/${user.userPassword} - role_tbd - ${user.registerTime}`}</li>
        ))}
      </ol>
    </div>
  );
}
