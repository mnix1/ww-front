import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

class PractiseRivalEndFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearPractiseRivalEndFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {rivalStart, answerId, dispatchPractiseRivalEndGet} = this.props;
        if (answerId !== undefined && prevProps.answerId !== answerId) {
            const practiseId = rivalStart.value.practise.id;
            dispatchPractiseRivalEndGet(practiseId, answerId);
        }
    }

    render() {
        return null;
    }
}

export function clearPractiseRivalEndFetch(dispatch){
    dispatch({type: CLEAR, resource: {name: 'practiseRivalEnd'}});
}

export default connect([{
    resource: 'practiseRivalEnd',
    request: (practiseId, answerId) => ({
        url: `/practise/end?practiseId=${practiseId}&answerId=${answerId}`
    })
}])(PractiseRivalEndFetch);