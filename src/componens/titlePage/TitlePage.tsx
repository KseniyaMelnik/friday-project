// import React from "react";
import { isPropertySignature } from "typescript";
import s from './TitlePage.module.css';

const TitlePage= (props:any) => {

    return ( 
        <div className={s.titlePage}>
            <h2 className={s.title}>{props.title}</h2>
            
        </div>    
    )
    }

export default TitlePage