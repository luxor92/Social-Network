import s from './Dialogs.module.css'
import React from "react";
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik"
import * as Yup from "yup";
import {InitialStateType} from "../../redux/dialogs_reducer";

type PropsType = {
    dialogsPage: InitialStateType,
    sendMessage: (messageText: string) => void,
}

const Dialogs: React.FC<PropsType> = (props) => {
    let addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody)
    }

    const initialValues = {
        newMessageBody: "",
    };
    const onSubmit = (values: any, onSubmitProps: any) => {
        addNewMessage(values)
        console.log("Submit props", onSubmitProps)
        onSubmitProps.setSubmitting(false)
    };
    const validationSchema = Yup.object({
        newMessageBody: Yup.string()
            .required("Empty message")
            .max(50, "Too long, bro!")
    })

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <Dialog name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);

    if (props.isAuth === false) return <Redirect to="/login"/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {formik => {
                        return (
                    <Form>
                        <div>
                            <Field as={"textarea"}
                                   id={"newMessageBody"}
                                   name={"newMessageBody"}
                                   placeholder={"Enter your message"}
                            />
                            <div><ErrorMessage name={"newMessageBody"}/></div>
                        </div>

                        <button type={"submit"} disabled={! formik.isValid || formik.isSubmitting}>Send</button>
                    </Form>)}}
                </Formik>

            </div>
        </div>
    )
}

export default Dialogs;