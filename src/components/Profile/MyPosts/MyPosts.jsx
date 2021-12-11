import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const MyPosts = (props) => {
    const initialValues = {
        newPostElement: "",
    };
    const onSubmit = values => {
        onAddPost(values.newPostElement)
    };
    const validationSchema = Yup.object({
        newPostElement: Yup.string().required("Required")
    })

    let postsElements =
        props.posts.map( p => <Post message={p.message} key={p.id} likesCount={p.likesCount}/>);

    let onAddPost = (newPostElement) => {
        props.addPost(newPostElement);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form>
                    <div>
                        <Field as={"textarea"}
                               id={"newPostElement"}
                               name={"newPostElement"}
                               placeholder={"Your post"}
                        />
                    </div>

                    <button type={"submit"}>Add post</button>
                </Form>
            </Formik>

            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;