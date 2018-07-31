import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {BATTLE_STATUS_ACCEPTED} from "../../../../util/battleHelper";

class BattleAcceptFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleAcceptFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, rep, dispatchBattleAcceptPost} = this.props;
        if (prevProps.status !== status && status === BATTLE_STATUS_ACCEPTED) {
            dispatchBattleAcceptPost();
        }
    }

    render() {
        return null;
    }
}

export function clearBattleAcceptFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleAccept'}});
}

export default connect([{
    resource: 'battleAccept',
    method: 'post',
    request: () => ({
        url: `/battle/accept`,
    })
}])(BattleAcceptFetch);