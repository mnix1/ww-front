import React from 'react';
import connect from "react-redux/es/connect/connect";
import {clearRivalStartRandomOpponentFetch} from "../../rival/fetch/RivalStartRandomOpponentFetch";
import {responseIdChanged} from "../../../redux/reducer/challenge";
import {rivalCleared, rivalImportanceChanged, rivalTypeChanged, statusChanged} from "../../../redux/reducer/rival";
import {RIVAL_IMPORTANCE_FAST, RIVAL_STATUS_START_FRIEND, RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";
import {push} from "connected-react-router";
import {CHALLENGE_ROUTE} from "../../routes";
import ScreenPage from "../../../component/page/ScreenPage";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ChallengeGlobalFetch from "../fetch/ChallengeGlobalFetch";

class ChallengeGlobalPage extends React.PureComponent {

    renderContent() {
        const {challengeGlobalRep} = this.props;
        if (!isRepFulfilled(challengeGlobalRep)) {
            return <Loading/>
        }
        return <div>
        </div>;
    }

    render() {
        const {path} = this.props;
        return <ScreenPage>
            {this.renderContent()}
            <ChallengeGlobalFetch path={path}/>
        </ScreenPage>;
    };
}

export default connect(
    (state) => ({
        challengeGlobalRep: state.repository.challengeGlobal,
        path: state.router.location.pathname,
    }),
    (dispatch) => ({
        onChallengeResponseClick: (id) => {
            clearRivalStartRandomOpponentFetch(dispatch);
            dispatch(responseIdChanged(id));
            dispatch(rivalCleared());
            dispatch(rivalTypeChanged(RIVAL_TYPE_CHALLENGE));
            dispatch(rivalImportanceChanged(RIVAL_IMPORTANCE_FAST));
            dispatch(statusChanged(RIVAL_STATUS_START_FRIEND));
            dispatch(push(CHALLENGE_ROUTE));
        },
        onChallengeSummaryClick: (id) => {
        }
    })
)(ChallengeGlobalPage);
