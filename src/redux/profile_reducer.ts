import { Dispatch } from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {usersAPI} from "../api/users_api";
import {profileAPI} from "../api/profile_api";

const ADD_POST = 'social-network/profile/ADD-POST';
const UPDATE_NEW_POST = 'social-network/profile/UPDATE-NEW-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = `social-network/profile/SAVE_PHOTO_SUCCESS`;
const SAVE_PROFILE_SUCCESS = `social-network/profile/SAVE_PROFILE_SUCCESS`

type PostsType = {
    id: number | null
    message: string | null
    likesCount: number | null
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string | null
    large: string | null
}
type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

let initialState = {
    posts: [
        {id: 1, message: 'Hello world!', likesCount: 15},
        {id: 2, message: 'White Power', likesCount: 88},
        {id: 3, message: 'Don\'t worry be happy', likesCount: 55}] as Array<PostsType>,
    newPostText: "" as string | null,
    profile: null as ProfileType | null,
    status: "" as string | null
};
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                profile: {...state.profile, photos: action.photos} as ProfileType
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

// Types
type ActionTypes = AddPostACType | UpdateNewPostACType | SetUserProfileType | SetStatusType | DeletePostACType |
    SavePhotoSuccessACType | SaveProfileSuccessACType
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionTypes>
type AddPostACType = {
    type: typeof ADD_POST
    newPostElement: string | null
}
type UpdateNewPostACType = {
    type: typeof UPDATE_NEW_POST
    newText: string | null
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusType = {
    type: typeof SET_STATUS
    status: string | null
}
type DeletePostACType = {
    type: typeof DELETE_POST
    postId: number | null
}
type SavePhotoSuccessACType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
type SaveProfileSuccessACType = {
    type: typeof  SAVE_PROFILE_SUCCESS
    profile: ProfileType
}

// Action-creators:
export const addPostAC = (newPostElement: string): AddPostACType => ({type: ADD_POST, newPostElement: newPostElement})
export const updateNewPostAC = (text: string): UpdateNewPostACType => ({type: UPDATE_NEW_POST, newText: text})
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})
export const deletePostAC = (postId: number): DeletePostACType => ({type: DELETE_POST, postId})
export const savePhotoSuccessAC = (photos: PhotosType): SavePhotoSuccessACType => ({type: SAVE_PHOTO_SUCCESS, photos})
export const saveProfileSuccessAC = (profile: ProfileType): SaveProfileSuccessACType => ({type: SAVE_PROFILE_SUCCESS, profile})


// Thunk-creators
export const getUserProfile = (userId: number): ThunkAction<Promise<void>, AppStateType, any, ActionTypes> => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    }
}
export const getStatus = (userId: number) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        profileAPI.getStatus(userId)
            .then((response: any) => {
                dispatch(setStatus(response.data))
            });
    }
}
export const updateStatus = (status: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        profileAPI.updateStatus(status)
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            });
    }
}
export const savePhoto = (file: any): ThunkType => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        const response = await profileAPI.savePhoto(file)
                if (response.resultCode === 0) {
                    dispatch(savePhotoSuccessAC(response.data.photos))
                }
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
        const response = await profileAPI.saveProfile(profile);
        const userId = getState().auth.userId;
        if (response.resultCode === 0) {
            dispatch(getUserProfile(userId))
        }
/*        else {
            return Promise.reject(response.data.messages[0])
        }*/
}

export default profileReducer;