import React from "react";
import Profile from "./Profile";
import {getUserProfile} from "../../redux/profile_reducer";
import {connect} from "react-redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
       // Заменить, когда дело до хуков дойдет
        this.props.getUserProfile()
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>)
    }
};

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})


export default connect(mapStateToProps, {getUserProfile})(ProfileContainer)