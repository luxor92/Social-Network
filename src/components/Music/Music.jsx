import s from "./Music.module.css"
import {ErrorMessage, Field, Form, Formik, FieldArray} from "formik";
import * as Yup from "yup";

const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
        facebook: "",
        instagram: ""
    },
    phoneNumbers: ["", ""],
    phNumbers: [""]
};
const onSubmit = values => {
    console.log("Formik state", values)
};
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required"),
    channel: Yup.string().required("Required"),
    comments: "",
    address: ""
})

function TextError(props) {
    return (
        <div className={s.error}>
            {props.children}
        </div>
    )
}

const Music = () => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            className={s.wrapperform}>
            <Form>
                <div className={s.formcontrol}>
                    <label htmlFor={"name"} className={s.label}> Name </label>
                    <Field type={"text"}
                           id={"name"}
                           name={"name"}
                           className={s.input}/>
                    <ErrorMessage name={"name"} component={TextError}/>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"e-mail"} className={s.label}> E-mail </label>
                    <Field type={"e-mail"}
                           id={"e-mail"}
                           name={"email"}
                           className={s.input}/>
                    <ErrorMessage name={"email"}>
                        {
                            (errorMsg) => <div className={s.error}>{errorMsg}</div>
                        }
                        </ErrorMessage>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"channel"} className={s.label}> Channel </label>
                    <Field type={"text"}
                           id={"channel"}
                           name={"channel"}
                           className={s.input}/>
                    <ErrorMessage name={"channel"}/>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"comments"} className={s.label}>Comments</label>
                    <Field as={"textarea"} id={"comments"} name={"comments"} className={s.input}/>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"Address"} className={s.label}>Address</label>
                    <Field name={"address"}>
                        {
                            (props) => {
                                const {field, form, meta} = props
                                console.log("Render props", props)
                                return (
                                    <div>
                                        <input id={"address"} {...field} className={s.input}/>
                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )
                            }
                        }
                    </Field>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"facebook"} className={s.label}> Facebook </label>
                    <Field type={"text"}
                           id={"facebook"}
                           name={"social.facebook"}
                           className={s.input}/>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"instagram"} className={s.label}> Instagram </label>
                    <Field type={"text"}
                           id={"instagram"}
                           name={"social.instagram"}
                           className={s.input}/>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"primaryPh"} className={s.label}> Primary phone </label>
                    <Field type={"text"}
                           id={"primaryPh"}
                           name={"phoneNumbers[0]"}
                           className={s.input}/>
                </div>

                <div className={s.formcontrol}>
                    <label htmlFor={"secondaryPh"} className={s.label}> Secondary phone </label>
                    <Field type={"text"}
                           id={"secondaryPh"}
                           name={"phoneNumbers[1]"}
                           className={s.input}/>
                </div>

                <div className={s.formcontrol}>
                    <label className={s.label}> List of phone numbers </label>
                    <FieldArray name={"phNumbers"}>
                        {
                            (fieldArrayProps) => {
                                console.log("Field Array Props:", fieldArrayProps)
                                const {push, remove, form} = fieldArrayProps
                                const {values} = form
                                const {phNumbers} = values
                                return <div>{
                                    phNumbers.map((phNumber, index) => (
                                        <div key={index}>
                                            <Field name={`phNumbers[${index}]`}/>
                                            {
                                                index > 0 && <button type={"button"} onClick={() => remove(index)}> - </button>
                                            }
                                            <button type={"button"} onClick={() => push(index)}> + </button>
                                        </div>
                                    ))
                                }</div>
                            }
                        }
                    </FieldArray>
                </div>

                <button type={"submit"} className={s.formcontrol}>Submit</button>
            </Form>
        </Formik>
)
}

export default Music