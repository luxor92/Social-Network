import {Dispatch} from "redux";
import {ResultCodeEnum} from "../api/api";
import {authAPI} from "../api/auth_api";
import {securityAPI} from "../api/security_api";
import {BaseThunkType, InferActionsType} from "./redux-store";

export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'social-network/auth/SET_USER_DATA':
        case 'social-network/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

// Action-creators
export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'social-network/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlAC: (captchaUrl: string) => ({
        type: 'social-network/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const),

}

// Thunks-creators:
export const getAuthUserData = ():ThunkType => async (dispatch) => {
    // Можно убрать then, но тогда нужен async, await
    let response = await authAPI.me();

    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, setStatus: any): ThunkType => async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe);

        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData());
        } else if (response.data.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrlTC())
        } else {
            setStatus(response.data.messages)
        }
    }
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}
export const getCaptchaUrlTC = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.captcha();
    const captchaUrl = response.url;
    dispatch(actions.getCaptchaUrlAC(captchaUrl))
}

export default authReducer;