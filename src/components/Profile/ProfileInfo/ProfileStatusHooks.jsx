import React, {useEffect, useState} from "react";

const ProfileStatusHooks = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    useEffect(() => {setStatus(props.status)}, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
            <div>
                <b>Status: </b><span onDoubleClick={activateEditMode}> {props.status || "Empty space"} </span>
            </div>
            }

            { editMode &&
            <div>
                <input onBlur={deactivateEditMode} onChange={onStatusChange} value={status} autoFocus={true}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusHooks