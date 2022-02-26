import {Dispatch} from "redux";
import {setIsLoggedInAC, setUserIDAC} from "./authReducer";
import {loginAPI} from "../dal/loginAPI";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    isInitialized: false
}

export type AppActionTypes = ReturnType<typeof setInitializedAC> | ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setUserIDAC> | ReturnType<typeof setAppStatusAC>
export type AppReducerStateType = typeof initialState

export const appReducer = (state: AppReducerStateType = initialState, action: AppActionTypes): AppReducerStateType => {
    switch (action.type) {
        case "SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        case "SET-APP-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setInitializedAC = (isInitialized: boolean) => {
    return {type: 'SET-INITIALIZED', isInitialized} as const
}
export const setAppStatusAC = (status: RequestStatusType ) => {
    return {type: 'SET-APP-STATUS', status} as const
}

export const initializeTC = () => (dispatch: Dispatch<AppActionTypes>) => {
    loginAPI.me()
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserIDAC(res.data._id))
        })
        .finally(() => {
            dispatch(setInitializedAC(true))
        })
}
