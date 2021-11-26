import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import {setUserProfile} from "../../redux/profile_reducer";
import {connect} from "react-redux";
import userId from "./MatchContainer";

class ProfileContainer extends React.Component {
    componentDidMount() {
        // let userId = this.props.match.params.userId;
        // if(!userId) {
        //    userId=2;
        // }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
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


export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)