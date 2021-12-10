import styles from './Users.module.css';
import React from "react";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

let Users = (props) => {

    return (<div>

        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                    totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}/>

            {props.users.map(u => <div key={u.id}>
                    <span>
                    <div>
                        <NavLink to={'profile/' + u.id}>
                        <img alt={""} src={u.photos.small != null ?
                            u.photos.small :
                            'https://vokrug.tv/pic/news/6/b/d/a/6bdae6bfa22e5dd4d1694752b3ba23ac.jpg'}
                             className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              onClick={() => {
                                                  props.unfollow(u.id)
                                              }}> Unfollow </button> :

                            <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {
                                        props.follow(u.id)
                                    }}>Follow</button>
                        }
                    </div>
                </span><span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
                </div>)
            }
        </div>)
}

export default Users