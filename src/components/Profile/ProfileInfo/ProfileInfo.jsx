import s from './ProfileInfo.module.css'
import ProfileStatusHooks from "./ProfileStatusHooks";
import {useState} from "react";
import ProfileDataForm from "./ProfileForm";

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false)

    // Обработчик события загрузки картинки на аватар
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.descriptionBlock}>
            <img alt=""
                 className={s.img}
                 src={props.profile.photos.large || 'https://photopict.ru/wp-content/uploads/2019/05/kartinki-na-avu-dlya-devushek-v-vk.jpg'}/>

            <div>{props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}</div>

            <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
            { editMode
                ? <ProfileDataForm
                    profile={props.profile}
                    saveProfile={props.saveProfile}
                    deactivateEditMode={() => {setEditMode(false)}}/>
                : <ProfileData
                    profile={props.profile}
                    isOwner={props.isOwner}
                    activateEditMode={() => {setEditMode(true)}}/>}


        </div>
    )
}

const ProfileData = (props) => {
    return <div>
        {props.isOwner && <button onClick={props.activateEditMode}>edit</button>}
        <div><b>Nickname:</b> {props.profile.fullName}</div>
        <div><b>About me:</b> {props.profile.aboutMe}</div>
        <div><b>Looking for a job: </b> {props.profile.lookingForAJob ? "yes" : "no"}</div>
        {
            props.profile.lookingForAJob &&
            <div><b>Skills: </b> {props.profile.lookingForAJobDescription}</div>
        }
        <div className={s.contacts}> {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} ContactTitle={key} ContactValue={props.profile.contacts[key]}/>
        })} </div>
    </div>
}

const Contact = ({ContactTitle, ContactValue}) => {
    return <div><b>{ContactTitle}: </b> {ContactValue}</div>
}

export default ProfileInfo