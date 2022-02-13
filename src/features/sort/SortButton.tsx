import React from "react";
import {useDispatch, useSelector } from "react-redux";
import s from "./SortButton.module.css"
import { AppRootStateType } from "../../bll/store";
import { setSort } from "../../bll/packReducer";

export const SortButton = () => {
    const sortByUpdated = useSelector<AppRootStateType, number>(state=> state.packs.sortByUpdated)
    const dispatch = useDispatch()
    const sortPacks = () => {
     sortByUpdated === 0 ? dispatch(setSort(1)) : dispatch(setSort(0))
        //dispatch(getPacks())
    }

    return <div className = {s.sortButton} onClick={sortPacks}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 6L0.669872 0L9.33013 0L5 6Z" fill="#2D2E46"/>
        </svg>
    </div>
}