import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from "./SuperRadio.module.css"


type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    theme?: string
    options?: any[]
    onChangeOption?: (option: any) => void

}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        theme,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const classWidthTheme = theme? s[theme] + " "+ s.label : s.label

    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label className={classWidthTheme} key={name + '-' + i}>
            <input className={s.input}
                type={'radio'}
                name={name}
                value={o}
                onChange={onChangeCallback}
                checked={value === o}
            />
            <span className={s.checkmark}></span>
            {o}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
