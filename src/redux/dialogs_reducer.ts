const SEND_MESSAGE = 'social-network/dialogs/SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'social-network/dialogs/UPDATE-NEW-MESSAGE-BODY'
const ADD_MESSAGE = 'social-network/dialogs/ADD-MESSAGE';

type DialogType = {
    id: number | null
    name: string | null
}
type MessageType = {
    id: number | null
    message: string | null
}
export type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string | null
}
let initialState: InitialStateType = {
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

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string):SendMessageCreatorType =>
    ({type:SEND_MESSAGE, newMessageBody: newMessageBody})

type updateNewMessageBodyCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    body: string
}
export const updateNewMessageBodyCreator = (body: string): updateNewMessageBodyCreatorType =>
    ({type:UPDATE_NEW_MESSAGE_BODY, body: body})

type addNewMessageCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}
export const addNewMessageCreator = (newMessageBody: string): addNewMessageCreatorType =>
    ({type:ADD_MESSAGE, newMessageBody})


export default dialogsReducer;