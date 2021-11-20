import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";

let store = {
    _state: {
        profilePage:{
            posts: [
                {id: 1, message: 'Hello world!', likesCount: 15},
                {id: 2, message: 'White Power', likesCount: 88},
                {id: 3, message: 'Don\'t worry be happy', likesCount: 55}
            ],
            newPostText: 'Kunteynir'
        },

        dialogsPage:{
            dialogs: [
                {id: 1, name: 'Jonny'},
                {id: 2, name: 'Kenny'},
                {id: 3, name: 'Jinx'},
                {id: 4, name: 'Kaisa'},
                {id: 5, name: 'Tom'}
            ],

            messages: [
                {id: 1, message: 'Hello world'},
                {id: 2, message: 'How are you'},
                {id: 3, message: 'Do you have hash?'}
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber () {
        console.log('State was changed')
    },

    getState () {
        return this.state;
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state)
    }
}

export default store;
window.store=store