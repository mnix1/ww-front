import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {LOGIN_ROUTE} from "../routes";
import {repFulfilled, repRejected} from "../../util/repositoryHelper";
import {signedInChanged} from "../../redux/reducer/profile";

class TestSignInFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {dispatch, testSignInFetch} = this.props;
        if (repFulfilled(testSignInFetch) && !repFulfilled(prevProps.testSignInFetch)) {
            dispatch(signedInChanged(true));
        } else if (repRejected(testSignInFetch) && !repRejected(prevProps.testSignInFetch)) {
            dispatch(signedInChanged(false));
        }
    }

    componentWillUnmount() {
        clearTestSignInFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {dispatchTestSignInGet, testSignInFetch, path} = this.props;
        if (!testSignInFetch.fulfilled && !testSignInFetch.pending && !testSignInFetch.rejected && path !== LOGIN_ROUTE) {
            dispatchTestSignInGet();
        }
    }

    render() {
        return null;
    }
}

export function clearTestSignInFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'testSignIn'}});
}

export default connect([{
    resource: 'testSignIn',
    request: () => ({
        url: `/profile/testSignIn`,
    })
}])(TestSignInFetch);