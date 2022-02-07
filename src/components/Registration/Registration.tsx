import s from "./Registration.module.css"
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {signUpTC} from "../../store/registration-reducer";
import {AppRootStateType} from "../../store/store";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {validateEmail} from "../../utils/validators/validatorEmail";

export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const dispatch = useDispatch();
    const RegisterCallback = (
        () => dispatch(signUpTC(email, password, password2))
    )

    const isLoading = useSelector<AppRootStateType, boolean>( state => state.register.isLoading)
    const success = useSelector<AppRootStateType, boolean >(state=> state.register.success)
    const error = useSelector<AppRootStateType, null|string>(state => state.register.error)

    const errorEmail = validateEmail(email) ? "" : "Введите корректный email"

    const disabled = isLoading || !!errorEmail

    if (success) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <h2>It-incubator</h2>
            <p>Sign Up</p>
            {isLoading && <span> Loading </span>}
            <form className={s.form} action="">
                <div>
                    <SuperInputText type="email"
                                    placeholder={"Email"}
                                    value={email}
                                    onChangeText={setEmail}
                                    error={errorEmail}
                    />
                </div>
                <div>
                    <SuperInputText type="password"
                                    placeholder={"password"}
                                    value={password}
                                    onChangeText={setPassword}
                    />
                </div>
                <div>
                    <SuperInputText type="password"
                                    placeholder={"Confirm password"}
                                    value={password2}
                                    onChangeText={setPassword2}
                    />
                </div>
                <div>
                    <SuperButton type='button'
                                 onClick={RegisterCallback}
                                 disabled={disabled}>Register</SuperButton>
                </div>
            </form>
            {error? <span className={s.error}>{error}</span>: null}
        </div>
    )
}