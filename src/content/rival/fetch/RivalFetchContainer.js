import React from 'react';
import {connect} from 'react-redux';
import {RIVAL_TYPE_CAMPAIGN_WAR, RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";
import RivalStartFriendFetch from "./RivalStartFriendFetch";
import RivalCancelFriendFetch from "./RivalCancelFriendFetch";
import RivalRejectFriendFetch from "./RivalRejectFriendFetch";
import RivalAcceptFriendFetch from "./RivalAcceptFriendFetch";
import RivalStartRandomOpponentFetch from "./RivalStartRandomOpponentFetch";
import RivalCancelRandomOpponentFetch from "./RivalCancelRandomOpponentFetch";

class RivalFetchContainer extends React.PureComponent {

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
            <RivalCancelRandomOpponentFetch status={status}/>
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
    (dispatch) => ({})
)(RivalFetchContainer);
