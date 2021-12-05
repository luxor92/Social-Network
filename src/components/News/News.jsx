import s from "./News.module.css"
import {useFormik} from "formik";
import * as Yup from "yup";

const initialValues = {
    name: "",
    email: "",
    channel: "",
};
const onSubmit = values => {
    console.log("Formik state", values)
};
/*const validate = values => {
    let errors = {}

    if (!values.name) {
        errors.name = "Required"
    }

    if (!values.email) {
        errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.channel) {
        errors.channel = "Required"
    }
    return errors
}*/

// Если через Yup
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string()
                .email("Invalid email format")
                .required("Required"),
    channel: Yup.string().required("Required")
})

const News = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        // validate
    })

    // console.log("Visited areas:", formik.values)
    // console.log("Visited areas:", formik.errors)
    // console.log("Visited areas:", formik.touched)

    return (
        <div className={s.wrapperform}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.formcontrol}>
                    <label htmlFor={"name"} className={s.label}> Name </label>
                    <input type={"text"} id={"name"} name={"name"} className={s.input}
                           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                    {formik.touched.name && formik.errors.name ? <div className={s.error}> {formik.errors.name}</div> : null}
                </div>
                <div className={s.formcontrol}>
                    <label htmlFor={"e-mail"} className={s.label}> E-mail </label>
                    <input type={"e-mail"} id={"e-mail"} name={"email"} className={s.input}
                           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email ? <div className={s.error}> {formik.errors.email}</div> : null}
                </div>
                <div className={s.formcontrol}>
                    <label htmlFor={"channel"} className={s.label}> Channel </label>
                    <input type={"text"} id={"channel"} name={"channel"} className={s.input}
                           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.channel}/>
                    {formik.touched.channel && formik.errors.channel ? <div className={s.error}> {formik.errors.channel}</div> : null}
                </div>

                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}

export default News