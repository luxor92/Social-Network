import { Dispatch } from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {usersAPI} from "../api/users_api";
import {profileAPI} from "../api/profile_api";

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

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'social-network/profile/ADD-POST': {
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
        case 'social-network/profile/UPDATE-NEW-POST': {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case 'social-network/profile/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'social-network/profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'social-network/profile/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case `social-network/profile/SAVE_PHOTO_SUCCESS`: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        case `social-network/profile/SAVE_PROFILE_SUCCESS`: {
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
type ActionTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

// Action-creators:
export const actions = {
    addPostAC: (newPostElement: string) => ({type: 'social-network/profile/ADD-POST', newPostElement: newPostElement} as const),
    updateNewPostAC: (text: string) => ({type: 'social-network/profile/UPDATE-NEW-POST', newText: text} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'social-network/profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'social-network/profile/SET_STATUS', status} as const),
    deletePostAC: (postId: number) => ({type: 'social-network/profile/DELETE_POST', postId} as const),
    savePhotoSuccessAC: (photos: PhotosType) => ({type: `social-network/profile/SAVE_PHOTO_SUCCESS`, photos} as const),
    saveProfileSuccessAC: (profile: ProfileType) => ({type: `social-network/profile/SAVE_PROFILE_SUCCESS`, profile} as const)
}

// Thunk-creators
export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
}
export const getStatus = (userId: number) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        profileAPI.getStatus(userId)
            .then((response: any) => {
                dispatch(actions.setStatus(response))
            });
    }
}
export const updateStatus = (status: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        profileAPI.updateStatus(status)
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    dispatch(actions.setStatus(status))
                }
            });
    }
}
export const savePhoto = (file: File): ThunkType => {
    return async (dispatch: Dispatch<ActionTypes>) => {
        const response = await profileAPI.savePhoto(file)
                if (response.resultCode === 0) {
                    dispatch(actions.savePhotoSuccessAC(response.data.photos))
                }
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
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