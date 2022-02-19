import React, {ChangeEvent, useState} from "react"
import {getPacks, setPage, setPageCount} from "../../../bll/packReducer";
import {AppRootStateType} from "../../../bll/store";
import s from "./SelectPageSize.module.css"

type SelectPageSizePropsType = {
    selectedPageSize: number
    changePageSize: (option: number) => void
    pageSizes: number[]
}

export const SelectPageSize = ({pageSizes, selectedPageSize, changePageSize}: SelectPageSizePropsType) => {

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const option = +e.currentTarget.value
        changePageSize(option)
    }
    const mappedOptions = pageSizes.map((o, i) => (
        <option key={i} value={o}>
            {o}
        </option>
    ))

    return <span className={s.selectPageSize}>Показывать
            <select onChange={onSelectChange} value={selectedPageSize}>
                {mappedOptions}
            </select> колод на странице
        </span>
}