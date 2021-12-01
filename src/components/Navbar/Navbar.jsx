import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    // For r-r-d v6 className={navData=>navData.isActive?s.active:s.item}
    return(
        <nav className={s.nav}>
        <div><NavLink to='/profile' className={s.item} activeClassName={s.active}>Profile</NavLink></div>
        <div><NavLink to='/dialogs' className={s.item} activeClassName={s.active}>Messages</NavLink></div>
        <div><NavLink to='/news' className={s.item} activeClassName={s.active}>News</NavLink></div>
        <div><NavLink to='/music' className={s.item} activeClassName={s.active}>Music</NavLink></div>
        <div><NavLink to='/settings' className={s.item} activeClassName={s.active}>Settings</NavLink></div>
        <div><NavLink to='/users' className={s.item} activeClassName={s.active}>Users</NavLink></div>
        </nav>
    )
}

export default Navbar