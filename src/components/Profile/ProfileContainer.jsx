import React from "react";
import Profile from "./Profile";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile_reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
            let userId = this.props.match.params.userId;
            if (!userId) {
                userId = 21031;
            }
             this.props.getUserProfile(userId);
             this.props.getStatus(userId);
    }

    render() {
        return (
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
})

/* Эта история нужна, чтобы вычленить параметр id из URL. Сейчас используются хуки вместо этого
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
 Переменная равна HOC, который на выходе выдает ProfileContainer
let AuthRedirectComponent = withAuthRedirect(ProfileContainer)*/

export default compose(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter)
(ProfileContainer)