import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})


export const ForgotPasswordAPI = {
    forgotPassword(email: string) {
        return instance.post<ResponseForgotPassword>('/auth/forgot',
            {
                email: email,
                //ПОТОМ ПОМЕНЯТЬ ССЫЛКУ на gitpage.io
                message: `
<div style="background-color: lime; padding: 15px">Для создания нового пароля перейдите по ссылке: <a href='https://denya54.github.io/friday-project/#/set_new_password/$token$'>link</a></div>
`,
            })
    },

    setNewPassword(newPassword: string, resetPasswordToken: string) {
        return instance.post<ResponseForgotPassword>('/auth/set-new-password',
            {
                password: newPassword,
                resetPasswordToken: resetPasswordToken
            })
    },
}

type ResponseForgotPassword = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
}
