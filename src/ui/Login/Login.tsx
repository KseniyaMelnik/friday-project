import {Link, Navigate} from "react-router-dom";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC, setErrorAC, setErrorMessageAC} from "../../bll/authReducer";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import InputText from "../../componens/inputText/InputText";
import InputPassword from "../../componens/InputPassword/InputPassword";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import TitlePage from "../../componens/titlePage/TitlePage";
import s from './Login.module.css';


export const Login = () => {

    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [rememberMeField, setRememberMeField] = useState(false)

    const changeEmailField = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailField(e.currentTarget.value)
        dispatch(setErrorAC(false))
        dispatch(setErrorMessageAC(''))
    }
    const changePasswordField = (e: ChangeEvent<HTMLInputElement>) => setPasswordField(e.currentTarget.value)
    const changeRememberMeField = (e: ChangeEvent<HTMLInputElement>) => setRememberMeField(e.currentTarget.checked)


    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const authError = useSelector<AppRootStateType, string>(state => state.login.authError)
    const isError = useSelector<AppRootStateType, boolean>(state => state.login.isError)
    const disabledButton = useSelector<AppRootStateType, boolean>(state => state.login.disabledButton)
    const dispatch = useDispatch()

    const onSubmit = () => {
        setPasswordField('')
        setEmailField('')
        dispatch(loginTC(emailField, passwordField, rememberMeField))
    }

    const onKeyPressSendEmailToServer = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setPasswordField('')
            setEmailField('')
            dispatch(loginTC(emailField, passwordField, rememberMeField))
        }
    }

    if (isLogged) {
        return <Navigate to="/profile"/>
    }

    return (
        <div className={s.login}>
            <div className={s.container}>
                <LogoTitle/>
                <TitlePage title="Авторизация"/>

                {isError
                    ? <InputText value={emailField} onChange={changeEmailField} error={authError}/>
                    :
                    <InputText value={emailField} onChange={changeEmailField} onKeyPress={onKeyPressSendEmailToServer}/>
                }

                <InputPassword title='Password' value={passwordField}
                               onChange={changePasswordField}
                               onKeyPress={onKeyPressSendEmailToServer}/>

                <div className={s.controlPas}>
                    <div className={s.remember}>
                        <label className={s.rememberLabel}>Запомнить пароль</label>
                        <input className={s.rememberCheckbox} type="checkbox" checked={rememberMeField}
                               onChange={changeRememberMeField}/>
                    </div>
                    <div className={s.forgot}>
                        <Link className={s.link} to='/password_recovery'>Забыли пароль</Link>
                    </div>
                </div>

                <div>
                    <MainButton className={s.mainButton} onClick={onSubmit} disabled={disabledButton}>Войти</MainButton>
                    <p><span className={s.loginSpan}>Нет аккаунта?</span></p>
                    <Link className={s.singLink} to="/registration">Зарегистрируйся</Link>
                </div>
            </div>
        </div>
    )
}