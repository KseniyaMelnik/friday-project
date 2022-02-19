import {instance} from "./instance";


export const cardsAPI = {
    // getCards(packID: string) {
    //     return instance.get<CardsResponseType>(`/cards/card?cardsPack_id=${packID}`)
    // },
    getCards(payload: CardsGetParams) {
        return instance.get<CardsResponseType>(`/cards/card`, {params: payload})
    },
    createCard (packID: string) {
        return instance.post('/cards/card', {card: {cardsPack_id: packID, question: 'почём в Одессе рубероид?'}})
    },
    deleteCard (cardID: string) {
        return instance.delete(`/cards/card?id=${cardID}`)
    },
    updateCard (newQuestion: string, cardID: string) {
        return instance.put('/cards/card', {card: {question: newQuestion, _id: cardID}})
    }
};

// Types
export type CardsGetParams = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    page?: number
    pageCount?: number
    sortCards?: any
}

export type CardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

// type CreatePackType = {
//     name: string
//     private?: boolean
// }
