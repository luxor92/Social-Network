import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>("profile/" + userId).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>("profile/status/" + userId).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>("profile/status", {status: status}).then(response => response.data)
    },
    savePhoto(photo: any) {
        let formData = new FormData();
        formData.append("image", photo)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>("profile/photo", formData, {
            headers: {
                'Content-type': "multipart/form-data"
            }
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>("profile", profile).then(response => response.data)
    }
}