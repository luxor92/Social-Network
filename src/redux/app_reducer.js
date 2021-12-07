import {authAPI} from "../api/api";
import {getAuthUserData} from "./auth_reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
                }
        default:
            return state;
    }
}

// Action-creators:
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

// Thunks-creators:
export const initializeApp = () => (dispatch) => {
    // Thunk-a с асинхронным запросом возвращает промис. После его получения мы запускаем инициализацию
   let promise = dispatch(getAuthUserData());
    // Когда все промисы зарезолвятся запускаем инициализацию
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export const login = (email, password, rememberMe, setStatus) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            }
            else {
                setStatus(response.data.messages)
            }
        });
}

export default appReducer;