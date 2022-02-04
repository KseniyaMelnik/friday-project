import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {loginReducer} from "./login-reducer";
import {registrationReducer} from "./registration-reducer";
import {newPasswordReducer} from "./new-password-reducer";
import {profileReducer} from "./profile-reducer";
import {retrievalReducer} from "./retrieval-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    retrieval: retrievalReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;
