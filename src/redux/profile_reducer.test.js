import profileReducer, {addPostAC, deletePostAC} from "./profile_reducer";
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

let state = {
    posts: [
        {id: 1, message: 'Hello world!', likesCount: 15},
        {id: 2, message: 'White Power', likesCount: 88},
        {id: 3, message: 'Don\'t worry be happy', likesCount: 55}],
    newPostText: ""
};

it("Length of posts should be incremented", () => {
    // 1. Подготовка исходных данных (Test data)
    let action = addPostAC("Lucky")

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts.length).toBe(4);
})

it("New post message should be actual", () => {
    // 1. Подготовка исходных данных (Test data)
    let action = addPostAC("Lucky")

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts[3].message).toBe("Lucky")
})

it("After deleting length of posts should be decrement", () => {
    // 1. Подготовка исходных данных (Test data)
    let action = deletePostAC(3)

    // 2. Action
    let newState = profileReducer(state, action)

    // 3. Expectation
    expect(newState.posts.length).toBe(2)
})