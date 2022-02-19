import {Dispatch} from "redux";
import {ForgotPasswordAPI} from "../dal/passwordRecoveryAPI";


type InitialStateType = {
    error: boolean
    disabledButton: boolean
    isSuccess: boolean
    errorMessage: string
}

const initialState: InitialStateType = {
    error: false,
    disabledButton: false,
    isSuccess: false,
    errorMessage: ''
}

export const RecoveryPasswordReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "Password/SET-ERROR": {
            return {...state, error: action.isError}
        }
        case "Password/SET-BUTTON-CONDITION": {
            return {...state, disabledButton: action.isDisabled}
        }
        case "Password/SET-SUCCESS": {
            return {...state, isSuccess: action.value}
        }
        case "Password/SET-ERROR-TEXT": {
            return {...state, errorMessage: action.errorMessage}
        }
        default:
            return state;
    }
}

export const setErrorAC = (isError: boolean) => {
    return {
        type: 'Password/SET-ERROR',
        isError: isError
    } as const
}

export const setButtonDisable = (isDisabled: boolean) => {
    return {
        type: 'Password/SET-BUTTON-CONDITION',
        isDisabled: isDisabled
    } as const
}

export const setIsisSuccess = (value: boolean) => {
    return {
        type: 'Password/SET-SUCCESS',
        value: value
    } as const
}

export const setErrorMessage = (errorMessage: string) => {
    return {
        type: 'Password/SET-ERROR-TEXT',
        errorMessage: errorMessage
    } as const
}
type SetIsSuccessActionType = ReturnType<typeof setIsisSuccess>
type SetButtonConditionActionType = ReturnType<typeof setButtonDisable>
type SetErrorActionType = ReturnType<typeof setErrorAC>
type SetErrorMessageActionType = ReturnType<typeof setErrorMessage>

type ActionsType =
    SetErrorActionType
    | SetButtonConditionActionType
    | SetIsSuccessActionType
    | SetErrorMessageActionType


//thunks

export const passwordRecoveryTC = (email: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setButtonDisable(true))
        ForgotPasswordAPI.forgotPassword(email)
            .then((res) => {
                dispatch(setIsisSuccess(true))
                dispatch(setErrorMessage(''))
            })
            .catch(er => {
                if (er.response) {
                     dispatch(setErrorAC(true))
                     dispatch(setErrorMessage('Вы вводите неверные данные'))
                } else {
                    dispatch(setErrorAC(true))
                    dispatch(setErrorMessage('Проблема с интернет-соединением'))
                }
            })
            .finally(() => {
                    dispatch(setButtonDisable(false))
                }
            )
    }
}

export const createNewPasswordTC = (newPasswordField1: string, newPasswordField2: string, token: string | undefined) => {
    return (dispatch: Dispatch) => {
        if (newPasswordField1 === newPasswordField2) {
            dispatch(setButtonDisable(true))
            ForgotPasswordAPI.setNewPassword(newPasswordField1, token || '')
                .then((res) => {
                    dispatch(setButtonDisable(false))
                    dispatch(setIsisSuccess(true))
                    dispatch(setErrorMessage(''))
                })
                .catch((err: any) => {
                    dispatch(setErrorAC(true))
                    dispatch(setButtonDisable(false))
                    dispatch(setErrorMessage('Пароль должен содержать не менее 8 символов'))
                })
        } else {
            dispatch(setErrorAC(true))
            dispatch(setErrorMessage('Вы вводите разные пароли в поля'))
        }
    }
}