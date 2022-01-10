import {UsersType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {usersAPI} from "../api/users_api";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number> // Disable кнопки, пока страница прогружает запросы
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'social-network/users/FOLLOW':
            return {
                ...state,
                users: state.users.map((u:any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case 'social-network/users/UNFOLLOW':
            return {
                ...state,
                users: state.users.map((u:any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case 'social-network/users/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'social-network/users/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'social-network/users/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'social-network/users/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: any) => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

// Action-creators:
export const actions = {
    followSuccess: (userId: number) => ({type: 'social-network/users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'social-network/users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'social-network/users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) =>
        ({type: 'social-network/users/SET_CURRENT_PAGE', currentPage: currentPage} as const),
    setUsersTotalCount: (totalUsersCount: number) =>
        ({type: 'social-network/users/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({type: 'social-network/users/TOGGLE_IS_FETCHING', isFetching: isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({
            type: 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetching,
            userId
        } as const)
}

// Thunks-creators:
// Функция, принимающая какой-либо аргумент и возвращающая thunk-функцию
export const requestUsers = (page: number, pageSize: number): ThunkType => {

    return async (dispatch: Dispatch<ActionTypes>) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setUsersTotalCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false))
    }
}
export const follow = (userId: number): ThunkType => {

    return async (dispatch: Dispatch<ActionTypes>) => {

        dispatch(actions.toggleFollowingProgress(true, userId));

        let response = await usersAPI.follow(userId)
        if (response.resultCode === 0) {
            dispatch(actions.followSuccess(userId));
        }

        dispatch(actions.toggleFollowingProgress(false, userId));
    }
}
export const unfollow = (userId: number): ThunkType => {

    return async (dispatch: Dispatch<ActionTypes>) => {

        dispatch(actions.toggleFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId)
        if (response.resultCode === 0) {
            dispatch(actions.unfollowSuccess(userId));
        }
        dispatch(actions.toggleFollowingProgress(false, userId));
    }
}

export default usersReducer;

// Types
type ThunkType = BaseThunkType<ActionTypes>
type ActionTypes = InferActionsType<typeof actions>
export type InitialStateType = typeof initialState
