const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
    {id: 1, message: 'Hello world!', likesCount: 15},
    {id: 2, message: 'White Power', likesCount: 88},
    {id: 3, message: 'Don\'t worry be happy', likesCount: 55}],
    newPostText: 'Kunteynir',
    profile: null
}
;

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
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
        default:
            return state;
    }
}

// Action-creators:
export const addPostAC = () => ({type: ADD_POST})
export const updateNewPostAC = (text) => ({type: UPDATE_NEW_POST, newText: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export default profileReducer;