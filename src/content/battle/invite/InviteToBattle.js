import React from 'react';
import {connect} from 'react-redux';
import '../../../component/modal/styles.css';
import {getText, TEXT_CANCEL, TEXT_INVITE_TO_BATTLE, TEXT_WAITING_FOR_RESPONSE} from "../../../lang";
import {CREAM_COLOR} from "../../../util/style/constant";
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import Modal from "../../../component/modal/Modal";
import _ from 'lodash';
import {statusChanged} from "../../../redux/reducer/battle";
import {BATTLE_STATUS_CANCELED_FRIEND, BATTLE_STATUS_WAITING_FRIEND} from "../../../util/battleHelper";
import {clearBattleStartFriendFetch} from "../fetch/BattleStartFriendFetch";
import Profile from "../../../component/profile/Profile";

class InviteToBattle extends React.PureComponent {

    render() {
        const {status, tag, friends, onCancel} = this.props;
        if (status !== BATTLE_STATUS_WAITING_FRIEND) {
            return null;
        }
        const friend = _.find(friends, e => e.tag === tag);
        const actions = <div className='actions'>
            <div onClick={onCancel}><span>{getText(TEXT_CANCEL)}</span><FaTimesCircle color={CREAM_COLOR}/></div>
        </div>;
        const content = <div>
            <div className='justifyCenter'>{getText(TEXT_INVITE_TO_BATTLE)}</div>
            <Profile {...friend} actions={actions}/>
            <div className='justifyCenter'>{getText(TEXT_WAITING_FOR_RESPONSE)}</div>
        </div>;
        return <Modal content={content}/>
    }
}

export default connect(
    (state) => ({
        tag: state.battle.tag,
        status: state.battle.status,
        friends: state.friend.friends,
    }),
    (dispatch) => ({
        onCancel: () => {
            clearBattleStartFriendFetch(dispatch);
            dispatch(statusChanged(BATTLE_STATUS_CANCELED_FRIEND));
        }
    })
)(InviteToBattle);
