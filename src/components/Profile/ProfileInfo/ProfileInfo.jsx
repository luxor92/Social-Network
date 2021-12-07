import s from './ProfileInfo.module.css'
import ProfileStatusHooks from "./ProfileStatusHooks";

const ProfileInfo = (props) => {

    return (
        <div>
{/*            <div><img className={s.header_content}
                      src='https://moscowprivatetours.com/wp-content/uploads/2021/05/background.webp'></img></div>*/}
            <div className={s.descriptionBlock}>
                <img alt="" src={props.profile.photos.large}/>
                <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo