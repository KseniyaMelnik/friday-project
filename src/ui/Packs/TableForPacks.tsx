import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {CardPacksType} from "../../dal/packsAPI";
import s from "./TableForPacks.module.css";
import {SortButton} from "../features/sort/SortButton";
import React, {ChangeEvent, useState} from "react";
import {deletePackTC, updatePackTC} from "../../bll/packReducer";
import {changePackIDAC} from "../../bll/cardReducer";
import {useNavigate} from "react-router-dom";
import {ModalWindow} from "../Modal/ModalWindow";
import CanselButton from "./../../componens/canсelButton/CancelButton";
import DeleteButton from "../../componens/deleteButton/DeleteButton";
import TitlePage from "../../componens/titlePage/TitlePage";
import InputText from "../../componens/inputText/InputText";
import MainButton from "../../componens/mainButton/MainButton";


export const TableForPacks = (props: {onSortPacks?: (value: string) => void}) => {

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)

    return (

        packs
            ? <div className={s.table}>
                <div className={s.table__row}>
                    <TableHead item={'Название колоды'} onSortPacks={props.onSortPacks} value={"name"}/>
                    <TableHead item={'Количество карточек'} onSortPacks={props.onSortPacks} value={"cardsCount"}/>
                    <TableHead item={'Последнее изменение'} onSortPacks={props.onSortPacks} value={"updated"}/>
                    <TableHead item={'Создано пользователем'} onSortPacks={props.onSortPacks} value={"user_name"}/>
                    <TableHead item={'Действия'}/>
                </div>
                {packs.map((pack) => <TableRow key={pack._id} pack={pack}/>)}
            </div>
            : <div>loading...</div>
    )
}
//table-head
const TableHead = (props: { item: string | number,  onSortPacks?: (value: string) => void , value?: string}) => {
    return (
        <div className={s.table__cell}>
           <span>{props.item}
               {props.onSortPacks && props.value ? <SortButton  value={props.value}
                                                sortItems={props.onSortPacks}/> : ''}
           </span>
        </div>
    )
}
// table-row

const TableRow = (props: {pack: CardPacksType}) => {

    return (
        <div className={s.table__row}>
            <TableCell item={props.pack.name} packID={props.pack._id}/>
            <TableCell item={props.pack.cardsCount} packID={props.pack._id}/>
            <TableCell item={props.pack.updated} packID={props.pack._id}/>
            <TableCell item={props.pack.user_name} packID={props.pack._id}/>
            <TableCell1 packID={props.pack._id}
                        namePack={props.pack.name}
                        cardCount={props.pack.cardsCount}
                        userID={props.pack.user_id}
            />
        </div>
    )
};

// table-cell

const TableCell = (props: { item: string | number, packID: string, onSortPacks?: (value: string) => void }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let seeCards = (packID: string) => {
        dispatch(changePackIDAC(packID))
        navigate( `/cards/${packID}`)

    }
    return (
       <div className={s.table__cell}>
           <span onClick={()=> seeCards(props.packID)}>{props.item}
               {props.onSortPacks ? <SortButton value={"updated"}
                                                sortItems={props.onSortPacks}/> : ''}
           </span>
            </div>
    )
}

const TableCell1 = (props: {packID: string, namePack: string, cardCount: number, userID: string}) => {
    const myId = useSelector<AppRootStateType, string>(state=> state.login.userID)
    const requestStatus = useSelector<AppRootStateType, null | string>(state => state.packs.requestStatus)

    // for modal window
    const [modalActive, setModalActive] = useState(false)
    const changeModalActive = (isSee: boolean) => setModalActive(isSee)
    const [newNamePack, setNewNamePack] = useState(props.namePack)
    const changeNewNamePack = (e: ChangeEvent<HTMLInputElement>) => setNewNamePack(e.currentTarget.value)

    const [modalRequestActive, setModalRequestActive] = useState(false)
    const changeModalRequestActive = (isSee: boolean) => setModalRequestActive(isSee)
    //

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const seeWindowForUpdatePack = () => setModalActive(true)

    const updatePack = (packID: string) => {
        dispatch(updatePackTC(packID, newNamePack))
        setModalActive(false)
        setTimeout(()=>setModalRequestActive(true), 500)
        setTimeout(()=>setModalRequestActive(false), 3000)
    }

    const deletePack = (packID: string)  => {
        dispatch(deletePackTC(packID))
        setTimeout(()=>setModalRequestActive(true), 500)
        setTimeout(()=>setModalRequestActive(false), 3000)
    }
    const learnPack = (packID: string, name: string) => {
       dispatch(changePackIDAC(packID))
        navigate(`/learn/${packID}/${name}`, {replace: true})
    }

    return (
        <div className={s.table__cell}>

            <ModalWindow active={modalActive} setActive={changeModalActive}>
                <TitlePage title="Введите новое название для колоды"/>
                <InputText value={newNamePack} onChange={changeNewNamePack} fieldName={'Новое название колоды'}/>
                <MainButton onClick={()=> updatePack(props.packID)}>Изменить название колоды</MainButton>
            </ModalWindow>

            <div className={s.btnContainer}>
                {props.userID === myId &&
                <div className={s.btn}>
                    <CanselButton className={s.editBTN} onClick={seeWindowForUpdatePack}>Изменить</CanselButton>
                </div>
                }
                {props.userID === myId && <div className={s.btn}>
                    <DeleteButton onClick={()=> deletePack(props.packID)}>Удалить</DeleteButton>
                </div>}

                {props.cardCount> 0 &&  <div className={s.btn}>
                    <CanselButton className={s.learnBTN} onClick={()=>learnPack(props.packID, props.namePack)}>Изучать</CanselButton>
                </div>}
            </div>

            <ModalWindow active={modalRequestActive} setActive={changeModalRequestActive}>
                {requestStatus}
            </ModalWindow>
        </div>
    )
}

