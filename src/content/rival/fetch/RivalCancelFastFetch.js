import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_CANCELED_FAST} from "../../../util/rivalHelper";

class RivalCancelFastFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearRivalCancelFastFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, rivalType, dispatchRivalCancelFastPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_CANCELED_FAST) {
            dispatchRivalCancelFastPost(rivalType);
        }
    }

    render() {
        return null;
    }
}

export function clearRivalCancelFastFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalCancelFast'}});
}

export default connect([{
    resource: 'rivalCancelFast',
    method: 'post',
    request: (type) => ({
        url: `/rival/cancelFast`,
        body: {type}
    })
}])(RivalCancelFastFetch);