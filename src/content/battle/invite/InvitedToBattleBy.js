import React from 'react';
import {connect} from 'react-redux';
import '../../../component/modal/styles.css';
import {getText, TEXT_ACCEPT, TEXT_REJECT, TEXT_INVITED_TO_BATTLE_BY} from "../../../lang";
import Friend from "../../../component/friend/Friend";
import {CREAM_COLOR} from "../../../util/style/constant";
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import Modal from "../../../component/modal/Modal";

class InvitedToBattleBy extends React.PureComponent {

    render() {
        const {invitedToBattleBy, onAccept, onReject} = this.props;
        if (!invitedToBattleBy) {
            return null;
        }
        const actions = <div className='actions'>
            <div onClick={onAccept}><span>{getText(TEXT_ACCEPT)}</span><FaCheckCircle color={CREAM_COLOR}/></div>
            <div onClick={onReject}><span>{getText(TEXT_REJECT)}</span><FaTimesCircle color={CREAM_COLOR}/></div>
        </div>;
        const content = <div>
            <div className='justifyCenter'>{getText(TEXT_INVITED_TO_BATTLE_BY)}</div>
            <Friend friend={invitedToBattleBy} actions={actions}/></div>;
        return <Modal content={content}/>
    }
}

export default connect(
    (state) => ({
        invitedToBattleBy: state.battle.invitedBy,
    }),
    (dispatch) => ({})
)(InvitedToBattleBy);
