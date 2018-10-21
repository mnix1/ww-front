import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {MAIL_ROUTE} from "../../routes";
import _ from 'lodash';
import {clearProfileFetch} from "../../app/fetch/ProfileFetch";
import {claimRewardIdChanged} from "../../../redux/reducer/mail";
import {clearMailListFetch} from "./MailListFetch";

class MailClaimRewardFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {mailClaimRewardFetch, claimRewardId, dispatch} = this.props;
        if (!prevProps.mailClaimRewardFetch.fulfilled && mailClaimRewardFetch.fulfilled && !_.isNil(claimRewardId)) {
            dispatch(claimRewardIdChanged(undefined));
            if (mailClaimRewardFetch.value.code === 1) {
                clearProfileFetch(dispatch);
                clearMailListFetch(dispatch);
            }
        }
    }

    componentWillUnmount() {
        clearMailClaimRewardFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, claimRewardId, dispatchMailClaimRewardPost} = this.props;
        if (path === MAIL_ROUTE
            && !_.isNil(claimRewardId)
            && (prevProps.path !== path || prevProps.claimRewardId !== claimRewardId)) {
            dispatchMailClaimRewardPost(claimRewardId);
        }
    }

    render() {
        return null;
    }
}

export function clearMailClaimRewardFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'mailClaimReward'}});
}

export default connect([{
    method: 'post',
    resource: 'mailClaimReward',
    request: (id) => ({
        url: `/mail/claimReward`,
        body: {id}
    })
}])(MailClaimRewardFetch);