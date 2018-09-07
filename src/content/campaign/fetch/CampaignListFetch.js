import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CAMPAIGN_ROUTE} from "../../routes";

class CampaignListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearCampaignListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchCampaignListGet, campaignListFetch} = this.props;
        if (!campaignListFetch.fulfilled && path === CAMPAIGN_ROUTE && prevProps.path !== path) {
            dispatchCampaignListGet();
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'campaignList'}});
}

export default connect([{
    resource: 'campaignList',
    request: () => ({
        url: `/campaign/list`,
    })
}])(CampaignListFetch);