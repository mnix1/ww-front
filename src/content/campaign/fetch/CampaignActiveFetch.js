import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CAMPAIGN_ROUTE} from "../../routes";
import {fetchOnPathOrIfNotExistsAnymore} from "../../../util/repositoryHelper";

class CampaignActiveFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({campaignActiveFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearCampaignActiveFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchCampaignActiveGet, campaignActiveFetch} = this.props;
        if (fetchOnPathOrIfNotExistsAnymore(prevProps.path, path, CAMPAIGN_ROUTE, prevProps.campaignActiveFetch, campaignActiveFetch)){
            dispatchCampaignActiveGet();
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignActiveFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'campaignActive'}});
}

export default connect([{
    resource: 'campaignActive',
    request: () => ({
        url: `/campaign/active`,
    })
}])(CampaignActiveFetch);