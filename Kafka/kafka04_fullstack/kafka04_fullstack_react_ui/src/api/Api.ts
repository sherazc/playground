import axios, { AxiosInstance } from "axios";
import { RegisterUser } from "../types";

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


export const getAllUsers = async (): Promise<RegisterUser[]> => {
  return (await axiosInstance.get<RegisterUser[]>("/register/users")).data
};

export const createUser = async (registerUser: RegisterUser): Promise<string> => {
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