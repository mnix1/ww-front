import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_OPEN} from "../../../../util/battleHelper";

class BattleStartFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tag, rep, status, dispatchBattleStartPost} = this.props;
        if (!rep && status === BATTLE_STATUS_OPEN) {
            dispatchBattleStartPost(tag);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleStartFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleStart'}});
}

export default connect([{
    resource: 'battleStart',
    method: 'post',
    request: (tag) => ({
        url: `/battle/start`,
        body: {tag}
    })
}])(BattleStartFetch);