import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'social-network/profile/ADD-POST';
const UPDATE_NEW_POST = 'social-network/profile/UPDATE-NEW-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = `social-network/profile/SAVE_PHOTO_SUCCESS`;
const SAVE_PROFILE_SUCCESS = `social-network/profile/SAVE_PROFILE_SUCCESS`


let initialState = {
    posts: [
        {id: 1, message: 'Hello world!', likesCount: 15},
        {id: 2, message: 'White Power', likesCount: 88},
        {id: 3, message: 'Don\'t worry be happy', likesCount: 55}],
    newPostText: "",
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: action.newPostElement,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case UPDATE_NEW_POST: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        case SAVE_PROFILE_SUCCESS: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}

// Action-creators:
export const addPostAC = (newPostElement) => ({type: ADD_POST, newPostElement: newPostElement})
export const updateNewPostAC = (text) => ({type: UPDATE_NEW_POST, newText: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePostAC = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccessAC = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const saveProfileSuccessAC = (profile) => ({type: SAVE_PROFILE_SUCCESS, profile})


// Thunk-creators
export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}
export const getStatus = (userId) => {

    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            });
    }
}
export const updateStatus = (status) => {

    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            });
    }
}
export const savePhoto = (file) => {

    return async (dispatch) => {
        const response = await profileAPI.savePhoto(file)
                if (response.data.resultCode === 0) {
                    dispatch(savePhotoSuccessAC(response.data.data.photos))
                }
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
        const response = await profileAPI.saveProfile(profile);
        const userId = getState().auth.userId;

        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        }
        else {
            return Promise.reject(response.data.messages[0])
        }
}

export default profileReducer;