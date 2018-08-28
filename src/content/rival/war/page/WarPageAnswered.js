import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_ANSWERED, TEXT_CORRECT, TEXT_WRONG} from "../../../../lang/text";
import thumbUp from '../../../../media/image/icon/thumbUp.svg';
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskWithoutActions from "../../component/TaskWithoutActions";
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import WarTaskDescription from "../../component/WarTaskDescription";
import ActiveHero from "../../component/ActiveHero";

class WarPageAnswered extends React.PureComponent {

    get isCorrectAnswer() {
        const {content,} = this.props;
        const {correctAnswerId, markedAnswerId} = content;
        return correctAnswerId === markedAnswerId;
    }

    get meAnswered() {
        const {content} = this.props;
        const {meAnswered} = content;
        return meAnswered;
    }

    renderWhoAnswered() {
        const {content, profile, screen} = this.props;
        const answeredProps = this.meAnswered
            ? {profile, activeIndex: content.activeIndex, team: content.team}
            : {profile: content.opponent, activeIndex: content.opponentActiveIndex, team: content.opponentTeam};
        const imgHeight = screen.isSmallHeight ? 40 : 60;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageCenterVertical'>
                <ActiveHero className={this.isCorrectAnswer ? '' : 'wrongAnswer'} {...answeredProps}/>
                <div>{getText(TEXT_ANSWERED)}...</div>
                <div className='result'>
                    {this.isCorrectAnswer
                        ? <div>
                            <div>{getText(TEXT_CORRECT)}</div>
                            <img alt='' src={thumbUp} height={imgHeight}/></div>
                        : <div>
                            <div>{getText(TEXT_WRONG)}</div>
                            <img alt='' src={thumbDown} height={imgHeight}/></div>}
                </div>
            </div>
        </div>
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent warPageAnswered'>
            {this.renderWhoAnswered()}
            <WarTaskDescription content={content} className='pageHeader'/>
            {/*{this.renderProfilesWithNewScore()}*/}
            <TaskWithoutActions content={content}/>
            <TaskMarkedAnswer content={content}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        profile: state.profile.profile,
        content: state.war.content,
        questionIdAnswerIdMap: state.war.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.war.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({})
)(WarPageAnswered);
