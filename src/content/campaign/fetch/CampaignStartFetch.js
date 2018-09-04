import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_START_RANDOM_OPPONENT, RIVAL_STATUS_WAITING_RANDOM_OPPONENT} from "../../../util/rivalHelper";
import {CAMPAIGN_WAR_ROUTE} from "../../routes";
import {isRepValueCode1} from "../../../util/responseHelper";
import {statusChanged} from "../../../redux/reducer/rival";

class CampaignStartFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {campaignStartFetch, dispatch, status} = this.props;
        if (!prevProps.campaignStartFetch.fulfilled && campaignStartFetch.fulfilled && status === RIVAL_STATUS_START_RANDOM_OPPONENT) {
            if (isRepValueCode1(campaignStartFetch)) {
                dispatch(statusChanged(RIVAL_STATUS_WAITING_RANDOM_OPPONENT));
            }
        }
    }

    componentWillUnmount() {
        clearCampaignStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, rivalType, rivalImportance, status, dispatchCampaignStartPost} = this.props;
        if (path === CAMPAIGN_WAR_ROUTE
            && prevProps.status !== status
            && status === RIVAL_STATUS_START_RANDOM_OPPONENT) {
            dispatchCampaignStartPost(rivalType, rivalImportance);
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignStartFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'campaignStart'}});
}

export default connect([{
    resource: 'campaignStart',
    method: 'post',
    request: (type, importance) => ({
        url: `/campaign/start`,
        body: {type, importance}
    })
}])(CampaignStartFetch);