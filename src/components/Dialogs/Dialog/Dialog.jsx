import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

const Dialog = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div>
            <NavLink to={path}
                     className={s.dialogItems} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default Dialog