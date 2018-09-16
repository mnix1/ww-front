import React from 'react';
import {connect} from 'react-redux';
import {rivalCleared, statusChanged} from "../../../redux/reducer/rival";
import {
    RIVAL_STATUS_ACCEPTED_FRIEND,
    RIVAL_STATUS_CANCELED_FRIEND,
    RIVAL_STATUS_READY_TO_BEGIN_FRIEND,
    RIVAL_STATUS_REJECTED_FRIEND,
    RIVAL_TYPE_BATTLE,
    RIVAL_TYPE_CAMPAIGN_WAR,
    RIVAL_TYPE_CHALLENGE,
    RIVAL_TYPE_WAR
} from "../../../util/rivalHelper";
import {BATTLE_ROUTE, WAR_ROUTE} from "../../routes";
import {push} from 'connected-react-router'
import RivalStartFriendFetch from "./RivalStartFriendFetch";
import RivalCancelFriendFetch from "./RivalCancelFriendFetch";
import RivalRejectFriendFetch, {clearRivalRejectFriendFetch} from "./RivalRejectFriendFetch";
import RivalAcceptFriendFetch, {clearRivalAcceptFriendFetch} from "./RivalAcceptFriendFetch";
import RivalStartRandomOpponentFetch from "./RivalStartRandomOpponentFetch";
import RivalCancelRandomOpponentFetch from "./RivalCancelRandomOpponentFetch";

class RivalFetchContainer extends React.PureComponent {

    resolveFriend() {
        const {
            rivalRejectFriendRep, rivalCancelFriendRep, rivalAcceptFriendRep,
            status, onRivalFriendClear, onRivalFriendInProgress
        } = this.props;
        if (status === RIVAL_STATUS_REJECTED_FRIEND && rivalRejectFriendRep && rivalRejectFriendRep.fulfilled) {
            onRivalFriendClear();
        }
        if (status === RIVAL_STATUS_CANCELED_FRIEND && rivalCancelFriendRep && rivalCancelFriendRep.fulfilled) {
            onRivalFriendClear();
        }
        if (status === RIVAL_STATUS_ACCEPTED_FRIEND && rivalAcceptFriendRep && rivalAcceptFriendRep.fulfilled) {
            onRivalFriendInProgress(rivalAcceptFriendRep.value.type);
        }
    }

    componentDidUpdate() {
        this.resolveFriend();
    }

    render() {
        const {tag, rivalType, rivalImportance, status} = this.props;
        if (rivalType === RIVAL_TYPE_CAMPAIGN_WAR || rivalType === RIVAL_TYPE_CHALLENGE) {
            return null;
        }
        return <div>
            <RivalStartFriendFetch status={status} tag={tag} rivalType={rivalType}/>
            <RivalCancelFriendFetch status={status}/>
            <RivalRejectFriendFetch status={status}/>
            <RivalAcceptFriendFetch status={status}/>
            <RivalStartRandomOpponentFetch status={status} rivalImportance={rivalImportance} rivalType={rivalType}/>
            <RivalCancelRandomOpponentFetch status={status} rivalImportance={rivalImportance} rivalType={rivalType}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,

        status: state.rival.status,
        tag: state.rival.tag,
        rivalType: state.rival.rivalType,
        rivalImportance: state.rival.rivalImportance,

        rivalStartFriendRep: state.repository.rivalStartFriend,
        rivalRejectFriendRep: state.repository.rivalRejectFriend,
        rivalCancelFriendRep: state.repository.rivalCancelFriend,
        rivalAcceptFriendRep: state.repository.rivalAcceptFriend,

        rivalStartRandomOpponentRep: state.repository.rivalStartRandomOpponent,
        rivalCancelRandomOpponentRep: state.repository.rivalCancelRandomOpponent,
    }),
    (dispatch) => ({
        onRivalFriendClear: () => {
            clearRivalRejectFriendFetch(dispatch);
            dispatch(rivalCleared());
        },
        onRivalFriendInProgress: (rivalType) => {
            clearRivalAcceptFriendFetch(dispatch);
            dispatch(rivalCleared());
            dispatch(statusChanged(RIVAL_STATUS_READY_TO_BEGIN_FRIEND));
            if (rivalType === RIVAL_TYPE_BATTLE) {
                dispatch(push(BATTLE_ROUTE));
            } else if (rivalType === RIVAL_TYPE_WAR) {
                dispatch(push(WAR_ROUTE));
            }
        },
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(RivalFetchContainer);
