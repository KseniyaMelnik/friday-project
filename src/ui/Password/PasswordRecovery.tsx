import s from './PasswordRecovery.module.css';
import {ChangeEvent, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import { passwordRecoveryTC, setErrorAC} from "../../bll/recoveryPasswordReducer";
import InputText from "../../componens/inputText/InputText";
import MainButton from "../../componens/mainButton/MainButton";
import LogoTitle from "../../componens/logoTitle/LogoTitle";


export const PasswordRecovery = () => {

    const error = useSelector<AppRootStateType, boolean>(state => state.password.error)
    const disabledButton = useSelector<AppRootStateType, boolean>(state => state.password.disabledButton)
    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.password.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string>(state => state.password.errorMessage)

    const dispatch = useDispatch()


    const [emailAddressField, setEmailAddressField] = useState('')
    const changeEmailAddressField = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailAddressField(e.currentTarget.value)
        dispatch(setErrorAC(false))
    }

    const sendEmailToServer = () => {
        dispatch(passwordRecoveryTC(emailAddressField))
        setEmailAddressField('')
    }

    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate('/login', { replace: true })
    }

    if (isSuccess) {
        return <Navigate to={`/transitional_page_for_recovery_pass`}/>;
    }

    return (
        <div className={s.passwordRecovery}>
            <LogoTitle/>
            {/* <TitlePage>Забыли пароль?</TitlePage> */}
            <h3 className={s.title}>Забыли пароль?</h3>
            {/* <p className={s.text}>Укажите email</p> */}
            {error
                ? <InputText value={emailAddressField} onChange={changeEmailAddressField} error={errorMessage}/>
                : <InputText value={emailAddressField} onChange={changeEmailAddressField}/>
            }
            <p className={s.text}>Пожалуйста укажите email, который вы использовали для входа на сайт</p>
            <MainButton className={s.button} onClick={sendEmailToServer} disabled={disabledButton}>Далее</MainButton>
            <div className={s.wrapLink}><a className={s.link} onClick={redirectToLogin}>Я вспомнил свой логин и пароль</a></div>

        </div>
    )
}