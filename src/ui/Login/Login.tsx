import {Link, Navigate} from "react-router-dom";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/authReducer";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import InputText from "../../componens/inputText/InputText";
import InputPassword from "../../componens/InputPassword/InputPassword";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import TitlePage from "../../componens/titlePage/TitlePage";
import s from './Login.module.css'
import {validateEmail, validatePassword} from "../../utils/validators/validator";

const initialState = {
    email: '',
    password: '',
    rememberMe: false,
}

const errorState = {
    email: '',
    password: '',
}

export const Login = () => {
    const [values, setValues] = useState({...initialState})
    const [type, setType] = useState<boolean>(false)
    const [error, setError] = useState({...errorState})

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const authError = useSelector<AppRootStateType, string>(state => state.login.authError)
    const dispatch = useDispatch()

    const onSubmit = () => {
        dispatch(loginTC(values))
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit()
        }
    }

    let inputType = type ? 'text' : 'password'

    const handleHidePassword = () => {
        setType(!type)
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        let value = field === 'rememberMe' ? e.currentTarget.checked : e.currentTarget.value

        setValues({
            ...values,
            [field]: field === 'rememberMe' ? e.currentTarget.checked : e.currentTarget.value
        })

        if (field === 'email') {
            let err = validateEmail(e.currentTarget.value) ? "" : "Введите корректный email"
            setError({
                ...error,
                [field]: err
            })
        }

        if (field === 'password') {
            let err = validatePassword(e.currentTarget.value) ? "" : "Введите корректный пароль"
            setError({
                ...error,
                [field]: err
            })
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
                <InputText type="text" value={values.email}
                                onChange={e => onChangeValue(e, 'email')}/>
                <InputPassword type="password" title='Password' value={values.password}
                                onChange={e => onChangeValue(e, 'password')}/>


            <div className={s.controlPas}>
                <div className={s.remember}>
                    <label className={s.rememberLabel}>Запомнить пароль</label>
                    <input className={s.rememberCheckbox} type="checkbox" checked={values.rememberMe}
                        onChange={e => onChangeValue(e, 'rememberMe')}/>
                </div>
                <div className={s.forgot}>
                    <Link className={s.link} to='/password_recovery'>Забыл пароль</Link>
                </div>
            </div>

            <div>
                <MainButton className={s.mainButton} onClick={onSubmit}>Войти</MainButton>
                <p><span className={s.loginSpan}>Нет аккаунта?</span></p>
                <Link className={s.singLink} to="/registration">Зарегистрируйся</Link>
            </div>
            </div>
        </div>
    )
}