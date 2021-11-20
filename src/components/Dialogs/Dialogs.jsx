import s from './Dialogs.module.css'
import React from "react";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs_reducer";

const Dialogs = (props) => {

    let newMessageBody = props.dialogsPage.newMessageBody;

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.dispatch(updateNewMessageBodyCreator(body));
    };

    let dialogsElements = props.dialogsPage.dialogs.map(d => <Dialog name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   placeholder='Enter your message'
                                   onChange={onNewMessageChange}>
                    </textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
)
}

export default Dialogs