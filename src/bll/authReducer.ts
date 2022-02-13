import {loginAPI, LoginParamsType, ResponseDataType} from "../dal/loginApi/loginAPI";
import {Dispatch} from "redux";

const initialState = {
    data: {},
    isLoggedIn: false,
    authError: ''
}

type loginInitialStateType = typeof initialState
type LoginActionTypes =
    | ReturnType<typeof loginAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof setErrorAC>

export const authReducer = (state: loginInitialStateType = initialState, action: LoginActionTypes): loginInitialStateType => {
    switch (action.type) {
        case "LOGIN":
            return {...state, data: action.data}
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "LOGOUT":
            return {...state, data: {}}
        case "SET-ERROR":
            return {...state, authError: action.error}
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
export const setErrorAC = (error: string) => {
    return {type: "SET-ERROR", error} as const
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    loginAPI.login(data)
        .then(res => {
            if (res.data) {
                dispatch(loginAC(res.data))
                dispatch(setIsLoggedInAC(true))
            }
        })
        .catch(e => {
            if (e.response) {
                dispatch(setErrorAC(e.response.data.error))
                setTimeout(() => {
                    dispatch(setErrorAC(''))
                }, 3000)
            } else {
                dispatch(setErrorAC(e.message))
                setTimeout(() => {
                    dispatch(setErrorAC(''))
                }, 3000)
            }
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    loginAPI.logout()
        .then(res => {
            if (res.data) {
                dispatch(logoutAC())
                dispatch(setIsLoggedInAC(false))
            }
        })
        .catch(e => {
            if (e.response) {
                dispatch(setErrorAC(e.response.data.error))
            } else {
                dispatch(setErrorAC(e.message))
            }
        })
}
