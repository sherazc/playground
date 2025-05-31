export type RegisterUserRecord = {
    id?: number;
    userName: string;
    userPassword: string; 
    registerRoleId: number; 
    registerTime: string;
};

export type RegisterRole = {
  id: number;
  roleName: string;
};

