import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://logopond.com/logos/d64968d8596b012955e1708eea03f756.png"></img>
       {props.message}
      <div>
        <span> Like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
