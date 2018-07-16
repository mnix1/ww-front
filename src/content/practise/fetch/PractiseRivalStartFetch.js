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
        this.props.dispatch({type: CLEAR, resource: {name: 'practiseRivalStart'}});
    }


    maybeFetch(prevProps) {
        const {category, dispatchPractiseRivalStartGet} = this.props;
        if (category !== undefined && prevProps.category !== category) {
            dispatchPractiseRivalStartGet(category);
        }
    }

    render() {
        return null;
    }
}

export default connect([{
    resource: 'practiseRivalStart',
    request: (category) => ({
        url: `/practise/start?category=${category}`
    })
}])(PractiseRivalStartFetch);