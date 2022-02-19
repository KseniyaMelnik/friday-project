import s from "./SetNewPassword.module.css";
import React, {ChangeEvent, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {createNewPasswordTC, setErrorAC} from "../../bll/recoveryPasswordReducer";
import MainButton from "../../componens/mainButton/MainButton";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import InputPassword from "../../componens/InputPassword/InputPassword";


export const SetNewPassword = () => {

    const error = useSelector<AppRootStateType, boolean>(state => state.password.error)
    const disabledButton = useSelector<AppRootStateType, boolean>(state => state.password.disabledButton)
    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.password.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string>(state => state.password.errorMessage)

    const [newPasswordField1, setNewPasswordField1] = useState('')
    const [newPasswordField2, setNewPasswordField2] = useState('')


    const changeNewPasswordField1 = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPasswordField1(e.currentTarget.value)
        dispatch(setErrorAC(false))
    }

    const changeNewPasswordField2 = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPasswordField2(e.currentTarget.value)
        dispatch(setErrorAC(false))
    }

    const dispatch = useDispatch()
    const {token} = useParams<'token'>()

    const createNewPasswordHandler = () => {
        dispatch(createNewPasswordTC(newPasswordField1, newPasswordField2, token || ''))
        setNewPasswordField1('')
        setNewPasswordField2('')
    }

    if (isSuccess) {
        return <Navigate to={'/password_recovery_success'}/>;
    }

    return (
        <div className={s.setNewPassword}>
            <LogoTitle/>
            <h4 className={s.title}>Создание нового пароля</h4>
            {error
                ? <InputPassword title="Password" value={newPasswordField1} onChange={changeNewPasswordField1}
                                 error={errorMessage}/>
                : <InputPassword title="Password" value={newPasswordField1} onChange={changeNewPasswordField1}/>
            }

            <InputPassword title="Confirm password" value={newPasswordField2} onChange={changeNewPasswordField2}/>
            <p className={s.text}>Введите новый пароль и постарайтесь его не забыть)</p>
            <MainButton className={s.button} onClick={createNewPasswordHandler} disabled={disabledButton}>Создать новый
                пароль</MainButton>
        </div>
    )
}