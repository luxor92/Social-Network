// Selector - функция, которая принимает state и возвращает из него необходимое значение
// import {createSelector} from "reselect";

export const getUsers = (state) => {
    return state.usersPage.users
}
// Пример reselector. Нужен, когда нужно что-то большее чем просто вернуть значение, чтобы не было перерисовок
/*export const getUsersSuper = createSelector( getUsers, getIsFetching, (users, isFetching) => {
    return users.filter(u => true)
})*/

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowintInProgress = (state) => {
    return state.usersPage.followingInProgress
}