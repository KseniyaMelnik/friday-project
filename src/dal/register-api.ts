import {instance} from "./API";

type RegisterResponseType = {
    addedUser: {}
    error?: string
}

export const RegisterAPI = {
    signUp (email: string, password: string) {
         return instance.post<RegisterResponseType>("/auth/register", {email, password});
    },
};

