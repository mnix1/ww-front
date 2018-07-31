import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CHALLENGE_STATUS_OPEN} from "../../../../util/challengeHelper";

class ChallengeListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearChallengeListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {challengeListRep, dispatchChallengeListGet} = this.props;
        if (!challengeListRep) {
            dispatchChallengeListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearChallengeListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'challengeList'}});
}

export default connect([{
    resource: 'challengeList',
    request: () => ({
        url: `/challenge/list`,
    })
}])(ChallengeListFetch);