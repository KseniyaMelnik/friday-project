import LogoTitle from "../../componens/logoTitle/LogoTitle";
import s from "./TransitionalPage.module.css";
import letter from "./../../assets/images/Group 281.png";

export const TransitionalPage = () => {
    return (
        <div className={s.transitionalPage}>
            <LogoTitle/>
            <img className={s.img} src={letter}/>
            <h4 className={s.title}>Проверь свою почту!</h4>
            <p className={s.text}>Мы отправили на твой email инструкцию с дальнейшими действиями. Эту страницу можно закрывать!</p>
        </div>
    )
}