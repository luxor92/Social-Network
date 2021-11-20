import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react";
import {addPostActionCreator, updateNewPostActionCreator} from "../../../redux/profile_reducer";

const MyPosts = (props) => {
    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch(addPostActionCreator())
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewPostActionCreator(text));
    }

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);
    return (
        <div className={s.content}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}
                              ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
                <div>
                        {postsElements}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;
