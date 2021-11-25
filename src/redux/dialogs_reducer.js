const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

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
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type:SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({type:UPDATE_NEW_MESSAGE_BODY, body: body})

export default dialogsReducer;