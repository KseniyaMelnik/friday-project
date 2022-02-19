import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import {cardsAPI} from "../../dal/cardsAPI";
import {TableForCards} from "./TableForCards";
import {createCardTC, getCards} from "../../bll/cardReducer";

export const Cards = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch()

    const createNewCard = () => {
        dispatch(createCardTC())
    }

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }


    return (
        <div>
            Карты
            <div>
                <MainButton onClick={createNewCard}>Создать карту</MainButton>
            </div>
            <TableForCards/>

        </div>

    )
}