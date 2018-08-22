import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";

class ProfileListBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({profileListBookFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearProfileListBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, profileListBookFetch, dispatchProfileListBookGet} = this.props;
        if ((path === PROFILE_ROUTE && prevProps.path !== path)
            || (!profileListBookFetch.fulfilled && !profileListBookFetch.pending && prevProps.profileListBookFetch.fulfilled)) {
            dispatchProfileListBookGet();
        }
    }

    render() {
        return null;
    }
}

export function clearProfileListBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileListBook'}});
}

export default connect([{
    resource: 'profileListBook',
    request: () => ({
        url: `/profile/listBook`,
    })
}])(ProfileListBookFetch);