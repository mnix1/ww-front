import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_SUMMARY, TEXT_WAITING} from "../../../lang/langText";
import Profile from "../../../component/profile/Profile";
import {CHALLENGE_STATUS_CLOSED} from "../../../util/challengeHelper";
import {prepareScoreMessage} from "../../../util/textHelper";
import {isRepFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";
import ScreenPage from "../../../component/page/ScreenPage";
import Challenge from "../../../component/challenge/Challenge";
import {push} from "connected-react-router";
import {APP_ROUTE} from "../../routes";
import ChallengeSummaryFetch from "../fetch/ChallengeSummaryFetch";

class ChallengeSummaryPage extends React.PureComponent {

    componentDidMount() {
        if (_.isNil(this.props.summaryId)) {
            this.props.onRouteChange(APP_ROUTE);
        }
    }

    renderPositions(positions) {
        return <div className='positions'>
            {positions.map((e, i) => this.renderPosition(e, i))}
        </div>
    }

    renderPosition(position, i) {
        let content;
        if (position.status !== CHALLENGE_STATUS_CLOSED) {
            content = <div className='position relative'>
                <div className='details'>{getText(TEXT_WAITING)}</div>
            </div>
        } else {
            content = <div className='position relative'>
                <div className='details'>{prepareScoreMessage(position.score)}</div>
            </div>
        }
        return <Profile blackBackground={true} key={_.uniqueId('summaryProfile')} {...position.profile}>
            {content}
        </Profile>;
    }

    renderContent() {
        const {challengeSummaryRep} = this.props;
        if (!isRepFulfilled(challengeSummaryRep)) {
            return <Loading/>
        }
        const challenge = challengeSummaryRep.value;
        return <div>
            <div className="pageHeader">
                <span>{getText(TEXT_SUMMARY)}</span>
            </div>
            <div className='justifyCenter'><Challenge {...challenge}/></div>
            {this.renderPositions(challenge.positions)}
        </div>
    }

    render() {
        return <ScreenPage>
            {this.renderContent()}
            <ChallengeSummaryFetch id={this.props.summaryId}/>
        </ScreenPage>
    }
}

export default connect(
    (state) => ({
        challengeSummaryRep: state.repository.challengeSummary,
        summaryId: state.challenge.summaryId
    }),
    (dispatch) => ({
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(ChallengeSummaryPage);
