import React from "react"
import {useDispatch, useSelector } from "react-redux";
import {getPacks, setPage} from "../../bll/packReducer";
import { AppRootStateType } from "../../bll/store";
import s from "./Paginator.module.css"


export const Paginator = ()=> {
    const dispatch = useDispatch()

    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppRootStateType, number>(state=> state.packs.pageCount)
    const page = useSelector<AppRootStateType, number> (state => state.packs.page)

    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const onPageChanged = (p: number) => {
        dispatch(setPage(p))
        dispatch(getPacks())
    }
    return <div>
        {pages.map(p => <span
            className = {page === p ? s.active: ""}
            key={p}
            onClick={() => {
                onPageChanged(p)
            }}
        >{p}</span>)}
    </div>
}