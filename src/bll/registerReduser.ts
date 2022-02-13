import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {RegisterAPI} from "../dal/register-api";

export const initialState = {
    error: null as null | string,
    success: false,
    isLoading: false
};
type RegisterStateType = typeof initialState

export const registerReducer = (state: RegisterStateType = initialState, action: ActionsType): RegisterStateType => {
    switch (action.type) {
        case "register/SET_ERROR":
            return {
                ...state, error: action.error
            }
        case "register/SET_SUCCESS":
            return {
                ...state, success: action.success
            }
        case "register/SET_IS_LOADING":
            return {
                ...state, isLoading: action.isLoading
            }
        default:
            return state
    }
}
// actions
export const setErrorAC = (error: string) => ({
    type: "register/SET_ERROR", error
} as const)

export const setSuccessAC = (success: boolean) => ({
    type: "register/SET_SUCCESS", success
} as const)

export const setISLoadingAC = (isLoading: boolean) => ({
    type: "register/SET_IS_LOADING", isLoading
} as const)

type ActionsType = ReturnType<typeof setSuccessAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setISLoadingAC>

// thunk
export const signUpTC = (email: string, password: string, password2: string): ThunkType => async (
    dispatch) => {
    if (password !== password2) {
        dispatch(setErrorAC('Passwords don\'t match'))
    } else {
        try {
            dispatch(setISLoadingAC(true))
            await RegisterAPI.signUp(email, password)
            dispatch(setSuccessAC(true))
        } catch (error: any) {
            const err = error.response ? error.response.data.error : error.message
            dispatch(setErrorAC(err))
        } finally {
            dispatch(setISLoadingAC(false))
        }
    }
}
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>
