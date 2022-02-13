import {Dispatch} from "redux";
import {loginAPI} from "../dal/loginApi/loginAPI";
import {setIsLoggedInAC} from "./authReducer";

const initialState = {
    searchPack: "",
    cardPacksTotalCount: 0,
    pageCount: 0,
    page: 1,
    sortByUpdated: 0
}

export type AppActionTypes = ReturnType<typeof setSearchPack> | ReturnType<typeof setPage> | ReturnType<typeof setSort>
export type PackReducerStateType = typeof initialState

export const packReducer = (state: PackReducerStateType = initialState, action: AppActionTypes): PackReducerStateType => {
    switch (action.type) {
        case "SET-SEARCH-PACK":
            return {...state, searchPack: action.searchPack}
        case "SET-PAGE":
            return {...state, page: action.page}
        case "SET-SORT":
            return {...state, sortByUpdated: action.num}
        default:
            return state
    }
}

export const setSearchPack = (searchPack: string) => {
    return {type: 'SET-SEARCH-PACK', searchPack} as const
}
export const setPage = (page: number) => {
    return {type: 'SET-PAGE', page} as const
}
export const setSort = (num: number) => {
    return {type: 'SET-SORT', num} as const
}


