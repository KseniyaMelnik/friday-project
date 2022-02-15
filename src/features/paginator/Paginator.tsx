import React from "react"
import {useDispatch, useSelector } from "react-redux";
import {getPacks, setPage, setPageCount} from "../../bll/packReducer";
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
    const onSelectChanged = (pageCount: string) => {
        dispatch(setPageCount(Number(pageCount)))
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
        <p>Показывать
            <select onChange={(e)=> onSelectChanged(e.currentTarget.value)}>
                <option value="4">4</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="100">100</option>
            </select> колод на странице</p>
    </div>
}