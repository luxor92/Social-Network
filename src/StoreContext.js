import React from 'react';
import store from "./redux/redux-store";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

let rerenderEntireTree = (state) =>{
    ReactDOM.render(
        // BrowserRouter необходимо обернуть вокруг React-приложения единожды
        <BrowserRouter>
            <App state={state} dispatch={store.dispatch.bind(store)} store={store}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

// rerender проверяет изменился ли state
rerenderEntireTree(store.getState())

// rerender подписано на изменение store
// Подписка на изменение store. Запуск анонимной стрелочной функции при изменении store
store.subscribe (() => {
    let state = store.getState()
    rerenderEntireTree(state)
});