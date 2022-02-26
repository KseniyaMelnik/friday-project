import React, {useEffect} from 'react';
import s from "./Profile.module.css";
import {getUserDataTC, logoutTC} from "../../bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import CancelButton from "../../componens/canсelButton/CancelButton";
import TitlePage from '../../componens/titlePage/TitlePage';
import {Search} from '../features/search/Search';
import {getPacks} from '../../bll/packReducer';


export const Profile = () => {  
    const userName = useSelector<AppRootStateType, string>(state => state.login.name)
    const userPhoto = useSelector<AppRootStateType, string>(state => state.login.avatar)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userID = useSelector<AppRootStateType, string>(state=> state.login.userID)
    const disabledButton = useSelector<AppRootStateType, boolean>(state => state.login.disabledButton)
    const authError = useSelector<AppRootStateType, string>(state => state.login.authError)

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])

    useEffect(()=>{
        localStorage.setItem("myId", userID);
    },[userID])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }
    return (
        <div className={s.profile}>
            <div className={s.container}>
                <aside className={s.aside}>
                    <div className={s.asideProf}>
                        <img className={s.avatar} src={userPhoto}/>
                        <h3 className={s.name}>{userName}</h3>
                        <span className={s.profession}>Front-end-developer</span>
                    </div>
                    <div className={s.ranch}>
                        <h3 className={s.subTitle}>Количество карт</h3>
                        
                    </div>
                    
                </aside>
                
                <div className={s.content}>
                    <TitlePage title={'Эта страница еще в разработке...'}/>
                    <Search getSearchData={getPacks} searchField={''} setSearchField={()=>{}}/>
                    {/* <InputSearch style={{width: '100%'}} ></InputSearch> */}
                    <div className={s.table}></div>
                    <p>{authError}</p>
                    <CancelButton onClick={onLogout} disabled={disabledButton}>Выйти</CancelButton>
                </div>
            </div>           
        </div>
    )
}