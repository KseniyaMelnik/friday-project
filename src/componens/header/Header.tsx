import {NavLink} from "react-router-dom";
import LogoTitle from "../logoTitle/LogoTitle";
import s from "./Header.module.css";


export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.logo}>
                <LogoTitle/>
            </div>
            <div className={s.menu}>
                <NavLink to={'/'} style={({ isActive }) =>({color: isActive ? 'blue' : '#2D2E46'})}>Главная </NavLink>
                <NavLink to={'/profile'} style={({ isActive }) =>({color: isActive ? 'blue' : '#2D2E46'})}>Профиль </NavLink>
                <NavLink to={'/packs'} style={({ isActive }) =>({color: isActive ? 'blue' : '#2D2E46'})}>Колоды </NavLink>
                <NavLink to={'/cards/:cardsPack_id'} style={({ isActive }) =>({color: isActive ? 'blue' : '#2D2E46'})}>Карточки </NavLink>
                <NavLink to={'/login'} style={({ isActive }) =>({color: isActive ? 'blue' : '#2D2E46'})}>Логинизация </NavLink>
                <NavLink to={'/registration'} style={({ isActive }) =>({color: isActive ? 'blue' : '#2D2E46'})}>Регистрация </NavLink>
                <NavLink to={'/password_recovery'} style={({ isActive }) =>({color: isActive ? 'blue' : '#2D2E46'})}>Восстановление пароля </NavLink>
            </div>
        </div>

    )
}