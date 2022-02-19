import React, {useEffect} from 'react';
import {getUserDataTC, logoutTC} from "../../bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import CancelButton from "../../componens/canсelButton/CancelButton";

export const Profile = () => {

    const userName = useSelector<AppRootStateType, string>(state => state.login.name)
    const userPhoto = useSelector<AppRootStateType, string>(state => state.login.avatar)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const disabledButton = useSelector<AppRootStateType, boolean>(state => state.login.disabledButton)
    const authError = useSelector<AppRootStateType, string>(state => state.login.authError)

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }
    return (
        <div>
            Этот профиль принадлежит
            <div>{userName}</div>
            <img src={userPhoto}/>
            <p>{authError}</p>
            <div><CancelButton onClick={onLogout} disabled={disabledButton}>log out</CancelButton></div>


        </div>
    )
}