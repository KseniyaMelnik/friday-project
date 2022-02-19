import {debounce} from "lodash";
import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {getPacks, setSearchField} from "../../../bll/packReducer";
import {AppRootStateType} from "../../../bll/store";
import InputSearch from "../../../componens/inputSearch/InputSearch";
import InputText from "../../../componens/inputText/InputText";
import MainButton from "../../../componens/mainButton/MainButton";
import {PacksGetParams} from "../../../dal/packsAPI";

type SearchPropsType = {
    getSearchData: (payload?: PacksGetParams) => any
}
export const Search = ({getSearchData}: SearchPropsType) => {
    const searchField = useSelector((state: AppRootStateType) => state.packs.searchField);
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