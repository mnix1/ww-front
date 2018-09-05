import React from 'react';
import {connect} from 'react-redux';
import CampaignStartWarFetch from "./CampaignStartWarFetch";
import {statusChanged} from "../../../redux/reducer/rival";
import CampaignListFetch from "./CampaignListFetch";

class CampaignFetchContainer extends React.PureComponent {

    render() {
        const {path, rivalType, rivalImportance, status} = this.props;
        return <div>
            <CampaignListFetch path={path}/>
            <CampaignStartWarFetch path={path} status={status} rivalImportance={rivalImportance} rivalType={rivalType}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        status: state.rival.status,
        rivalType: state.rival.rivalType,
        rivalImportance: state.rival.rivalImportance,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(CampaignFetchContainer);
