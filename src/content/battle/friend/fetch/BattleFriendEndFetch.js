import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_IN_PROGRESS} from "../../../../util/battleHelper";

class BattleFriendEndFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleFriendEndFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {battleId, questionIdAnswerIdMap, battleFriendEndRep, status, dispatchBattleFriendEndPost} = this.props;
        if (!battleFriendEndRep && status === BATTLE_STATUS_IN_PROGRESS) {
            dispatchBattleFriendEndPost(battleId, questionIdAnswerIdMap);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleFriendEndFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleFriendEnd'}});
}

export default connect([{
    resource: 'battleFriendEnd',
    method: 'post',
    request: (battleId, questionIdAnswerIdMap) => ({
        url: `/battle/endFriend`,
        body: {battleId, questionIdAnswerIdMap}
    })
}])(BattleFriendEndFetch);