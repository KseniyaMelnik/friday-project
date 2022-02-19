import {AxiosResponse} from "axios";
import {instance} from "./instance";

export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseDataType>>('auth/login', {
            email,
            password,
            rememberMe
        })
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/me')
    },
    me() {
        return instance.post<ResponseDataType>('auth/me')
    }
}

export type LogoutResponseType = {
    info: string
    error: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type ResponseDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;

    error?: string;
}