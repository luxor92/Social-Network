import React, {Suspense} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const News = React.lazy(() => import("./components/News/News"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            // Для react-router-dom v6 необходимо обернуть Route-компоненты в Routes
            // В свойствах: path='/profile/*' element={<ProfileContainer />
            return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Switch>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route exact path='/' render={() => <Redirect from="/" to="/profile" />}/>
                            <Suspense fallback={<div><Preloader/></div>}>
                                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='/users' render={() => <UsersContainer/>}/>
                            </Suspense>

                            <Route path='/login' render={() => <Login/>}/>
                            <Route render={() => <div>Page not found</div>}/>
                        </Switch>
                    </div>
                </div>
            );
        }
    }
}

// Не забыть закомбайнить редьюсер в redux-store
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

// export default connect(mapStateToProps, {initializeApp})(App);

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

let SocialNetworkApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SocialNetworkApp
