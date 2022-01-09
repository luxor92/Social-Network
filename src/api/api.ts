import axios from "axios";
import {UsersType} from "../types/types";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "251f2148-33df-494a-b226-c7e33fc41fd6"}});

export enum ResultCodeEnum {
    Success,
    Error,
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}