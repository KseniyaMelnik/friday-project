import {AppThunkType} from "./store";
import {cardsAPI, CardsResponseType, CardType} from "../dal/cardsAPI";


export const initialStateCard = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: '',
    packID: '620ea6cfb185f020a81a9f61'
}

export type CardActionType = ReturnType<typeof setCards> | ReturnType<typeof changePackIDAC>

export type CardReducerStateType = typeof initialStateCard

export const cardReducer = (state: CardReducerStateType = initialStateCard, action: CardActionType): CardReducerStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, ...action.payload}
        case "cards/CHANGE-PACK-ID":
            return {...state, packID: action.packID}
        default:
            return state
    }
}

export const setCards = (payload: CardsResponseType) => {
    return {type: "cards/SET-CARDS", payload} as const
}
export const changePackIDAC = (packID: string) => {
    return {type: "cards/CHANGE-PACK-ID", packID} as const
}

export const getCards = (): AppThunkType =>
    async (dispatch, getState) => {
        const cards = getState().cards
        try {
            const res1 = await cardsAPI.getCards({
                cardsPack_id: cards.packID,
                //  cardAnswer:
                //  cardQuestion:
                // min: 1,
                // max: 10,
                // page: cards.page,
                // pageCount: cards.pageCount,
                //  sortCards:
            })
            dispatch(setCards(res1.data))
        } catch (error: any) {
            console.log(error)
        }
    }

export const createCardTC = (): AppThunkType =>
    async (dispatch, getState) => {
        const cards = getState().cards
        try {
            const res1 = await cardsAPI.createCard(cards.packID)
            dispatch(getCards())
        } catch (error: any) {
            console.log(error)
        }
    }

export const deleteCardTC = (cardID: string): AppThunkType =>
    async (dispatch) => {
        try {
            const res1 = await cardsAPI.deleteCard(cardID)
            dispatch(getCards())
        } catch (error: any) {
            console.log(error)
        }
    }

export const updateCardTC = (cardID: string): AppThunkType =>
    async (dispatch) => {
        try {
            const res1 = await cardsAPI.updateCard('Ну как ты там?', cardID)
            dispatch(getCards())
        } catch (error: any) {
            console.log(error)
        }
    }