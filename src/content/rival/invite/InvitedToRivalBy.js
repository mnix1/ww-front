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
import {
    BATTLE_ROUTE,
    CAMPAIGN_WAR_ROUTE,
    CHALLENGE_FRIEND_INIT_ROUTE,
    CHALLENGE_RESPONSE_ROUTE,
    CHALLENGE_ROUTE,
    TRAINING_TASK_ROUTE,
    WAR_ROUTE
} from "../../routes";
import _ from 'lodash';

class InvitedToRivalBy extends React.PureComponent {

    canRenderInvitedToBattle() {
        const {path} = this.props;
        return !_.includes(path, BATTLE_ROUTE)
            && !_.includes(path, WAR_ROUTE)
            && path !== CAMPAIGN_WAR_ROUTE
            && path !== TRAINING_TASK_ROUTE
            && path !== CHALLENGE_ROUTE
            && path !== CHALLENGE_RESPONSE_ROUTE
            && path !== CHALLENGE_FRIEND_INIT_ROUTE;
    }

    render() {
        const {invitedToRivalBy, status, onAccept, onReject} = this.props;
        if (!invitedToRivalBy || status !== RIVAL_STATUS_INVITED_FRIEND || !this.canRenderInvitedToBattle()) {
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
        path: state.router.location.pathname,
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
