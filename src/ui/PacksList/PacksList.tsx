import React from 'react';
import {useSelector} from "react-redux";
import {packType} from "../../bll/packReducer";
import {AppRootStateType} from "../../bll/store";
import s from "./PackList.module.css"

export const PackList = () => {

const packs = useSelector<AppRootStateType, Array<packType>>(state => state.packs.cardPacks)

return (
    packs
        ? <div className={s.table}>
            <div>PackList</div>
            {packs.map((pack, idx) => <TableRow key={idx} pack={pack} />)}
        </div>
        : <div>loading...</div>
)
}
// table-row

const TableRow = (props: any) => {

    return (
        <div className={s.table__row}>
            <TableCell item={props.pack.name} />
            <TableCell item={props.pack.cardsCount} />
            <TableCell item={props.pack.updated} />
            <TableCell item={props.pack.created} />
        </div>
    )
};

// table-cell

const TableCell = (props: any) => {
    return (
        <div className={s.table__cell}>
            <input
                value={props.item}
                type="text" />
        </div>
    )
}


