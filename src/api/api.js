import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "251f2148-33df-494a-b226-c7e33fc41fd6"}});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    follow (userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow (userId) {
        return instance.delete(`follow/${userId}`)
            },

    getProfile (userId) {
        // console.warn("Obsolete method. Use profileAPI object")
        return profileAPI.getProfile(userId);
    }
}

export const authAPI = {
     me() {
        return instance.get(`auth/me`)
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get("profile/" + userId)
    },

    getStatus (userId) {
        return instance.get("profile/status/" + userId)
    },

    updateStatus (status) {
         return instance.put("profile/status", { status: status })
     }
}