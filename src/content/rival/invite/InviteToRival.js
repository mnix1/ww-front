import React from 'react';
import {connect} from 'react-redux';
import '../../../component/modal/styles.css';
import {getText, TEXT_CANCEL, TEXT_WAITING_FOR_RESPONSE} from "../../../lang/langText";
import {CREAM_COLOR} from "../../../util/style/constant";
import {FaTimesCircle} from 'react-icons/fa';
import Modal from "../../../component/modal/Modal";
import _ from 'lodash';
import {statusChanged} from "../../../redux/reducer/rival";
import {
    RIVAL_STATUS_CANCELED_FRIEND,
    RIVAL_STATUS_START_FRIEND,
    RIVAL_TYPE_INVITE_TEXT
} from "../../../util/rivalHelper";
import {clearRivalStartFriendFetch} from "../fetch/RivalStartFriendFetch";
import Profile from "../../../component/profile/Profile";

class InviteToRival extends React.PureComponent {

    render() {
        const {status, tag, rivalType, friends, onCancel} = this.props;
        if (status !== RIVAL_STATUS_START_FRIEND) {
            return null;
        }
        const friend = _.find(friends, e => e.tag === tag);
        const actions = <div className='actions'>
            <div onClick={onCancel}><span>{getText(TEXT_CANCEL)}</span><FaTimesCircle color={CREAM_COLOR}/></div>
        </div>;
        return <Modal renderExit={false}>
            <div>
                <div className='justifyCenter'>{getText(RIVAL_TYPE_INVITE_TEXT[rivalType])}</div>
                <Profile {...friend} actions={actions}/>
                <div className='justifyCenter'>{getText(TEXT_WAITING_FOR_RESPONSE)}</div>
            </div>
        </Modal>
    }
}

export default connect(
    (state) => ({
        tag: state.rival.tag,
        rivalType: state.rival.rivalType,
        status: state.rival.status,
        friends: state.friend.friends,
    }),
    (dispatch) => ({
        onCancel: () => {
            clearRivalStartFriendFetch(dispatch);
            dispatch(statusChanged(RIVAL_STATUS_CANCELED_FRIEND));
        }
    })
)(InviteToRival);
