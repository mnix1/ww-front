import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

class PractiseEndFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearPractiseEndFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {practiseStartRep, answerId, dispatchPractiseEndPost} = this.props;
        if (answerId !== undefined && prevProps.answerId !== answerId) {
            const practiseId = practiseStartRep.value.practise.id;
            dispatchPractiseEndPost(practiseId, answerId);
        }
    }

    render() {
        return null;
    }
}

export function clearPractiseEndFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'practiseEnd'}});
}

export default connect([{
    resource: 'practiseEnd',
    method: 'post',
    request: (practiseId, answerId) => ({
        url: `/practise/end`,
        body: {practiseId, answerId}
    })
}])(PractiseEndFetch);