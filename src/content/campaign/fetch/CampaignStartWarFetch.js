import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {RIVAL_STATUS_ERROR_RANDOM_OPPONENT, RIVAL_STATUS_START_RANDOM_OPPONENT} from "../../../util/rivalHelper";
import {CAMPAIGN_WAR_ROUTE} from "../../routes";
import {isRepValueCode1, repFulfilled} from "../../../util/repositoryHelper";
import {statusChanged} from "../../../redux/reducer/rival";

class CampaignStartWarFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {campaignStartWarFetch, dispatch, status} = this.props;
        if (!repFulfilled(prevProps.campaignStartWarFetch) && repFulfilled(campaignStartWarFetch) && status === RIVAL_STATUS_START_RANDOM_OPPONENT) {
            if (!isRepValueCode1(campaignStartWarFetch)) {
                dispatch(statusChanged(RIVAL_STATUS_ERROR_RANDOM_OPPONENT));
            }
            clearCampaignStartFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearCampaignStartFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, rivalType, rivalImportance, status, dispatchCampaignStartWarPost} = this.props;
        if (path === CAMPAIGN_WAR_ROUTE
            && prevProps.status !== status
            && status === RIVAL_STATUS_START_RANDOM_OPPONENT) {
            dispatchCampaignStartWarPost(rivalType, rivalImportance);
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignStartFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'campaignStartWar'}});
}

export default connect([{
    resource: 'campaignStartWar',
    method: 'post',
    request: (type, importance) => ({
        url: `/campaign/start`,
        body: {type, importance}
    })
}])(CampaignStartWarFetch);