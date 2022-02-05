import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "./login-reducer";
import {registerReducer} from "./registration-reducer";
import {newPasswordReducer} from "./new-password-reducer";
import {profileReducer} from "./profile-reducer";
import {retrievalReducer} from "./retrieval-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    retrieval: retrievalReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;
