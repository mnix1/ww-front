import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_CANCELED_RANDOM_OPPONENT} from "../../../util/rivalHelper";

class RivalCancelRandomOpponentFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearRivalCancelRandomOpponentFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, rivalType, rivalImportance, dispatchRivalCancelRandomOpponentPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_CANCELED_RANDOM_OPPONENT) {
            dispatchRivalCancelRandomOpponentPost(rivalType, rivalImportance);
        }
    }

    render() {
        return null;
    }
}

export function clearRivalCancelRandomOpponentFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalCancelRandomOpponent'}});
}

export default connect([{
    resource: 'rivalCancelRandomOpponent',
    method: 'post',
    request: (type, importance) => ({
        url: `/rival/cancelRandomOpponent`,
        body: {type, importance}
    })
}])(RivalCancelRandomOpponentFetch);