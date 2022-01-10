import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import usersReducer from "./users_reducer";
import authReducer from "./auth_reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import appReducer from "./app_reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsType<T> = T extends {[key: string] : (...args: any[]) => infer U} ? U : never

//type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
//export type InferActionsType<T extends {[key: string] : (...args: any[])=>any}> = ReturnType<PropertiesType<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// window.store = store;
// @ts-ignore
window.__store__ = store

export default store