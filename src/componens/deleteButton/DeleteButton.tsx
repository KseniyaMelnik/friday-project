import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './DeleteButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type DeleteButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    disabled?: boolean
}

const DeleteButton: React.FC<DeleteButtonPropsType> = (
    {
        red, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${red ? s.red : s.delete} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default DeleteButton