import React, { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import s from "./SortButton.module.css"
import { AppRootStateType } from "../../../bll/store";


type SortButtonPropsType = {
    value: string
    sortItems: (sortValue: string) => void
}

export const SortButton = ({value, sortItems} : SortButtonPropsType) => {

    const [sort, setSort] = useState<boolean>(false)

    const onSortClick = () => {
        setSort(!sort)
        sort
            ? sortItems(`0${value}`)
            : sortItems(`1${value}`)
    }


    return <span className = {s.sortButton} onClick={onSortClick}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 6L0.669872 0L9.33013 0L5 6Z" fill="#2D2E46"/>
        </svg>
    </span>
}