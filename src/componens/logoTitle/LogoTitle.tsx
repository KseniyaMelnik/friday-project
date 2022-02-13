import React from "react";
import s from './LogoTitle.module.css';



const LogoTitle: React.FC = ({children}) => {

    return ( 
        <div className={s.logoTitle}>
            <h2 className={s.title}>It-incubator</h2>
            {children}
        </div>    
    )
    }

export default LogoTitle