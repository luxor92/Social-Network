import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import s from "./Login.module.css";
import * as Yup from "yup"
import {connect} from "react-redux";
import {getCaptchaUrlTC, login, logout} from "../../redux/auth_reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: null | string) => void
}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
        captcha: null
    }
    const onSubmit = (formData: any  /*{setStatus}*/) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha /*setStatus*/)
/*        { props.captcha && alert(props.captcha)}
        console.log(props.captchaUrl)*/
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Enter your login to authorization")
            .email('Invalid email'),
        password: Yup.string()
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
            .min(8, "Minimal length - 8 symbols")
            .required("Enter the password to authorization"),
        rememberMe: Yup.boolean(),
    })

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    } else {
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
{/*                        {props.captchaUrl && <img src={props.captchaUrl}/>}
                        <div>{props.captchaUrl
                        && <Field type={"input"} id={"captcha"} name={"captcha"} placeholder={"Enter symbols"}/>}</div>*/}
                        <div>
                            <button type={"submit"} className={s.formcontrol}>Login</button>
                        </div>
                    </Form>)}
            </Formik>

        </div>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login, logout, getCaptchaUrlTC})(Login);
