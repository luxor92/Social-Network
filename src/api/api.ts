import axios from "axios";
import {PhotosType, ProfileType} from "../types/types";
import any = jasmine.any;

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
    follow (userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow (userId: number) {
        return instance.delete(`follow/${userId}`)
            },
    getProfile (userId: number) {
        // console.warn("Obsolete method. Use profileAPI object")
        return profileAPI.getProfile(userId);
    }
}

export enum ResultCodeEnum {
    Success,
    Error,
    CaptchaIsRequired = 10
}
type MeResponseType = {
    data: {
        id: number, email: string, login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginMeResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const authAPI = {
     me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false) {
         return instance.post<LoginMeResponseType>(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile (userId: number) {
        return instance.get("profile/" + userId)
    },
    getStatus (userId: number) {
        return instance.get("profile/status/" + userId)
    },
    updateStatus (status: string) {
         return instance.put("profile/status", { status: status })
     },
    savePhoto (photo: any) {
        let formData = new FormData();
        formData.append("image", photo)
        return instance.put("profile/photo", formData, {
            headers: {
                'Content-type': "multipart/form-data"
            }
        })
    },
    saveProfile (profile: ProfileType) {
        return instance.put("profile", profile)
    }
}

export const securityAPI = {
    captcha() {
        return instance.get(`security/get-captcha-url`)
    }
}

