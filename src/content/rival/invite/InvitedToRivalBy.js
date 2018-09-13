import React from 'react';
import {connect} from 'react-redux';
import '../../../component/modal/styles.css';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';
import {getText, TEXT_ACCEPT, TEXT_REJECT} from "../../../lang/langText";
import {CREAM_COLOR} from "../../../util/style/constant";
import Profile from "../../../component/profile/Profile";
import Modal from "../../../component/modal/Modal";
import {rivalInviteAccepted, rivalInviteRejected} from "../../../redux/reducer/rival";
import {RIVAL_STATUS_INVITED_FRIEND, RIVAL_TYPE_INVITED_TO_BY_TEXT} from "../../../util/rivalHelper";

class InvitedToRivalBy extends React.PureComponent {

    render() {
        const {invitedToRivalBy, status, onAccept, onReject} = this.props;
        if (!invitedToRivalBy || status !== RIVAL_STATUS_INVITED_FRIEND) {
            return null;
        }
        const actions = <div className='actions'>
            <div onClick={onAccept}><span>{getText(TEXT_ACCEPT)}</span><FaCheckCircle color={CREAM_COLOR}/></div>
            <div onClick={onReject}><span>{getText(TEXT_REJECT)}</span><FaTimesCircle color={CREAM_COLOR}/></div>
        </div>;
        const content = <div>
            <div className='justifyCenter'>{getText(RIVAL_TYPE_INVITED_TO_BY_TEXT[invitedToRivalBy.type])}</div>
            <Profile {...invitedToRivalBy.friend} actions={actions}/></div>;
        return <Modal renderExit={false} content={content}/>
    }
}

export default connect(
    (state) => ({
        invitedToRivalBy: state.rival.invitedBy,
        status: state.rival.status,
    }),
    (dispatch) => ({
        onAccept: () => {
            dispatch(rivalInviteAccepted())
        },
        onReject: () => {
            dispatch(rivalInviteRejected());
        }
    })
)(InvitedToRivalBy);
