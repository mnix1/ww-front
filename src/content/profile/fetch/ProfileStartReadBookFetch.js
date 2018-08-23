import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {PROFILE_ROUTE} from "../../routes";
import _ from 'lodash';
import {startReadBookIdChanged} from "../../../redux/reducer/profile";
import {checkRepValueCode} from "../../../util/responseHelper";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_READING_ANHOTHER_BOOK} from "../../../lang/error";

class ProfileStartReadBookFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {profileStartReadBookFetch,bookId, dispatch} = this.props;
        if (!prevProps.profileStartReadBookFetch.fulfilled && profileStartReadBookFetch.fulfilled && !_.isNil(bookId)) {
            dispatch(startReadBookIdChanged(undefined));
            if (checkRepValueCode(profileStartReadBookFetch, -2)) {
                noticeError(ERROR_READING_ANHOTHER_BOOK);
            }
        }
    }

    componentWillUnmount() {
        clearProfileStartReadBookFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, bookId, dispatchProfileStartReadBookPost} = this.props;
        if (path === PROFILE_ROUTE
            && !_.isNil(bookId)
            && (prevProps.path !== path || prevProps.bookId !== bookId)) {
            dispatchProfileStartReadBookPost(bookId);
        }
    }

    render() {
        return null;
    }
}

export function clearProfileStartReadBookFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileStartReadBook'}});
}

export default connect([{
    method: 'post',
    resource: 'profileStartReadBook',
    request: (id) => ({
        url: `/profile/startReadBook`,
        body: {id}
    })
}])(ProfileStartReadBookFetch);