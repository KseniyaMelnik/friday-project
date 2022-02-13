import React from "react";
import s from "./SuccessRecovery.module.css";
import LogoTitle from "./../../componens/logoTitle/LogoTitle";
import letter from "./../../assets/images/Group 281.png";

export const SuccessRecoveryPassword = () => {
    return (
        <div className={s.successRecovery}>
            <LogoTitle/>
            <img className={s.img} src={letter}/>
            <h4 className={s.title}>Вы успешно создали новый пароль</h4>
            <a className={s.link} href={'/login'}>Перейти на страницу логинизации</a>
        </div>
    )


}