import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_SUMMARY, TEXT_WAITING} from "../../../lang/langText";
import Profile from "../../../component/profile/Profile";
import {CHALLENGE_STATUS_CLOSED} from "../../../util/challengeHelper";
import {prepareScoreMessage} from "../../../util/textHelper";
import MeshBackground from "../../../component/background/MeshBackground";
import {repFulfilled} from "../../../util/repositoryHelper";
import {Loading} from "../../../component/loading/Loading";

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
                {/*<div className='details'>ZzzZzzzz...</div>*/}
            </div>
        } else {
            content = <div className='position'>
                {/*<div className='details'>{preparePositionMessage(position.position)}</div>*/}
                <div className='details'>{prepareScoreMessage(position.score)}</div>
            </div>
        }
        return <Profile key={_.uniqueId('summaryProfile')} {...position.profile}>
            {content}
        </Profile>;
    }

    renderContent() {
        const {challengeSummaryRep} = this.props;
        if (!repFulfilled(challengeSummaryRep)) {
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
        const {screen} = this.props;
        return <div className="page" style={{height: screen.contentHeight, width: screen.contentWidth}}>
            <MeshBackground/>
            <div className="pageContent overflowAuto">
                {this.renderContent()}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        challengeSummaryRep: state.repository.challengeSummary,
    }),
    (dispatch) => ({})
)(ChallengeSummaryPage);
