import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

class PractiseRivalStartFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearPractiseRivalStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {category, practiseRivalStartRep, dispatchPractiseRivalStartGet} = this.props;
        if (category !== undefined && (prevProps.category !== category || !practiseRivalStartRep)) {
            dispatchPractiseRivalStartGet(category);
        }
    }

    render() {
        return null;
    }
}

export function clearPractiseRivalStartFetch(dispatch){
    dispatch({type: CLEAR, resource: {name: 'practiseRivalStart'}});
}

export default connect([{
    resource: 'practiseRivalStart',
    request: (category) => ({
        url: `/practise/start?category=${category}`
    })
}])(PractiseRivalStartFetch);