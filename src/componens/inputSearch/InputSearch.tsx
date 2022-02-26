import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import s from './InputSearch.module.css';
import search from "./../../assets/images/search.png";


// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type InputSearchPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    // spanClassName?: string
}

const InputSearch: React.FC<InputSearchPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
         className,
        //  spanClassName,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    // const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`

    // const finalInputClassName = `${error ? s.errorInput : s.inputSearch} ${className}` // need to fix with (?:) and s.superInput

    return (
        <div className={s.inputSearch}>
            
                        <input
                            type={type}
                            placeholder="Search ..."                          
                            onChange={onChangeCallback}
                            onKeyPress={onKeyPressCallback}
                            className={s.input}
                            {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                        />  
                        {/* <img className={s.inputImg} src={search}></img>               */}
        </div>
    )
}

export default InputSearch
