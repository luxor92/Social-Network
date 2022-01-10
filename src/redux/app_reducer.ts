// import {authAPI} from "../api/api";
import {getAuthUserData} from "./auth_reducer";
import {InferActionsType} from "./redux-store";

let initialState = {
    initialized: false
};
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
export const actions = {
    initializedSuccess: () => ({type: 'social-network/app/INITIALIZED_SUCCESS'} as const)
}

// После аргументов через двоеточие указан тип результата, возвращаемого
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'social-network/app/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
                }
        default:
            return state;
    }
}

// Thunks-creators:
export const initializeApp = () => (dispatch: any) => {
    // Thunk-a с асинхронным запросом возвращает промис. После его получения мы запускаем инициализацию
   let promise = dispatch(getAuthUserData());
    // Когда все промисы зарезолвятся запускаем инициализацию
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })
}

/*export const login = (email, password, rememberMe, setStatus) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            }
            else {
                setStatus(response.data.messages)
            }
        });
}*/

export default appReducer;