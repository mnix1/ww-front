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

class ChallengeSummaryPage extends React.PureComponent {

    renderPositions(positions) {
        return <div className='positions'>
            {positions.map((e, i) => this.renderPosition(e, i))}
        </div>
    }

    renderPosition(position, i) {
        let content;
        if (position.status !== CHALLENGE_STATUS_CLOSED) {
            content = <div className='position'>
                <div className='details'>{getText(TEXT_WAITING)}</div>
            </div>
        } else {
            content = <div className='position'>
                <div className='details'>{prepareScoreMessage(position.score)}</div>
            </div>
        }
        return <Profile key={_.uniqueId('summaryProfile')} {...position.profile}>
            {content}
        </Profile>;
    }

    renderContent() {
        const {challengeSummaryRep} = this.props;
        if (!isRepFulfilled(challengeSummaryRep)) {
            return <Loading/>
        }
        return <div>
            <div className="pageHeader">
                <span>{getText(TEXT_SUMMARY)}</span>
            </div>
            {this.renderPositions(challengeSummaryRep.value.positions)}
        </div>
    }

    render() {
        return <ScreenPage>
            {this.renderContent()}
        </ScreenPage>
    }
}

export default connect(
    (state) => ({
        challengeSummaryRep: state.repository.challengeSummary,
    }),
    (dispatch) => ({})
)(ChallengeSummaryPage);
