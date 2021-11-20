import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

const Dialog = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div>
            <NavLink to={path}
                     className={dialogData => dialogData.isActive ? s.active : s.dialog}>{props.name}</NavLink>
        </div>
    )
}

export default Dialog