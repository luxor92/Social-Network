import React from "react";
import {connect} from "react-redux";
import {follow, requestUsers, setCurrentPage, toggleFollowingProgress, unfollow} from "../../redux/users_reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getCurrentPage, getFollowintInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers} from "../../redux/users_selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

   onPagedChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        this.props.setCurrentPage(pageNumber)
    }

    render () {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users   totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPagedChanged={this.onPagedChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        followingInProgress={this.props.followingInProgress}/>
                        </>
    };
}

/*let mapStateToProps = (state) => {
    return {
        // В функциональную компоненту придет пропс users со значениями из state.usersPage.users
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}*/

let mapStateToProps = (state) => {
    return {
        // В функциональную компоненту придет пропс users со значениями из state.usersPage.users
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowintInProgress(state),
    }
}


export default compose(withAuthRedirect,
    connect(mapStateToProps,
    {follow, unfollow, setCurrentPage, toggleFollowingProgress,
        getUsers: requestUsers}))(UsersContainer)
