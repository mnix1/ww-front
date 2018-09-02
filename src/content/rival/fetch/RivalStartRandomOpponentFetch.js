import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_START_RANDOM_OPPONENT} from "../../../util/rivalHelper";

class RivalStartRandomOpponentFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearRivalStartRandomOpponentFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {rivalType, rivalImportance, status, dispatchRivalStartRandomOpponentPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_START_RANDOM_OPPONENT) {
            dispatchRivalStartRandomOpponentPost(rivalType, rivalImportance);
        }
    }

    render() {
        return null;
    }
}

export function clearRivalStartRandomOpponentFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalStartRandomOpponent'}});
}

export default connect([{
    resource: 'rivalStartRandomOpponent',
    method: 'post',
    request: (type, importance) => ({
        url: `/rival/startRandomOpponent`,
        body: {type, importance}
    })
}])(RivalStartRandomOpponentFetch);