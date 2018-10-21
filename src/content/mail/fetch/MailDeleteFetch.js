import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {MAIL_ROUTE} from "../../routes";
import _ from 'lodash';
import {deleteIdChanged} from "../../../redux/reducer/mail";
import {clearMailListFetch} from "./MailListFetch";

class MailDeleteFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {mailDeleteFetch, deleteId, dispatch} = this.props;
        if (!prevProps.mailDeleteFetch.fulfilled && mailDeleteFetch.fulfilled && !_.isNil(deleteId)) {
            dispatch(deleteIdChanged(undefined));
            if (mailDeleteFetch.value.code === 1) {
                clearMailListFetch(dispatch);
            }
        }
    }

    componentWillUnmount() {
        clearMailDeleteFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, deleteId, dispatchMailDeletePost} = this.props;
        if (path === MAIL_ROUTE
            && !_.isNil(deleteId)
            && (prevProps.path !== path || prevProps.deleteId !== deleteId)) {
            dispatchMailDeletePost(deleteId);
        }
    }

    render() {
        return null;
    }
}

export function clearMailDeleteFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'mailDelete'}});
}

export default connect([{
    method: 'post',
    resource: 'mailDelete',
    request: (id) => ({
        url: `/mail/delete`,
        body: {id}
    })
}])(MailDeleteFetch);