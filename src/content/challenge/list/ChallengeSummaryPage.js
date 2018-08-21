import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_SUMMARY, TEXT_WAITING} from "../../../lang";
import Profile from "../../../component/profile/Profile";
import {CHALLENGE_STATUS_CLOSED} from "../../../util/challengeHelper";
import {prepareAnswerIntervalMessage, prepareScoreMessage} from "../../../util/textHelper";

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
                <div className='details'>ZzzZzzzz...</div>
            </div>
        } else {
            content = <div className='position'>
                {/*<div className='details'>{preparePositionMessage(position.position)}</div>*/}
                <div className='details'>{prepareScoreMessage(position.score)}</div>
                <div className='details'>{prepareAnswerIntervalMessage(position.answerInterval)}</div>
            </div>
        }
        return <Profile key={_.uniqueId('summaryProfile')} {...position.profile}>
            {content}
        </Profile>;
    }

    render() {
        const {rep} = this.props;
        const positions = _.get(rep, 'value.positions');
        if (!positions) {
            return null;
        }
        return <div className="page">
            <div className="pageBackground absoluteBackgroundMix"/>
            <div className="pageContent">
                <div className="pageHeader">
                    <span>{getText(TEXT_SUMMARY)}</span>
                </div>
                {this.renderPositions(positions)}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        rep: state.repository.challengeSummary,
    }),
    (dispatch) => ({})
)(ChallengeSummaryPage);
