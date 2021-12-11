import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React from "react";

const ProfileDataForm = (props) => {

    const initialValues = {
        fullName: props.profile.fullName,
        lookingForAJobDescription: props.profile.lookingForAJobDescription,
        lookingForAJob: props.profile.lookingForAJob,
        aboutMe: props.profile.aboutMe,
        contacts: {
            github: props.profile.contacts.github,
            vk: props.profile.contacts.vk,
            facebook: props.profile.contacts.facebook,
            instagram: props.profile.contacts.instagram,
            twitter: props.profile.contacts.twitter,
            website: props.profile.contacts.website,
            youtube: props.profile.contacts.youtube,
            mainLink: props.profile.contacts.mainLink,
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(
                () => {
                    props.deactivateEditMode()
                }
            )
            .catch(error => alert(error))
        console.log(formData)
    }

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required("Please add your full name")
            .min(3, "Too short")
    })

    return <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>

        <Form>
            <div>
                <button type={"submit"}>save</button>
            </div>

            <div>
                <label><b>Nickname: </b></label>
                <Field
                    name={"fullName"}
                    id={"fullName"}
                    as={"input"}/>
                <ErrorMessage name={"fullName"}/>
            </div>
            <div>
                <label><b>Looking for a job: </b></label>
                <Field
                    name={"lookingForAJob"}
                    id={"lookingForAJob"}
                    type={"checkbox"}/>
                <ErrorMessage name={"lookingForAJob"}/>
            </div>
            <div>
                <label><b>Skills: </b></label>
                <Field
                    name={"lookingForAJobDescription"}
                    id={"lookingForAJobDescription"}
                    as={"input"}/>
                <ErrorMessage name={"lookingForAJobDescription"}/>
            </div>
            <div>
                <label><b>About me: </b></label>
                <Field
                    name={"aboutMe"}
                    id={"aboutMe"}
                    as={"input"}/>
                <ErrorMessage name={"aboutMe"}/>
            </div>

            <div> {Object.keys(props.profile.contacts).map(key => {
                return <div key={key}>
                    <label><b>{key}: </b></label>
                    <div>
                        <Field
                            name={"contacts." + key}
                            placeholder={key}
                            id={"contacts." + key}
                            as={"input"}/>
                        <ErrorMessage name={"contacts." + key}>

                        </ErrorMessage>
                    </div>
                </div>
            })}
            </div>

        </Form>
    </Formik>
}

export default ProfileDataForm