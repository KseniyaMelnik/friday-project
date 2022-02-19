import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {logoutTC} from '../../bll/authReducer';
import {getPacks, PackReducerStateType, setPacksFromRange, setPage, setPageCount, setSortPacks} from '../../bll/packReducer';
import {AppRootStateType} from '../../bll/store';
import {Paginator} from '../features/paginator/Paginator';
import {Search} from '../features/search/Search';
import {SortButton} from '../features/sort/SortButton';
import s from "./Test.module.css"
import {CardPacksType} from "../../dal/packsAPI";
import { SelectPageSize } from '../features/selectPageSize/SelectPageSize';
import { PacksRange } from '../features/packsRange/PacksRange';
import { debounce } from 'lodash';


export const Test = React.memo(() => {
    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const {
        cardPacks, page, pageCount,
        cardPacksTotalCount, minCardsCount,
        maxCardsCount, cardsValuesFromRange, sortPacks, searchField
    } = useSelector<AppRootStateType, PackReducerStateType>(state => state.packs)

    const onLogout = () => {
        dispatch(logoutTC())
    }
    const onPageChanged = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [dispatch])
    const setPageSize = useCallback((pageCount: number) => {
        dispatch(setPageCount(pageCount))
    }, [dispatch])
    const onSortPacks = useCallback((value: string) => {
        dispatch(setSortPacks(value))
    }, [dispatch])
   const debouncedRangeData = debounce(values => {
        dispatch(setPacksFromRange(values))
    }, 400)
    const onRangeChanged = useCallback((values) => {
        debouncedRangeData(values)
    }, [dispatch])

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, page, pageCount, sortPacks, maxCardsCount, maxCardsCount, cardsValuesFromRange])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Profile page
            <button onClick={onLogout}>log out</button>
            <PacksRange cardsValuesFromRange={cardsValuesFromRange}
                        minCardsCount={minCardsCount}
                        maxCardsCount={maxCardsCount}
                        handleRangeChange={onRangeChanged}
            />
            <Search getSearchData={getPacks}/>
            <PackList onSortPacks={onSortPacks}/>
            <Paginator totalCount={cardPacksTotalCount}
                       pageCount={pageCount}
                       onPageChanged={onPageChanged}
                       currentPage={page}
            />
            <SelectPageSize  selectedPageSize={pageCount}
                             pageSizes={[5, 10, 15, 20]}
                             changePageSize={setPageSize}
            />
        </div>
    )
})

export const PackList = (props: any) => {

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)
    return (

        packs
            ? <div className={s.table}>
                <div>PackList</div>
                <div className={s.table__row}>
                    <TableCell item={'Name'}/>
                    <TableCell item={'Cards'}/>
                    <TableCell item={'Last Updated'} onSortPacks={props.onSortPacks}/>
                    <TableCell item={'Created By'}/>

                </div>
                {packs.map((pack, idx) => <TableRow key={idx} pack={pack}/>)}
            </div>
            : <div>loading...</div>
    )
}
// table-row

const TableRow = (props: any) => {

    return (
        <div className={s.table__row}>
            <TableCell item={props.pack.name}/>
            <TableCell item={props.pack.cardsCount}/>
            <TableCell item={props.pack.updated}/>
            <TableCell item={props.pack.created}/>
        </div>
    )
};

// table-cell

const TableCell = (props: any) => {
    return (
        <div className={s.table__cell}>
            <input
                value={props.item}
                type="text"/>
            {props.onSortPacks ? <SortButton value={"updated"}
                                             sortItems={props.onSortPacks}/> : ''}
        </div>
    )
}