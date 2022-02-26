import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "./ui/MainPage/MainPage";
import {Login} from "./ui/Login/Login";
import {Registration} from "./ui/Registration/Registration";
import {Error404} from "./ui/Eror404/Error404";
import {PasswordRecovery} from "./ui/Password/PasswordRecovery";
import {SetNewPassword} from "./ui/Password/SetNewPassword";
import {TransitionalPage} from "./ui/Password/TransitionalPage";
import {SuccessRecoveryPassword} from "./ui/Password/SuccessRecoveryPassword";
import {Profile} from "./ui/Profile/Profile";
import {initializeTC} from "./bll/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import loader from './assets/loader.svg'
import {Header} from "./componens/header/Header";
import {Packs} from "./ui/Packs/Packs";
import {Cards} from "./ui/Cards/Cards";
import {Learn} from './ui/Learn/Learn';

const App = () => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const myId = useSelector<AppRootStateType, string>(state=> state.login.userID)

    useEffect(() => {
        dispatch(initializeTC())
    }, [])
    
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <img src={loader} alt="loader"/>
        </div>
    }

    return (
        <div className="App">
            <div className="container">
                <Header/>

            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/password_recovery'} element={<PasswordRecovery/>}/>
                <Route path={'/set_new_password/:token'} element={<SetNewPassword/>}/>
                <Route path={'/transitional_page_for_recovery_pass'} element={<TransitionalPage/>}/>
                <Route path={'/password_recovery_success'} element={<SuccessRecoveryPassword/>}/>
                <Route path={'/packs'} element={<Packs />} />
                <Route path={'/cards/:cardsPack_id'} element={<Cards />} />
                <Route path={'/learn/:cardsPack_id/:name'} element={<Learn />} />
            </Routes>
            </div>
        </div>
    )
}

export default App;
