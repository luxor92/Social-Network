import React from "react";
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import s from "../News/News.module.css";
import * as Yup from "yup"

const Login = (props) => {

    const initialValues = {
        login: "",
        password: "",
        rememberMe: false,
    }
    const onSubmit = values => {
        console.log(values)
    }
    const validationSchema = Yup.object({
      login: Yup.string().required("Enter your login to authorization"),
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
    })
    console.log("Formik changes", formik.values)*/

    return <div>
        <h1>LOGIN</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            className={s.wrapperform}>
            <Form>
                <div>
                    <Field type={"text"} id={"login"} name={"login"} placeholder={"Login"}/>
                    <ErrorMessage name={"login"}/>
                </div>
                <div>
                    <Field type={"password"} id={"password"} name={"password"} placeholder={"Password"}/>
                    <ErrorMessage name={"password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} id={"rememberMe"} name={"rememberMe"}/>
                    <ErrorMessage name={"rememberMe"}/>
                    <label htmlFor={"rememberMe"}> Remember Me </label>
                </div>
                <div>
                    <button type={"submit"}>Login</button>
                </div>
            </Form>
        </Formik>

    </div>
}

export default Login;