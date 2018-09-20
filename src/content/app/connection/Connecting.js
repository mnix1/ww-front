import React from 'react';
import {connect} from 'react-redux';
import Modal from "../../../component/modal/Modal";
import {getText, TEXT_CONNECTING} from "../../../lang/langText";
import {Loading} from "../../../component/loading/Loading";

class Connecting extends React.PureComponent {
    render() {
        const {socket, signedIn} = this.props;
        if (!signedIn || socket) {
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
        socket: state.socket.socket,
    }),
    (dispatch) => ({})
)(Connecting);
