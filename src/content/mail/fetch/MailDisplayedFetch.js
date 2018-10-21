import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {MAIL_ROUTE} from "../../routes";
import {fetchOnPath} from "../../../util/repositoryHelper";

class MailDisplayedFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({mailDisplayedFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearMailDisplayedFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchMailDisplayedGet} = this.props;
        if (fetchOnPath(prevProps.path, path, MAIL_ROUTE)) {
            dispatchMailDisplayedGet();
        }
    }

    render() {
        return null;
    }
}

export function clearMailDisplayedFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'mailDisplayed'}});
}

export default connect([{
    resource: 'mailDisplayed',
    request: () => ({
        url: `/mail/displayed`,
    })
}])(MailDisplayedFetch);