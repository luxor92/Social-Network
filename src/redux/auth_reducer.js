import {authAPI} from "../api/api";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

// Action-creators:
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

// Thunks-creators:
export const getAuthUserData = () => async (dispatch) => {
    // Можно убрать then, но тогда нужен async, await
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, setStatus) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        setStatus(response.data.messages)
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}
export default authReducer;