import React from "react";
import InputText from "../../componens/inputText/InputText";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import MainButton from "../../componens/mainButton/MainButton";
import { Paginator } from "../../features/paginator/Paginator";
import { Search } from "../../features/search/Search";
import { SortButton } from "../../features/sort/SortButton";

export const MainPage = () => {
    return (
        <div>
            <LogoTitle></LogoTitle>
            MainPage
            <InputText/>
            <MainButton>Click ME</MainButton>
        </div>
    )
}