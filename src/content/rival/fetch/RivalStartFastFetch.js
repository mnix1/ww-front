import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_START_FAST} from "../../../util/rivalHelper";

class RivalStartFastFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearRivalStartFastFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {rivalType, status, dispatchRivalStartFastPost} = this.props;
        if (prevProps.status !== status && status === RIVAL_STATUS_START_FAST) {
            dispatchRivalStartFastPost(rivalType);
        }
    }

    render() {
        return null;
    }
}

export function clearRivalStartFastFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'rivalStartFast'}});
}

export default connect([{
    resource: 'rivalStartFast',
    method: 'post',
    request: (type) => ({
        url: `/rival/startFast`,
        body: {type}
    })
}])(RivalStartFastFetch);