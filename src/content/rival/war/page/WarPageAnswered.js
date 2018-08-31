import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_ANSWERED, TEXT_CORRECT, TEXT_WRONG} from "../../../../lang/langText";
import thumbUp from '../../../../media/image/icon/thumbUp.svg';
import thumbDown from '../../../../media/image/icon/thumbDown.svg';
import TaskWithoutActions from "../../component/TaskWithoutActions";
import TaskMarkedAnswer from "../../component/TaskMarkedAnswer";
import ActiveHero from "../../component/ActiveHero";
import TaskDescription from "../../component/TaskDescription";

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

    prepareAnsweredProps(forAnswered) {
        const {content, profile} = this.props;
        let meAnswered = this.meAnswered;
        if (!forAnswered) {
            meAnswered = !meAnswered;
        }
        return meAnswered
            ? {profile, activeIndex: content.activeIndex, team: content.team}
            : {profile: content.opponent, activeIndex: content.opponentActiveIndex, team: content.opponentTeam};
    }

    renderWhoAnswered() {
        const {screen} = this.props;
        const imgHeight = screen.isSmallHeight ? 40 : 60;
        return <div className='whoAnswered textAlignCenter'>
            <div className='justifyCenter'>
                <div className='justifyCenter flexColumn'>
                    <ActiveHero
                        className={this.isCorrectAnswer ? '' : 'wrongAnswer'} {...this.prepareAnsweredProps(true)}/>
                    <div>{getText(TEXT_ANSWERED)}...</div>
                    <div className='result'>
                        {this.isCorrectAnswer
                            ? <div>
                                <div>{getText(TEXT_CORRECT)}</div>
                                <img alt='' src={thumbUp} height={imgHeight}/>
                            </div>
                            : <div>
                                <div>{getText(TEXT_WRONG)}</div>
                                <img alt='' src={thumbDown} height={imgHeight}/>
                            </div>}
                    </div>
                </div>
                {this.isCorrectAnswer && <div className='opponentHeroFadeOut'><ActiveHero
                    className='wrongAnswer' {...this.prepareAnsweredProps(false)}/></div>}
            </div>
        </div>
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent warPageAnswered'>
            <TaskDescription
                content={content}
                renderTaskPoints={false}
                renderTaskCount={false}
                className='pageHeader warTaskDescription'/>
            {this.renderWhoAnswered()}
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
        content: state.rival.content,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({})
)(WarPageAnswered);
