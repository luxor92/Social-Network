import {actions} from "../../redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

// Упаковывает конвейер обработчиков в единый объект
// Две скобки у функции означают, что вызывается функция compose, а потом вызывается её результат
export default compose(connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    withAuthRedirect)
(Dialogs)