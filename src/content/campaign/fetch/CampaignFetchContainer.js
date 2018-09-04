import React from 'react';
import {connect} from 'react-redux';
import CampaignStartFetch from "./CampaignStartFetch";
import {statusChanged} from "../../../redux/reducer/rival";

class CampaignFetchContainer extends React.PureComponent {

    render() {
        const {path, rivalType, rivalImportance, status} = this.props;
        return <div>
            <CampaignStartFetch path={path} status={status} rivalImportance={rivalImportance} rivalType={rivalType}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        status: state.rival.status,
        rivalType: state.rival.rivalType,
        rivalImportance: state.rival.rivalImportance,
        path: state.router.location.pathname,

        campaignStartRep: state.repository.campaignStartRep,
    }),
    (dispatch) => ({
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(CampaignFetchContainer);
