import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = (props) => {
    // Для css-стилей используется className внутри тегов
    // Компонента является функцией, принимающей пропсы на входе и возвращающая JSX-разметку на выходе
    // Route используются для отрисовки компонент при смене URL'а
    // В каждую компоненту передаются только необходимые для неё пропсы
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/profile' element={<Profile store={props.store}/>}/>
                    <Route path='/dialogs' element={<DialogsContainer store={props.store} state={props.state}/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default App;
