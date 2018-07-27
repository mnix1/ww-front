import React from 'react';
import connect from 'react-redux-fetch';
import _ from 'lodash';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {suggestChanged} from "../../../redux/reducer/friend";

class FriendSuggestFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearFriendSuggestFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {suggest, dispatchFriendSuggestGet} = this.props;
        if (!_.isNil(suggest) && suggest !== prevProps.suggest) {
            dispatchFriendSuggestGet();
        }
    }

    render() {
        return null;
    }
}

export function clearFriendSuggestFetch(dispatch) {
    dispatch(suggestChanged(undefined));
    dispatch({type: CLEAR, resource: {name: 'friendSuggest'}});
}

export default connect([{
    resource: 'friendSuggest',
    request: () => ({
        url: `/friend/suggest`
    })
}])(FriendSuggestFetch);