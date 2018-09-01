import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";

class WisieListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearWisieListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {dispatchWisieListGet, wisieListFetch} = this.props;
        if (!wisieListFetch.fulfilled && !wisieListFetch.pending) {
            dispatchWisieListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearWisieListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'wisieList'}});
}

export default connect([{
    resource: 'wisieList',
    request: () => ({
        url: `/wisie/list`,
    })
}])(WisieListFetch);