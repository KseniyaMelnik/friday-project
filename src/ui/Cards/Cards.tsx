import {Navigate} from "react-router-dom";
import React, {ChangeEvent,useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import {TableForCards} from "./TableForCards";
import {ModalWindow} from "../Modal/ModalWindow";
import {CardReducerStateType, changePageCount, createCardTC, getCards, setCardsPage, setSortCards} from "../../bll/cardReducer";
import { Paginator } from "../features/paginator/Paginator";
import { SelectPageSize } from "../features/selectPageSize/SelectPageSize";
import s from "./Card.module.css";
import TitlePage from "../../componens/titlePage/TitlePage";
import InputText from "../../componens/inputText/InputText";

export const Cards = React.memo(() => {
//модалки
    const [modalActive, setModalActive] = useState(false)
    const changeModalActive = (isSee: boolean) => setModalActive(isSee)
    const [questionField, setQuestionField] = useState('')
    const changeQuestionField = (e: ChangeEvent<HTMLInputElement>) => setQuestionField(e.currentTarget.value)
    const [answerField, setAnswerField] = useState('')
    const changeAnswerField = (e: ChangeEvent<HTMLInputElement>) => setAnswerField(e.currentTarget.value)

    const [modalRequestActive, setModalRequestActive] = useState(false)
    const changeModalRequestActive = (isSee: boolean) => setModalRequestActive(isSee)
  //

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const requestStatus = useSelector<AppRootStateType, null | string>(state => state.cards.requestStatus)

    const {page, pageCount, cardsTotalCount, sortCards} = useSelector<AppRootStateType, CardReducerStateType>(state=>state.cards)
    const dispatch = useDispatch()

    const seeWindowForCreateNewCard = () => {
        setAnswerField('')
        setQuestionField('')
        setModalActive(true)
    }

    const createNewCard = () => {
        dispatch(createCardTC(questionField, answerField))
        setModalActive(false)
        setTimeout(()=>setModalRequestActive(true), 500)
        setTimeout(()=>setModalRequestActive(false), 3000)
    }
    const onSortCards = useCallback((value: string) => {
        dispatch(setSortCards(value))
    }, [dispatch])
    const onPageChanged = useCallback((page: number) => {
        dispatch(setCardsPage(page))
    }, [dispatch])
    const setPageSize = useCallback((pageCount: number) => {
        dispatch(changePageCount(pageCount))
    }, [dispatch])

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch, sortCards, page, pageCount])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.cards}>
            <div className={s.container}>
                <TitlePage title="Карты"/>
                <ModalWindow active={modalActive} setActive={changeModalActive}>
                    <TitlePage title="Введите данные для новой карточки"/>
                    <InputText value={questionField} onChange={changeQuestionField} fieldName={'Введите вопрос'}/>
                    <InputText value={answerField} onChange={changeAnswerField} fieldName={'Введите ответ на Ваш вопрос'}/>
                <div className={s.wrapper}>
                    <MainButton onClick={createNewCard}>Создать новую карточку</MainButton>
                </div>
                </ModalWindow>

                <MainButton onClick={seeWindowForCreateNewCard}>Создать карту</MainButton>
                <TableForCards onSortCards={onSortCards}/>
                <ModalWindow active={modalRequestActive} setActive={changeModalRequestActive}>
                    {requestStatus}
                </ModalWindow>
                <div className={s.wrapper}>
                    <Paginator totalCount={cardsTotalCount}
                        pageCount={pageCount}
                        onPageChanged={onPageChanged}
                        currentPage={page}
                    />
                    <SelectPageSize  selectedPageSize={pageCount}
                        pageSizes={[5, 10, 15]}
                        changePageSize={setPageSize}
                    />
                </div>
            </div>
        </div>
    )
})