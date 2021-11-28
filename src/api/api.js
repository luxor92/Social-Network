import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "85dc1b5e-488b-46b4-93b2-244a24d756b0"}});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, )
            .then(response => {
                return response.data;
            });
    }
}

export const unfollow = (id = 1) => {
    return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, )
        .then(response => {
            return response.data;
        });
}

export const follow = (id = 1) => {
    return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, )
        .then(response => {
            return response.data;
        });
}

export const checkAuth = () => {
    return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, )
        .then(response => {
            return response.data;
        });
}