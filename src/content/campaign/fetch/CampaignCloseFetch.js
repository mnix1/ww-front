import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {APP_ROUTE, CAMPAIGN_ROUTE} from "../../routes";
import _ from 'lodash';
import {campaignCloseChanged} from "../../../redux/reducer/campaign";
import {checkRepValueCode, isRepValueCode1} from "../../../util/repositoryHelper";
import {push} from "connected-react-router";
import {clearProfileFetch} from "../../app/fetch/ProfileFetch";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_NO_SPACE_FOR_BOOK} from "../../../lang/langError";

class CampaignCloseFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {campaignCloseFetch, close, dispatch} = this.props;
        if (!prevProps.campaignCloseFetch.fulfilled && campaignCloseFetch.fulfilled && !_.isNil(close)) {
            dispatch(campaignCloseChanged(undefined));
            if (isRepValueCode1(campaignCloseFetch)) {
                dispatch(push(APP_ROUTE));
                clearProfileFetch(dispatch);
            } else if (checkRepValueCode(campaignCloseFetch, -2)) {
                noticeError(ERROR_NO_SPACE_FOR_BOOK)
            }
        }
    }

    componentWillUnmount() {
        clearCampaignCloseFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, close, dispatchCampaignClosePost} = this.props;
        if (path === CAMPAIGN_ROUTE
            && !_.isNil(close)
            && (prevProps.path !== path || prevProps.close !== close)) {
            dispatchCampaignClosePost();
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignCloseFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'campaignClose'}});
}

export default connect([{
    method: 'post',
    resource: 'campaignClose',
    request: () => ({
        url: `/campaign/close`,
        body: {}
    })
}])(CampaignCloseFetch);