import axios from "axios";

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    //baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
});

type RegisterParamsType = {
    email: string,
    password: string,
}

type RegisterDataType = {
    error: string;
}

export const RegisterAPI = {
    signUp (email: string, password: string) {
         return instance.post<RegisterParamsType, RegisterDataType>("/auth/register", {email, password});
    },
};