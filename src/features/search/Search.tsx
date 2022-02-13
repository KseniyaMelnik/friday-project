import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSearchPack } from "../../bll/packReducer";
import { AppRootStateType } from "../../bll/store";
import InputText from "../../componens/inputText/InputText";
import MainButton from "../../componens/mainButton/MainButton";


export const Search = () => {
    const searchName = useSelector((state: AppRootStateType) => state.packs.searchPack);
    const dispatch = useDispatch();
    const search = () => {}; //dispatch(getPacks())
    const setName = (newSearchName: string) => dispatch(setSearchPack(newSearchName));

    return (
        <div>
           <InputText
               type="text"
               value={searchName}
               onChange={e => setName(e.currentTarget.value)}
           />
            <MainButton onClick={search}>Поиск</MainButton>
        </div>
    )
}