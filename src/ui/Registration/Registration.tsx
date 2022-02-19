import s from "./Registration.module.css"
import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate, useNavigate} from "react-router-dom";
import {validateEmail, validatePassword} from "../../utils/validators/validator";
import InputText from "../../componens/inputText/InputText";
import MainButton from "../../componens/mainButton/MainButton";
import {signUpTC} from "../../bll/registerReduser";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import InputPassword from "../../componens/InputPassword/InputPassword";
import CancelButton from "../../componens/canсelButton/CancelButton";
import TitlePage from "../../componens/titlePage/TitlePage";


export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorPassword2, setErrorPassword2] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RegisterCallback = (
        () => {
            dispatch(signUpTC(email, password, password2))
        }
    )
    const CancelCallback = () => {
        navigate('/login', {replace: true})
    }

    const success = useSelector<AppRootStateType, boolean>(state => state.register.success)
    const error = useSelector<AppRootStateType, null | string>(state => state.register.error)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.register.isLoading)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        let email = e.currentTarget.value
        setEmail(email)
        let error = validateEmail(email) ? "" : "Введите корректный email"
        setErrorEmail(error)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        let password = e.currentTarget.value
        setPassword(password)
        let error = validatePassword(password) ? "" : "Пароль должен содержать не менее 8 символов"
        setErrorPassword(error)
    }

    const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => {
        let password2 = e.currentTarget.value
        setPassword2(password2)
        let error = (password2 === password) ? '' : 'Пароли не совпадают'
        setErrorPassword2(error)
    }

    const disabled = isLoading || !!errorEmail || !!errorPassword

    if (isLogged) {
        return <Navigate to="/profile"/>
    }

    if (success) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.registration}>
            <LogoTitle/>
            <TitlePage title='Регистрация'/>
            {isLoading ? <span> Loading...</span> : null}
            <form className={s.form} action="">
                <InputText type="email"
                           value={email}
                           onChange={onChangeEmail}
                           error={errorEmail}
                />
                <InputPassword title='Password'
                               value={password}
                               onChange={onChangePassword}
                               error={errorPassword}
                />
                <InputPassword title="Повторите password"
                               value={password2}
                               onChange={onChangePassword2}
                               error={errorPassword2}
                />
                <div className={s.btnContainer}>
                    <CancelButton
                        onClick={CancelCallback}>Отмена</CancelButton>
                    <MainButton
                        type='button'
                        onClick={RegisterCallback}
                        disabled={disabled}
                        style={{width: '186px'}}>Зарегистрироваться </MainButton>
                </div>
            </form>
            {error ? <span className={s.error}>{error}</span> : null}
        </div>
    )
}