import axios, {AxiosResponse} from "axios";

let instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const loginAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseDataType>>('auth/login', data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/me')
    },
    me() {
        return instance.post<AxiosResponse<ResponseDataType>>('auth/me')
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