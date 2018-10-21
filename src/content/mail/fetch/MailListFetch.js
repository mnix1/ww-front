import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {MAIL_ROUTE, PROFILE_ROUTE} from "../../routes";
import {fetchOnPathAndIfNotExists, fetchOnPathOrIfNotExistsAnymore} from "../../../util/repositoryHelper";

class MailListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({mailListFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearMailListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, mailListFetch, dispatchMailListGet} = this.props;
        if (fetchOnPathOrIfNotExistsAnymore(prevProps.path, path, PROFILE_ROUTE, prevProps.mailListFetch, mailListFetch)
            || fetchOnPathAndIfNotExists(prevProps.path, path, MAIL_ROUTE, prevProps.mailListFetch, mailListFetch)) {
            dispatchMailListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearMailListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'mailList'}});
}

export default connect([{
    resource: 'mailList',
    request: () => ({
        url: `/mail/list`,
    })
}])(MailListFetch);