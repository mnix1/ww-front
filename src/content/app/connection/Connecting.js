import React from 'react';
import {connect} from 'react-redux';
import Modal from "../../../component/modal/Modal";
import {getText, TEXT_CONNECTING} from "../../../lang/langText";
import {Loading} from "../../../component/loading/Loading";

class Connecting extends React.PureComponent {
    render() {
        const {socket, signedIn, socketOpen} = this.props;
        if (!signedIn || (socket && socketOpen !== undefined)) {
            return null;
        }
        return <Modal renderExit={false}>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>{getText(TEXT_CONNECTING)}</div>
                <div className='paddingLeftRem inlineBlock'>
                    <Loading/>
                </div>
            </div>
        </Modal>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        signedIn: state.profile.signedIn,
        socketOpen: state.socket.open,
        socket: state.socket.socket,
    }),
    (dispatch) => ({})
)(Connecting);
