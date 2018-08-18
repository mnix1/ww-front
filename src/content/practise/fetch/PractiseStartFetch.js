import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

class PractiseStartFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearPractiseStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {category, difficultyLevel, practiseStartRep, dispatchPractiseStartPost} = this.props;
        if (category !== undefined && !practiseStartRep) {
            dispatchPractiseStartPost(category, difficultyLevel);
        }
    }

    render() {
        return null;
    }
}

export function clearPractiseStartFetch(dispatch){
    dispatch({type: CLEAR, resource: {name: 'practiseStart'}});
}

export default connect([{
    resource: 'practiseStart',
    method:'post',
    request: (category, difficultyLevel) => ({
        url: `/practise/start`,
        body:{category, difficultyLevel}
    })
}])(PractiseStartFetch);