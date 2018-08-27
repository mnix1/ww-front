import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {WAR_STATUS_CANCELED_FAST} from "../../../../util/warHelper";

class WarCancelFastFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearWarCancelFastFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {status, dispatchWarCancelFastPost} = this.props;
        if (prevProps.status !== status && status === WAR_STATUS_CANCELED_FAST) {
            dispatchWarCancelFastPost();
        }
    }

    render() {
        return null;
    }
}

export function clearWarCancelFastFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'warCancelFast'}});
}

export default connect([{
    resource: 'warCancelFast',
    method: 'post',
    request: () => ({
        url: `/war/cancelFast`,
    })
}])(WarCancelFastFetch);