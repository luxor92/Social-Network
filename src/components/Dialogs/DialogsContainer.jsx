import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        }
    }
}

/*
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
let AuthRedirectComponent = withAuthRedirect(Dialogs)
*/

// Упаковывает конвейер обработчиков в единый объект
// Две скобки у функции означают, что вызывается функция compose, а потом вызывается её результат
export default compose(connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs)