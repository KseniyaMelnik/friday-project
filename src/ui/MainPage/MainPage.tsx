import React from "react";
import {useNavigate} from "react-router-dom";
import MainButton from "../../componens/mainButton/MainButton";
import s from "./MainPage.module.css";
import img1 from "./../../assets/images/denis.jpg";
import img2 from "./../../assets/images/raketa.png";
import img3 from "./../../assets/images/vlad.jpg";
import img4 from "./../../assets/images/img4.jpg";
import img5 from "./../../assets/images/ignat.jpg";
export const MainPage = () => {

    const navigate = useNavigate();

    const redirectToProfile = () => navigate('/profile')

    return (
        <div className={s.mainPage}>
            <h1 className={s.title}>Добро пожаловать!</h1>  
            <div className={s.content}>
                <h2 className={s.subTitle}>Этот мини-сайт сделали для вас следующие люди:</h2>
                <ul className={s.list}>
                    <li className={s.items}><img className={s.img} src={img1}></img><a  className={s.link} href={'https://github.com/denya54'}> Хвесеня Денис</a></li>
                    <li className={s.items}><img className={s.img} src={img2}></img><a  className={s.link} href={'https://github.com/KseniyaMelnik'}> Ксения Мельник </a></li>
                    <li className={s.items}><img className={s.img} src={img3}></img><a  className={s.link} href={'https://github.com/vladward'}>Владислав Малохвей</a></li>
                </ul>
                
                <h2 className={s.subTitle2}> За красивое оформление отвечала:</h2>
                <div className={s.wrapper}>
                    <img className={s.img} src={img4}></img>
                    {/* <div className={s.linkInner}> */}
                        <a className={s.link} href={'https://github.com/Evgeniya-junior'}> Евгения Ложкина</a>
                    {/* </div> */}
                </div>
                <h2 className={s.subTitle3}>И все это разрабатывалось под руководством:</h2>
                <div className={s.wrapper}>
                    <img className={s.img} src={img5}></img>
                    {/* <div className={s.linkInner}> */}
                        <a className={s.link} href={'https://github.com/IgnatZakalinsky'}> Игнат Закалинский</a>
                    {/* </div> */}
                </div>

            </div>
                <MainButton className={s.button} onClick={redirectToProfile}>Полетели</MainButton>
            {/* <img className={s.raketa} src={raketa}></img> */}
        </div>
    )
}