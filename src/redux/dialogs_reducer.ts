import {InferActionsType} from "./redux-store";

type DialogType = {
    id: number | null
    name: string | null
}
type MessageType = {
    id: number | null
    message: string | null
}
type ActionsType = InferActionsType<typeof actions>
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

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'social-network/dialogs/UPDATE-NEW-MESSAGE-BODY':
            return {
                ...state,
                newMessageBody: action.body
            };
        case 'social-network/dialogs/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        case 'social-network/dialogs/ADD-MESSAGE':
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

export const actions = {
    sendMessage: (newMessageBody: string) => ({type:'social-network/dialogs/SEND-MESSAGE', newMessageBody: newMessageBody} as const),
    updateNewMessageBodyCreator: (body: string) => ({type:'social-network/dialogs/UPDATE-NEW-MESSAGE-BODY', body: body} as const),
    addNewMessageCreator: (newMessageBody: string) => ({type:'social-network/dialogs/ADD-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;