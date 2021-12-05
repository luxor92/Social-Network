import {addNewMessageCreator, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        addNewMessage: () => {
            dispatch(addNewMessageCreator());
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