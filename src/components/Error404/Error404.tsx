import React from 'react'
import s from './Error404.module.css'

function Error404() {
    return (
        <div className={s.container}>
            <div className={s.text}>Oops, this page does not exist</div>
        </div>
    )
}

export default Error404
