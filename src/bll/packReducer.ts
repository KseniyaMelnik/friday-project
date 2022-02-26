import { Dispatch } from "redux";
import {CardPacksType, packsAPI, PacksResponseType} from "../dal/packsAPI";
import { setAppStatusAC } from "./appReducer";
import {AppThunkType} from "./store";

export const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 10,
    cardsValuesFromRange: [0, 1000],
    sortPacks: '',
    searchField: '',
    myId: '',
    requestStatus: null as null | string
}

export type PackActionType =
    ReturnType<typeof setSearchField>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setSortPacks>
    | ReturnType<typeof setPacks>
    | ReturnType<typeof setCardsCount>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setPacksFromRange>
    | ReturnType<typeof setMyPacks>
    | ReturnType<typeof setRequestStatusAC>


export type PackReducerStateType = typeof initialState

export const packReducer = (state: PackReducerStateType = initialState, action: PackActionType): PackReducerStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
        case "packs/SET-PAGE":
        case "packs/SET-SEARCH-PACK":
        case "packs/SET-PAGE-COUNT":
        case "packs/SET-SORT":
        case "packs/SET-PACKS-FROM-RANGE":
        case "packs/SET-MY-PACKS":
            return {...state, ...action.payload}
        case "packs/SET-REQUEST-STATUS":
            return {...state, requestStatus: action.payload.requestStatus}
        default:
            return state
    }
}

export const setPacks = (payload: PacksResponseType) => {
    return {type: "packs/SET-PACKS", payload} as const
}
export const setSearchField = (searchField: string) => {
    return {type: "packs/SET-SEARCH-PACK", payload: {searchField}} as const
}
export const setCardsCount = (cardsCount: number) => {
    return {type: "packs/SET-CARDS-COUNT", payload: {cardsCount}} as const
}
export const setPageCount = (pageCount: number) => {
    return {type: "packs/SET-PAGE-COUNT", payload: {pageCount}} as const
}
export const setPage = (page: number) => {
    return {type: "packs/SET-PAGE", payload: {page}} as const
}
export const setSortPacks = (sortPacks: string) => {
    return {type: 'packs/SET-SORT', payload: {sortPacks}} as const
}
export const setPacksFromRange = (cardsValuesFromRange: number[]) => {
    return {type: "packs/SET-PACKS-FROM-RANGE", payload: {cardsValuesFromRange}} as const
}
export const setMyPacks = (myId: string) => {
    return {type: "packs/SET-MY-PACKS", payload: {myId}} as const
}

export const setRequestStatusAC = (requestStatus: string) => {
    return {type: "packs/SET-REQUEST-STATUS", payload: {requestStatus}} as const
}

export const getPacks = (): AppThunkType =>
    async (dispatch: Dispatch, getState) => {
        const packs = getState().packs
        try {
            dispatch(setAppStatusAC('loading'))
            const res = await packsAPI.getPacks({
                page: packs.page,
                pageCount: packs.pageCount,
                min: packs.cardsValuesFromRange[0],
                max: packs.cardsValuesFromRange[1],
                user_id: packs.myId,
                sortPacks: packs.sortPacks,
                packName: packs.searchField
            })
            dispatch(setPacks(res.data))
        } catch (error: any) {
            console.log(error)
        } finally {
            dispatch(setAppStatusAC('idle'))
        }
    }

export const createPackTC = (nameNewPack: string): AppThunkType =>
    async (dispatch) => {
        try {
            const res = await packsAPI.createPack(nameNewPack)
            dispatch(getPacks())
            dispatch(setRequestStatusAC('успешный успех'))
        } catch (error: any) {
            dispatch(setRequestStatusAC('ошибка'))
        }
    }

export const deletePackTC = (packID: string): AppThunkType =>
    async (dispatch) => {
        try {
            const res = await packsAPI.deletePack(packID)
            dispatch(getPacks())
            dispatch(setRequestStatusAC('успешный успех'))
        } catch (e: any) {
            if(e.response) {
                dispatch(setRequestStatusAC('Ошибка: Это колода не принадлежит Вам'))
            } else {
                dispatch(setRequestStatusAC('Проблемы с интернет соединением'))
            }
        }
    }


export const updatePackTC = (packID: string, newNamePack: string): AppThunkType =>
    async (dispatch) => {
        try {
            const res = await packsAPI.updatePack(newNamePack, packID)
            dispatch(getPacks())
            dispatch(setRequestStatusAC('успешный успех'))
        } catch (e: any) {
            if(e.response) {
                dispatch(setRequestStatusAC('Ошибка: Это колода не принадлежит Вам'))
            } else {
                dispatch(setRequestStatusAC('Проблемы с интернет соединением'))
            }
        }
    }
