import axios, { AxiosInstance } from "axios";
import { RegisterRole, RegisterUserRecord } from "../types";

export const JWT_TOKEN = 'jwt_token';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});


let requestInterceptorId: number | undefined = undefined;

export const setAuthToken = (token: string) => {
  requestInterceptorId = axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const removeAuthToken = () => {
  if (requestInterceptorId) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
    requestInterceptorId = undefined;
  }
};

export const getAllRoles = async (): Promise<RegisterRole[]> =>    
  (await axiosInstance.get<RegisterRole[]>("/register/roles")).data

export const getAllUsers = async (): Promise<RegisterUserRecord[]> => 
   (await axiosInstance.get<RegisterUserRecord[]>("/register/users")).data

export const createUser = async (registerUser: RegisterUserRecord): Promise<string> => {
  return (await axiosInstance.post<string>("/register/users", registerUser)).data
};

/*
// Login logic
import { setAuthToken } from './api';

function handleLogin(token) {
  localStorage.setItem('token', token);
  setAuthToken(token);
}

// Logout logic
import { removeAuthToken } from './api';

function handleLogout() {
  localStorage.removeItem('token');
  removeAuthToken();
}

*/
