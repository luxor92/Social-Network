import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import s from "./Login.module.css";
import * as Yup from "yup"
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth_reducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {

    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    }
    const onSubmit = (formData, {setStatus}) => {
        props.login(formData.email, formData.password, formData.rememberMe, setStatus)
        console.log(formData.email)
    }
/*    const onSubmit = values => {
        props.login(values.email, values.password, values.rememberMe)
        console.log(values)
    }*/
    const validationSchema = Yup.object({
      email: Yup.string()
          .required("Enter your login to authorization")
          .email('Invalid email'),
      password: Yup.string()
          .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
          .min(8, "Minimal length - 8 symbols")
          .required("Enter the password to authorization"),
      rememberMe: Yup.boolean()
    })
/*    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
            rememberMe: false,
        },
        onSubmit: values => {
            console.log("Formik state", values)
        }
    })*/

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    else {
    return <div>
        <div className={s.formcontrol}><h2>LOGIN</h2></div>
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            className={s.wrapperform}>
            {({status}) => (
            <Form>
                <div className={s.formcontrol}>
                    <Field type={"text"} id={"email"} name={"email"} placeholder={"E-mail"}/>
                    <ErrorMessage name={"email"}/>
                </div>
                <div className={s.formcontrol}>
                    <Field type={"password"} id={"password"} name={"password"} placeholder={"Password"}/>
                    <ErrorMessage name={"password"}/>
                    {status}
                </div>
                <div className={s.formcontrol}>
                    <Field type={"checkbox"} id={"rememberMe"} name={"rememberMe"}/>
                    <ErrorMessage name={"rememberMe"}/>
                    <label htmlFor={"rememberMe"}> Remember Me </label>
                </div>
                <div>
                    <button type={"submit"} className={s.formcontrol}>Login</button>
                </div>
            </Form> )}
        </Formik>

    </div>}
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login, logout})(Login);