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
        const {category, practiseStartRep, dispatchPractiseStartPost} = this.props;
        if (category !== undefined && (prevProps.category !== category || !practiseStartRep)) {
            dispatchPractiseStartPost(category);
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
    request: (category) => ({
        url: `/practise/start`,
        body:{category}
    })
}])(PractiseStartFetch);