import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}



// Action-creators:
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataPayloadActionType
}
type setAuthUserDataPayloadActionType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean)
    : setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export const getCaptchaUrlAC = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

// Thunks-creators:
export const getAuthUserData = () => async (dispatch: any) => {
    // Можно убрать then, но тогда нужен async, await
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, setStatus: any) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    }
    else if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC())
    }
    else {
        setStatus(response.data.messages)
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrlTC = () => async (dispatch: any) => {
    const response = await securityAPI.captcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlAC(captchaUrl))
}
export default authReducer;