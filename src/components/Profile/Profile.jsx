import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile