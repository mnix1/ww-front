import React from 'react';
import {connect} from 'react-redux';
import {ERROR_CONNECTION_PROBLEM, getError} from "../../../lang/langError";
import Modal from "../../../component/modal/Modal";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import {getText, TEXT_RECONNECT} from "../../../lang/langText";
import {Loading} from "../../../component/loading/Loading";
import {clearProfileFetch} from "../ProfileFetch";

class ConnectionProblem extends React.PureComponent {
    render() {
        const {socket, socketOpen, signedIn, dispatch} = this.props;
        if (!signedIn || !socket || socketOpen !== false) {
            return null;
        }
        return <Modal renderExit={false}>
            <div>
                {getError(ERROR_CONNECTION_PROBLEM)}
            </div>
            <div className='marginTopRem justifyCenter paddingTopRem'>
                <div className='justifyCenter flexColumn'>
                    <Button material={BUTTON_MATERIAL_BOX_SHADOW} onClick={() => {
                        clearProfileFetch(dispatch);
                        socket.init();
                    }}>{getText(TEXT_RECONNECT)}</Button>
                </div>
                <Loading/>
            </div>
        </Modal>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socketOpen: state.socket.open,
        socket: state.socket.socket,
        signedIn: state.profile.signedIn,
    }),
    (dispatch) => ({
        dispatch
    })
)(ConnectionProblem);
