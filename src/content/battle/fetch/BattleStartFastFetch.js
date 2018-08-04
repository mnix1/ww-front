import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_START_FAST, BATTLE_STATUS_START_FRIEND} from "../../../util/battleHelper";

class BattleStartFastFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleStartFastFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tag, status, dispatchBattleStartFastPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_START_FAST) {
            dispatchBattleStartFastPost(tag);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleStartFastFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleStartFast'}});
}

export default connect([{
    resource: 'battleStartFast',
    method: 'post',
    request: (tag) => ({
        url: `/battle/startFast`,
        body: {tag}
    })
}])(BattleStartFastFetch);