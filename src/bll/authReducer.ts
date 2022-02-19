import {loginAPI, ResponseDataType} from "../dal/loginAPI";
import {Dispatch} from "redux";
import avaStandart from '../assets/images/avatar.png'

const initialState = {
    name: '',
    userID: '',
    avatar: '',
    data: {},
    isLoggedIn: false,
    authError: '',
    isError: false,
    disabledButton: false
}

export type loginStateType = typeof initialState
type LoginActionTypes =
    | ReturnType<typeof loginAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof getUserDataAC>
    | ReturnType<typeof setButtonDisableAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setUserIDAC>

export const authReducer = (state: loginStateType = initialState, action: LoginActionTypes): loginStateType => {
    switch (action.type) {
        case "LOGIN":
            return {...state, data: action.data}
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "LOGOUT":
            return {...state, data: {}}
        case "SET-ERROR-MESSAGE":
            return {...state, authError: action.error}
        case "GET-USER-DATA":
            return {...state, name: action.userName, avatar: action.avatar}
        case "SET-BUTTON-CONDITION":
            return {...state, disabledButton: action.isDisabled}
        case "SET-ERROR":
            return {...state, isError: action.isError}
        case "SET-USER-ID":
            return {...state, userID: action.id}
        default:
            return state
    }
}

export const loginAC = (data: ResponseDataType) => {
    return {type: "LOGIN", data} as const
}
export const logoutAC = () => {
    return {type: "LOGOUT"} as const
}
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: "SET-IS-LOGGED-IN", isLoggedIn} as const
}
export const setErrorMessageAC = (error: string) => {
    return {type: "SET-ERROR-MESSAGE", error} as const
}
export const getUserDataAC = (userName: string) => {
    return {type: "GET-USER-DATA", userName, avatar: avaStandart} as const
}
export const setButtonDisableAC = (isDisabled: boolean) => {
    return {type: "SET-BUTTON-CONDITION", isDisabled} as const
}
export const setErrorAC = (isError: boolean) => {
    return {type: "SET-ERROR", isError} as const
}
export const setUserIDAC = (id: string) => {
    return {type: "SET-USER-ID", id} as const
}


export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setButtonDisableAC(true))
    loginAPI.login(email, password, rememberMe)
        .then(res => {
            if (res.data) {
                dispatch(loginAC(res.data))
                dispatch(setIsLoggedInAC(true))
                dispatch(setUserIDAC(res.data._id))
            }
        })
        .catch(e => {
            if (e.response) {
                dispatch(setErrorAC(true))
                dispatch(setErrorMessageAC('Вы ввели неверный логин или пароль'))
            } else {
                //dispatch(setErrorAC(e.message))
                dispatch(setErrorAC(true))
                dispatch(setErrorMessageAC('Проблема с интернет-соединением'))
            }
        })
        .finally( () => {
            dispatch(setButtonDisableAC(false))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setButtonDisableAC(true))
    loginAPI.logout()
        .then(res => {
            if (res.data) {
                dispatch(logoutAC())
                dispatch(setIsLoggedInAC(false))
                dispatch(setUserIDAC(""))
            }
        })
        .catch(e => {
            if (e.response) {
                dispatch(setErrorAC(true))
                dispatch(setErrorMessageAC('Проблема при работе с сервером'))
            } else {
                dispatch(setErrorAC(true))
                dispatch(setErrorMessageAC('Проблема с интернет-соединением'))
            }
        })
        .finally( () => {
            dispatch(setButtonDisableAC(false))
        })
}

export const getUserDataTC = () => (dispatch: Dispatch) => {
    loginAPI.me()
        .then(res => {
            let userName = res.data.email
            dispatch(getUserDataAC(userName))
            dispatch(setUserIDAC(res.data._id))
        })
        .catch(e => {
            if (e.response) {
                dispatch(setErrorAC(true))
                dispatch(setErrorMessageAC('Проблема при работе с сервером'))
            } else {
                dispatch(setErrorAC(true))
                dispatch(setErrorMessageAC('Проблема с интернет-соединением'))
            }
        })
}
