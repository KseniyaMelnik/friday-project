import {instance} from "./instance";

type RegisterResponseType = {
    addedUser: {}
    error?: string
}

export const RegisterApi = {
    signUp (email: string, password: string) {
         return instance.post<RegisterResponseType>("/auth/register", {email, password});
    },
};

