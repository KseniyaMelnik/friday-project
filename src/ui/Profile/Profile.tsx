import React, {useEffect} from 'react';
import {logoutTC} from "../../bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {getPacks} from "../../bll/packReducer";
import {PackList} from "../PacksList/PacksList";
import {Paginator} from "../../features/paginator/Paginator";

export const Profile = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const onLogout = () => {
        dispatch(logoutTC())
    }
    useEffect(() => {
        dispatch(getPacks())
    }, [])

    if(!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Profile page
            <button onClick={onLogout}>log out</button>
            <PackList/>
            <Paginator />
        </div>
    )
}

