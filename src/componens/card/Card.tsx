import React from "react";
import s from './Card.module.css';



export const Card = (props: any) => {
    return (
        <div className={s.card}>
            <div className={s.container}>
                <h1 className={s.logo}>It-incubator</h1> 
                <h2 className={s.title}>{props.title}</h2>
                <div className={s.content}>
                    {/* <SuperInputText title="Email"></SuperInputText> 
                    <InputPassword title="Password"></InputPassword>
                    <SuperButton>Login</SuperButton>  */}
                </div>                                            
            </div>    
        </div>
    )
}