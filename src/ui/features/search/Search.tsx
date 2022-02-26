import {debounce} from "lodash";
import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {getPacks} from "../../../bll/packReducer";
import {AppRootStateType} from "../../../bll/store";
import InputSearch from "../../../componens/inputSearch/InputSearch";
import InputText from "../../../componens/inputText/InputText";
import MainButton from "../../../componens/mainButton/MainButton";
import {PacksGetParams} from "../../../dal/packsAPI";

type SearchPropsType = {
    getSearchData: (payload?: any) => any
    searchField: string
    setSearchField: (value: string) => void
}
export const Search = ({getSearchData, setSearchField, searchField}: SearchPropsType) => {

    const dispatch = useDispatch();

    const SearchDataWidthDebounce = debounce(() => {
        dispatch(getSearchData())
    }, 500);

    const onChange = (value: string) => {
        dispatch(setSearchField(value))
        SearchDataWidthDebounce()
    }

    return (
        <div>
            <InputSearch
                value={searchField}
                onChangeText={onChange}
            />
        </div>
    )
}