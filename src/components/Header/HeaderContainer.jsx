import Header from "./Header";
import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth_reducer";
import {checkAuth} from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        checkAuth().then(response => {
                if (response.resultCode === 0) {
                    let {id, email, login} = response.data;
                    this.props.setAuthUserData(id, email, login)
                }
/*                this.props.userId(response.data.userId)
                this.props.email(response.data.email);
                this.props.login(response.data.login)*/
            })
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

export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer)