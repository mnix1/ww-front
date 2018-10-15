import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';

class ChallengeSummaryFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeSummaryFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {id, dispatchChallengeSummaryPost} = this.props;
        if (!_.isNil(id) && prevProps.id !== id) {
            dispatchChallengeSummaryPost(id);
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeSummaryFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeSummary'}});
}

export default connect([{
    resource: 'challengeSummary',
    method: 'post',
    request: (id) => ({
        url: `/challenge/summary`,
        body: {id}
    })
}])(ChallengeSummaryFetch);