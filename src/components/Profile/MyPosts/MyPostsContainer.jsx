import {addPostAC, updateNewPostAC} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPost: (text) => {
            let action = updateNewPostAC(text);
            dispatch(action);
        },
        addPost: (newPostElement) => {
            dispatch(addPostAC(newPostElement));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;