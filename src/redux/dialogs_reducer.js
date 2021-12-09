const SEND_MESSAGE = 'social-network/dialogs/SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'social-network/dialogs/UPDATE-NEW-MESSAGE-BODY'
const ADD_MESSAGE = 'social-network/dialogs/ADD-MESSAGE';

let initialState = {
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

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        case ADD_MESSAGE:
            let bodik = action.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: bodik}]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type:SEND_MESSAGE, newMessageBody: newMessageBody})
export const updateNewMessageBodyCreator = (body) => ({type:UPDATE_NEW_MESSAGE_BODY, body: body})
export const addNewMessageCreator = (newMessageBody) => ({type:ADD_MESSAGE, newMessageBody})


export default dialogsReducer;