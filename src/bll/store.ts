import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import {RecoveryPasswordReducer} from "./recoveryPasswordReducer";
import {PegistrationActionsType, registerReducer} from "./registerReduser";
import thunk, { ThunkAction } from "redux-thunk";
import {PackActionType, packReducer } from "./packReducer";
import {CardActionType, cardReducer} from "./cardReducer";


const rootReducer = combineReducers({
    login: authReducer,
    app: appReducer,
    password: RecoveryPasswordReducer,
    register: registerReducer,
    packs: packReducer,
    cards: cardReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppRootActionsType =
    PackActionType | PegistrationActionsType | CardActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// @ts-ignore
window.store = store;