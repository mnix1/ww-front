import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import AvailableResources from "../../component/resource/AvailableResources";
import {RESOURCE_SMALL} from "../../component/resource/Resource";
import MeshBackground from "../../component/background/MeshBackground";
import {rivalCleared, rivalImportanceChanged, rivalTypeChanged, statusChanged} from "../../redux/reducer/rival";
import {
    RIVAL_IMPORTANCE_FAST,
    RIVAL_STATUS_START_RANDOM_OPPONENT,
    RIVAL_TYPE_CAMPAIGN_WAR
} from "../../util/rivalHelper";
import {clearRivalStartRandomOpponentFetch} from "../rival/fetch/RivalStartRandomOpponentFetch";

class CampaignPage extends React.PureComponent {

    renderContent() {
        return <div>

        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page campaignPage' style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground/>
            <div className='pageContent overflowAuto'>
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onStartClick: () => {
            clearRivalStartRandomOpponentFetch(dispatch);
            dispatch(rivalCleared());
            dispatch(rivalTypeChanged(RIVAL_TYPE_CAMPAIGN_WAR));
            dispatch(rivalImportanceChanged(RIVAL_IMPORTANCE_FAST));
            dispatch(statusChanged(RIVAL_STATUS_START_RANDOM_OPPONENT));
        },
    })
)(CampaignPage);
