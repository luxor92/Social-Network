import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return(
        <header className={s.header}><img className={s.img} alt={""}
            src='https://illustrators.ru/uploads/illustration/image/985967/main_p0046-moscow-logo-dribble.png'></img>

        <div className={s.loginBlock}>
            { props.isAuth
                ? <div> {props.login} <button onClick={props.logout}>Logout</button></div>
                : <NavLink to={"/login"}>Login</NavLink>}
        </div>
        </header>)
}

export default Header
