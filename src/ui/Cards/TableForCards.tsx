import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import s from "./TableForCards.module.css";
import React, {ChangeEvent, useState} from "react";
import { CardType} from "../../dal/cardsAPI";
import {deleteCardTC, updateCardTC} from "../../bll/cardReducer";
import {ModalWindow} from "../Modal/ModalWindow";
import { SortButton } from "../features/sort/SortButton";
import DeleteButton from "../../componens/deleteButton/DeleteButton";
import CanselButton from "./../../componens/canсelButton/CancelButton";
import TitlePage from "../../componens/titlePage/TitlePage";
import InputText from "../../componens/inputText/InputText";
import MainButton from "../../componens/mainButton/MainButton";

export const TableForCards = (props: {onSortCards?: (value: string) => void}) => {

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    return (

        cards
            ? <div className={s.table}>
                <div className={s.table__row}>
                    <TableHead item={'Вопрос'}/>
                    <TableHead item={'Ответ'}/>
                    <TableHead item={'Последнее изменение'} onSortCards={props.onSortCards} value={"updated"}/>
                    <TableHead item={'Оценка'} onSortCards={props.onSortCards} value={"grade"}/>
                    <TableHead item={'Действия'}/>

                </div>
                {cards.map((card) => <TableRow key={card._id} card={card}/>)}
            </div>
            : <div>loading...</div>
    )
}

//table-head
const TableHead = (props: { item: string | number,  onSortCards?: (value: string) => void , value?: string}) => {
    return (
        <div className={s.table__cell}>
           <span>{props.item}
               {props.onSortCards && props.value ? <SortButton  value={props.value}
                                                                sortItems={props.onSortCards}/> : ''}
           </span>
        </div>
    )
}
// table-row

const TableRow = (props: {card: CardType}) => {

    return (
        <div className={s.table__row}>
            <TableCell item={props.card.question}/>
            <TableCell item={props.card.answer}/>
            <TableCell item={props.card.updated}/>
            <TableCell item={props.card.grade}/>
            <TableCell1 cardID={props.card._id} cardQuestion={props.card.question} cardAnswer={props.card.answer}/>
        </div>
    )
};

// table-cell

const TableCell = (props: { item: string | number, onSortPacks?: (value: string) => void }) => {
    return (
        <div className={s.table__cell}>
            <span>{props.item}</span>
        </div>
    )
}

const TableCell1 = (props:{ cardID: string, cardQuestion: string, cardAnswer: string}) => {
    // модалки
    const [modalActive, setModalActive] = useState(false)
    const changeModalActive = (isSee: boolean) => setModalActive(isSee)
    const [newQuestion, setNewQuestion] = useState(props.cardQuestion)
    //const changeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => setNewQuestion(e.currentTarget.value)
    const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => setNewQuestion(e.currentTarget.value)
    const [newAnswer, setNewAnswer] = useState(props.cardAnswer)
    //const changeAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => setNewAnswer(e.currentTarget.value)
    const changeAnswer = (e: ChangeEvent<HTMLInputElement>) => setNewAnswer(e.currentTarget.value)

    const [modalRequestActive, setModalRequestActive] = useState(false)
    const changeModalRequestActive = (isSee: boolean) => setModalRequestActive(isSee)
    //

    const requestStatus = useSelector<AppRootStateType, null | string>(state => state.cards.requestStatus)

    const seeWindowForUpdateCard = () => setModalActive(true)

    const dispatch = useDispatch()

    const updateCard = (cardID: string) => {

        dispatch(updateCardTC(cardID, newQuestion, newAnswer))
        setModalActive(false)
        setTimeout(()=>setModalRequestActive(true), 500)
        setTimeout(()=>setModalRequestActive(false), 3000)
    }
    const deleteCard = (cardID: string)  => {
        dispatch(deleteCardTC(cardID))
        setModalActive(false)
        setTimeout(()=>setModalRequestActive(true), 500)
        setTimeout(()=>setModalRequestActive(false), 3000)
    }

    return (
        <div className={s.table__cell}>
            <ModalWindow active={modalActive} setActive={changeModalActive}>
                <TitlePage title="Введите данные для изменения карточки"/>
                <InputText value={newQuestion} onChange={changeQuestion} fieldName={'Измените вопрос'}/>
                <InputText value={newAnswer} onChange={changeAnswer} fieldName={'Измените ответ'}/>
                <div>
                    <MainButton onClick={() => updateCard(props.cardID)}>Изменить карточку</MainButton>
                </div>
            </ModalWindow>
            <CanselButton className={s.editBtn} onClick={seeWindowForUpdateCard}>Изменить</CanselButton>
            <DeleteButton onClick={()=> deleteCard(props.cardID)}>Удалить</DeleteButton>

            <ModalWindow active={modalRequestActive} setActive={changeModalRequestActive}>
                {requestStatus}
            </ModalWindow>
        </div>
    )
}