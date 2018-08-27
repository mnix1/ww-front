import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {WAR_STATUS_START_FAST} from "../../../../util/warHelper";

class WarStartFastFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearWarStartFastFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {tag, status, dispatchWarStartFastPost} = this.props;
        if (prevProps.status !== status && status === WAR_STATUS_START_FAST) {
            dispatchWarStartFastPost(tag);
        }
    }

    render() {
        return null;
    }
}

export function clearWarStartFastFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'warStartFast'}});
}

export default connect([{
    resource: 'warStartFast',
    method: 'post',
    request: (tag) => ({
        url: `/war/startFast`,
        body: {tag}
    })
}])(WarStartFastFetch);