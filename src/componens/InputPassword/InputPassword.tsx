import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './InputPassword.module.css'
import PasswordCheckbox from "../passwordCheckbox/PasswordCheckbox";


// false - text; true - password

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type InputPasswordPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

const InputPassword: React.FC<InputPasswordPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

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
    
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`

    const finalInputClassName = `${error ? s.errorInput : s.inputPassword} ${className}` // need to fix with (?:) and s.superInput

    let [notSeePassword, setNotSeePassword] = useState(true)

    let changeEyeValue = (value: boolean) => {
        setNotSeePassword(value)
    }

    return (
        <div className={s.inputPassword}>
            <div className={s.container}>
                <div className={s.input}>             
                    <label className={s.title}>
                        {notSeePassword
                            ?  <input
                                id='password-input'
                                required
                                type={'password'}
                                placeholder="&nbsp;"
                                // {error ? 'error' : 'Password'}
                                onChange={onChangeCallback}
                                onKeyPress={onKeyPressCallback}
                                className={finalInputClassName}
                                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                            />
                        :  <input
                                id='password-input'
                                required
                                type={'text'}
                                placeholder="&nbsp;"
                                // {error ? 'error' : 'Password'}
                                onChange={onChangeCallback}
                                onKeyPress={onKeyPressCallback}
                                className={finalInputClassName}
                                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                            />}
                    <span className={s.span}>{restProps.title}</span>
                    </label>
                    <PasswordCheckbox isNotSeePassword={notSeePassword}
                                      onChangeChecked={changeEyeValue}
                    />
                    {/* <a href="" className={s.passwordControl}></a>  */}
                </div> 
                <hr className={s.line}/>            
            </div> 
                
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>       
    )
}

export default InputPassword
