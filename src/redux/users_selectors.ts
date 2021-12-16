// Selector - функция, которая принимает state и возвращает из него необходимое значение
// import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}
// Пример reselector. Нужен, когда нужно что-то большее чем просто вернуть значение, чтобы не было перерисовок
/*export const getUsersSuper = createSelector( getUsers, getIsFetching, (users, isFetching) => {
    return users.filter(u => true)
})*/

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowintInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}