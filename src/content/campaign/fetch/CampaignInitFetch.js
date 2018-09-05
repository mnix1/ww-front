import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CAMPAIGN_TEAM_EDIT_ROUTE} from "../../routes";
import _ from 'lodash';
import {campaignInitChanged} from "../../../redux/reducer/campaign";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {goBack} from "connected-react-router";

class CampaignInitFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {campaignInitFetch, init, dispatch} = this.props;
        if (!prevProps.campaignInitFetch.fulfilled && campaignInitFetch.fulfilled && !_.isNil(init)) {
            dispatch(campaignInitChanged(false));
            if (isRepValueCode1(campaignInitFetch)) {
                dispatch(goBack());
            }
        }
    }

    componentWillUnmount() {
        clearCampaignInitFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, type, destination, init, team, dispatchCampaignInitPost} = this.props;
        if (path === CAMPAIGN_TEAM_EDIT_ROUTE
            && !_.isNil(init)
            && (prevProps.path !== path || prevProps.init !== init)) {
            dispatchCampaignInitPost(type, destination, team.map(e => e.id));
        }
    }

    render() {
        return null;
    }
}

export function clearCampaignInitFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'campaignInit'}});
}

export default connect([{
    method: 'post',
    resource: 'campaignInit',
    request: (type, destination, ids) => ({
        url: `/campaign/init`,
        body: {type, destination, ids}
    })
}])(CampaignInitFetch);