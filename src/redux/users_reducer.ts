// Декларирование костант, чтобы Webstorm подсказывал и были менее вероятны ошибки
import {UsersType} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {usersAPI} from "../api/users_api";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

// Данные (по сути пропсы), которые мы отправляем в раздел Users
let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number> // Disable кнопки, пока страница прогружает запросы
};
export type InitialStateType = typeof initialState

// Код, который мы выполняем при выполнении Action-creators
const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u:any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u:any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

// Types
// Вариант №1 реализации типов экшнов
type ActionTypes = FollowSuccessType | UnFollowSuccessType | SetUsersType | SetCurrentPageType |
    SetUsersTotalCountType | ToggleIsFetchingType | ToggleFollowingProgressType
type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
type UnFollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetUsersTotalCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
// Вариант №2 реализации типов экшнов. Объявление в redux-store (не доделано)
/*export const actions = {
    followSuccess: (userId: number): FollowSuccessType => ({type: FOLLOW, userId}),
    unfollowSuccess: (userId: number): UnFollowSuccessType => ({type: UNFOLLOW, userId}),
    setUsers: (users: Array<UsersType>): SetUsersType => ({type: SET_USERS, users}),
    setCurrentPage: (currentPage: number): SetCurrentPageType =>
        ({type: SET_CURRENT_PAGE, currentPage: currentPage}),
    setUsersTotalCount: (totalUsersCount: number): SetUsersTotalCountType =>
        ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}),
    toggleIsFetching: (isFetching: boolean): ToggleIsFetchingType =>
        ({type: TOGGLE_IS_FETCHING, isFetching: isFetching}),
    toggleFollowingProgress: (isFetching: boolean, userId: number): ToggleFollowingProgressType =>
        ({
            type: TOGGLE_IS_FOLLOWING_PROGRESS,
            isFetching,
            userId
        })
}*/


// Action-creators:
// Typescript. Вариант №1
export const followSuccess = (userId: number): FollowSuccessType => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: number): UnFollowSuccessType => ({type: UNFOLLOW, userId})
export const setUsers = (users: Array<UsersType>): SetUsersType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageType =>
    ({type: SET_CURRENT_PAGE, currentPage: currentPage})
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountType =>
    ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType =>
    ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType =>
    ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})
// Typescript. Вариант №2
/*export const followSuccess = (userId: number) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId})
export const setUsers = (users: Array<UsersType>) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number) =>
    ({type: SET_CURRENT_PAGE, currentPage: currentPage})
export const setUsersTotalCount = (totalUsersCount: number) =>
    ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching: boolean) =>
    ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
    ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    })*/

// Thunks-creators:
// Функция, принимающая какой-либо аргумент и возвращающая thunk-функцию
export const requestUsers = (page: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, any, ActionTypes> => {

    return async (dispatch: Dispatch<ActionTypes>) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount));
        dispatch(toggleIsFetching(false))
    }
}
export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, any, ActionTypes> => {

    return async (dispatch: Dispatch<ActionTypes>) => {

        dispatch(toggleFollowingProgress(true, userId));

        let response = await usersAPI.follow(userId)
        if (response.resultCode === 0) {
            dispatch(followSuccess(userId));
        }

        dispatch(toggleFollowingProgress(false, userId));
    }
}
export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, any, ActionTypes> => {

    return async (dispatch: Dispatch<ActionTypes>) => {

        dispatch(toggleFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId)
        if (response.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

// Если вариант №2 типизации
/*export const requestUsers = (page: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, any, ActionTypes> => {

    return async (dispatch: Dispatch<ActionTypes>) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setUsersTotalCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false))
    }
}
export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, any, ActionTypes> => {

    return async (dispatch: Dispatch<ActionTypes>) => {

        dispatch(toggleFollowingProgress(true, userId));

        let response = await usersAPI.follow(userId)
        if (response.data.resultCode === 0) {
            dispatch(actions.followSuccess(userId));
        }

        dispatch(actions.toggleFollowingProgress(false, userId));
    }
}
export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, any, ActionTypes> => {

    return async (dispatch: Dispatch<ActionTypes>) => {

        dispatch(actions.toggleFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId)
        if (response.data.resultCode === 0) {
            dispatch(actions.unfollowSuccess(userId));
        }
        dispatch(actions.toggleFollowingProgress(false, userId));
    }
}*/

export default usersReducer;