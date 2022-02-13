import {Dispatch} from "redux";
import {loginAPI} from "../dal/loginApi/loginAPI";
import {setIsLoggedInAC} from "./authReducer";

const initialState = {
    isInitialized: false
}

export type AppActionTypes = ReturnType<typeof setInitializedAC> | ReturnType<typeof setIsLoggedInAC>
export type AppReducerStateType = typeof initialState

export const appReducer = (state: AppReducerStateType = initialState, action: AppActionTypes): AppReducerStateType => {
    switch (action.type) {
        case "SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setInitializedAC = (isInitialized: boolean) => {
    return {type: 'SET-INITIALIZED', isInitialized} as const
}

export const initializeTC = () => (dispatch: Dispatch<AppActionTypes>) => {
    loginAPI.me()
        .then(() => {
                dispatch(setIsLoggedInAC(true))
        })
        .finally(() => {
            dispatch(setInitializedAC(true))
        })
}
