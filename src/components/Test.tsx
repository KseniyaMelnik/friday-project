import React, {useState} from "react";
import SuperInputText from "./common/SuperInput/SuperInputText";
import SuperCheckbox from "./common/SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "./common/SuperEditableSpan/SuperEditableSpan";
import SuperRadio from "./common/SuperRadio/SuperRadio";
import SuperSelect from "./common/SuperSelect/SuperSelect";
import SuperButton from "./common/SuperButton/SuperButton";
import s from "./Test.module.css"

const arr = ['Lil Bub', 'cat Maru', 'Simon\'s cat']

export const Test = () => {
    const [valueText, setValueText] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [valueRadio, onChangeOption] = useState(arr[1])
    const error = text ? '' : 'error'
    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text) // если нет ошибки показать текст
        }
    }

    return <div>
        <div className={s.container}>
            <SuperInputText
                value={text}
                onChangeText={setText}
                onEnter={showAlert}
                error={error}
            />
        </div>
        <div className={s.container}>
        <SuperCheckbox
            checked={checked}
            onChangeChecked={setChecked}
        />
        </div>

        <div className={s.container}>
            <SuperEditableSpan
                value={valueText}
                onChangeText={setValueText}
                spanProps={{children: valueText ? undefined : 'enter text...'}}
            />
        </div>
        <div className={s.container}>
            <SuperRadio
                name={'radio'}
                options={arr}
                value={valueRadio}
                onChangeOption={onChangeOption}
            />
        </div>
        <div className={s.container}>
            <SuperSelect
                name={'radio'}
                options={arr}
                value={valueRadio}
                onChangeOption={onChangeOption}
            />
        </div>

        <div className={s.container}>
            <SuperButton>
                default
            </SuperButton>

            <SuperButton
                red
            >
                delete
            </SuperButton>

            <SuperButton disabled>
                disabled
            </SuperButton>
        </div>
    </div>

}