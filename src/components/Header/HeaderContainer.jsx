import Header from "./Header";
import React from "react";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth_reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    // Контейнерная компонента возвращает JSX с презентационной и передает в них пропсы
    render() {
        return <Header {...this.props}/>
    }

}

const mapStateToProps = (state) => {
    return{
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,{getAuthUserData, logout})(HeaderContainer)