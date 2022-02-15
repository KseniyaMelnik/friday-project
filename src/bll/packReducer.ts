import {packsAPI} from "../api/packsAPI";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";

const initialCardPacks: packType[] = [
    {_id: "1" , _user_id: "1", cardsCount: 12, created: "01/01/2021", name: "Ksu", updated: "Ksu"},
    {_id: "2" , _user_id: "2", cardsCount: 5, created: "01/01/2021", name: "Ksu", updated: "Ksu"},
    {_id: "3" , _user_id: "3", cardsCount: 10, created: "01/02/2021", name: "Stas", updated: "Stas"}
]

const initialState = {
    searchPack: "",
    cardPacksTotalCount: 0,
    pageCount: 10,
    page: 1,
    sortByUpdated: 0,
    cardPacks: [] as Array<packType>
}
export type packType = {
    _id: string,
    _user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string
}

export type ActionTypes = ReturnType<typeof setSearchPack> | ReturnType<typeof setPage> | ReturnType<typeof setSort> | ReturnType<typeof setPacks>
| ReturnType<typeof setCardsCount> | ReturnType<typeof setPageCount>

export type PackReducerStateType = typeof initialState

export const packReducer = (state: PackReducerStateType = initialState, action: ActionTypes): PackReducerStateType => {
    switch (action.type) {
        case "SET-PACKS":
            return {...state, cardPacks: action.cardPacks}
        case "SET-SEARCH-PACK":
            return {...state, searchPack: action.searchPack}
        case "SET-CARDS-COUNT":
            return {...state, cardPacksTotalCount: action.cardsCount}
        case "SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "SET-PAGE":
            return {...state, page: action.page}
        case "SET-SORT":
            return {...state, sortByUpdated: action.num}
        default:
            return state
    }
}

export const setPacks = (cardPacks: packType[]) => {
    return {type: 'SET-PACKS', cardPacks} as const
}
export const setSearchPack = (searchPack: string) => {
    return {type: 'SET-SEARCH-PACK', searchPack} as const
}
export const setCardsCount = (cardsCount: number) => {
    return {type: 'SET-CARDS-COUNT', cardsCount} as const
}
export const setPageCount = (pageCount: number) => {
    return {type: 'SET-PAGE-COUNT', pageCount} as const
}
export const setPage = (page: number) => {
    return {type: 'SET-PAGE', page} as const
}
export const setSort = (num: number) => {
    return {type: 'SET-SORT', num} as const
}

export const getPacks = (): ThunkType =>

    async (dispatch, getState) => {
    const packs = getState().packs
    try {
        const data = await packsAPI.getPacks({
            page: packs.page,
            pageCount: packs.pageCount,
            min: packs.cardsValuesFromRange[0],
            max: packs.cardsValuesFromRange[1],
            user_id: packs.myId,
            sortPacks: packs.sortPacks,
            packName: packs.searchField
        })
        dispatch(setPacks(data.data.cardPacks))
        dispatch(setPageCount(data.data.pageCount))
        dispatch(setCardsCount(data.data.cardPacksTotalCount))
    } catch (error: any) {
        const err = error.response ? error.response.data.error : error.message
    }
}

type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionTypes>
