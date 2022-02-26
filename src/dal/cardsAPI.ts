import { AxiosResponse } from "axios";
import {instance} from "./instance";


export const cardsAPI = {
    // getCards(packID: string) {
    //     return instance.get<CardsResponseType>(`/cards/card?cardsPack_id=${packID}`)
    // },
    getCards(payload: CardsGetParams) {
        return instance.get<CardsResponseType>(`/cards/card`, {params: payload})
    },
    createCard (packID: string, question: string, answer: string) {
        return instance.post('/cards/card', {card: {cardsPack_id: packID, question: question, answer: answer}})
    },
    deleteCard (cardID: string) {
        return instance.delete(`/cards/card?id=${cardID}`)
    },
    updateCard (newQuestion: string, newAnswer: string, cardID: string) {
        return instance.put('/cards/card', {card: {question: newQuestion, answer: newAnswer, _id: cardID}})
    },
    grade(payload: GradeData) {
        return instance.put<GradeResponse, AxiosResponse<GradeResponse>, GradeData>('/cards/grade', payload)
    },
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

export type GradeData = {
    card_id: string
    grade: number
}

export type GradeResponse = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}