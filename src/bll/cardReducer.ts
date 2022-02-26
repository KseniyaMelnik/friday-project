import {AppThunkType} from "./store";
import {cardsAPI, CardsResponseType, CardType, GradeData} from "../dal/cardsAPI";
import { setAppStatusAC } from "./appReducer";
import { Dispatch } from "redux";


export const initialStateCard = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    packID: '620ea6cfb185f020a81a9f61',
    requestStatus: null as null | string,
    sortCards: '',
    searchField: '',
}

export type CardActionType = ReturnType<typeof setCards>
    | ReturnType<typeof changePackIDAC>
    | ReturnType<typeof setRequestStatusCardAC>
    | ReturnType<typeof changePageCount>
    | ReturnType<typeof setSortCards>
    | ReturnType<typeof setCardsPage>

export type CardReducerStateType = typeof initialStateCard

export const cardReducer = (state: CardReducerStateType = initialStateCard, action: CardActionType): CardReducerStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
        case "cards/CHANGE-PACK-ID":
        case "cards/CHANGE-PAGE-COUNT":
        case "cards/SET-SORT-CARDS":
        case "cards/SET-CARDS-PAGE":
            return {...state, ...action.payload}
        case "cards/SET-REQUEST-STATUS":
            return {...state, requestStatus: action.payload.requestStatus}

        default:
            return state
    }
}

export const setCards = (payload: CardsResponseType) => {
    return {type: "cards/SET-CARDS", payload} as const
}
export const changePackIDAC = (packID: string) => {
    return {type: "cards/CHANGE-PACK-ID", payload: {packID}} as const
}
export const changePageCount = (pageCount: number) => {
    return {type: "cards/CHANGE-PAGE-COUNT", payload: {pageCount}} as const
}
export const setCardsPage = (page: number) => {
    return {type: "cards/SET-CARDS-PAGE", payload: {page}} as const
}
export const setSortCards = (sortCards: string) => {
    return {type: "cards/SET-SORT-CARDS", payload: {sortCards}} as const
}

export const setRequestStatusCardAC = (requestStatus: string) => {
    return {type: "cards/SET-REQUEST-STATUS", payload: {requestStatus}} as const
}

export const getCards = (): AppThunkType =>
    async (dispatch: Dispatch, getState) => {
        const cards = getState().cards
        try {
            dispatch(setAppStatusAC('loading'))
            const res1 = await cardsAPI.getCards({
                cardsPack_id: cards.packID,
                //  cardAnswer:
                //  cardQuestion:
                // min: 1,
                //  max: 10,
                page: cards.page,
                pageCount: cards.pageCount,
                sortCards: cards.sortCards
            })
            dispatch(setCards(res1.data))
        } catch (error: any) {
            console.log(error)
        } finally {
            dispatch(setAppStatusAC('idle'))
        }
    }

export const createCardTC = (question: string, answer: string): AppThunkType =>
    async (dispatch, getState) => {
        const cards = getState().cards
        try {
            const res1 = await cardsAPI.createCard(cards.packID, question, answer)
            dispatch(getCards())
            dispatch(setRequestStatusCardAC('успешно'))
        } catch (e: any) {
            if (e.response) {
                dispatch(setRequestStatusCardAC('Ошибка: Колода не ВАША'))
            } else {
                dispatch(setRequestStatusCardAC('Проблема с интернет-соединением'))
            }
        }
    }

export const deleteCardTC = (cardID: string): AppThunkType =>
    async (dispatch) => {
        try {
            const res1 = await cardsAPI.deleteCard(cardID)
            dispatch(getCards())
            dispatch(setRequestStatusCardAC('успешный успех'))
        } catch (e: any) {
            if (e.response) {
                dispatch(setRequestStatusCardAC('Ошибка: Карта не ВАША'))
            } else {
                dispatch(setRequestStatusCardAC('Проблема с интернет-соединением'))
            }
        }
    }

export const updateCardTC = (cardID: string, newQuestion: string, newAnswer: string): AppThunkType =>
    async (dispatch) => {
        try {
            const res1 = await cardsAPI.updateCard(newQuestion, newAnswer, cardID)
            dispatch(getCards())
            dispatch(setRequestStatusCardAC('успешный успех'))
        } catch (e: any) {
            if (e.response) {
                dispatch(setRequestStatusCardAC('Ошибка: Карта не ВАША'))
            } else {
                dispatch(setRequestStatusCardAC('Проблема с интернет-соединением'))
            }
        }
    }

export const gradeAnswer = (payload: GradeData): AppThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await cardsAPI.grade(payload)
    } catch (error) {
       console.log(error)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}