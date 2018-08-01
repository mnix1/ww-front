import React from 'react';
import {connect} from 'react-redux';
import BattleCommunication from "../BattleCommunication";
import Friend from "../../../component/friend/Friend";
import './styles.css';
import Task from "../../../component/task/Task";
import {
    getText,
    TEXT_CORRECT_ANSWER,
    TEXT_FOR,
    TEXT_NEXT_QUESTION, TEXT_OPPONENT_CORRECT_ANSWER, TEXT_OPPONENT_WRONG_ANSWER,
    TEXT_QUESTION,
    TEXT_WRONG_ANSWER
} from "../../../lang";
import {prepareScoreMessage} from "../../../util/textHelper";
import {questionIdAnswerIdMapChanged} from "../../../redux/reducer/battle";
import {questionIdSkipAnimationMapChanged} from "../../../redux/reducer/battle";
import Timer from "../../../component/timer/Timer";
import _ from 'lodash';

class BattlePage extends React.PureComponent {

    componentDidMount() {
        this.communication = new BattleCommunication(this.props.socket);
        this.communication.ready();
    }

    componentWillUnmount() {
        this.communication.dispose();
    }

    renderProfiles() {
        const {profile, content} = this.props;
        if (!content) {
            return;
        }
        return <div className='profiles'>
            <div className='profile'>
                {this.renderProfile(profile, content.score)}
            </div>
            <div className='opponentProfile'>
                {this.renderProfile(content.opponent, content.opponentScore)}
            </div>
        </div>
    }

    renderProfile(profile, score) {
        return <Friend friend={profile}><div>{prepareScoreMessage(score)}</div></Friend>
    }

    renderQuestionResult() {
        const {content, questionIdAnswerIdMap} = this.props;
        if (!content || !content.nextQuestionInterval) {
            return null;
        }
        const {question, nextQuestionInterval, correctAnswerId, markedAnswerId, meAnswered} = content;
        return <div>
            {meAnswered &&
            <div>{markedAnswerId === correctAnswerId ? getText(TEXT_CORRECT_ANSWER) : getText(TEXT_WRONG_ANSWER)}</div>}
            {!meAnswered &&
            <div>{markedAnswerId === correctAnswerId ? getText(TEXT_OPPONENT_CORRECT_ANSWER) : getText(TEXT_OPPONENT_WRONG_ANSWER)}</div>}
            <div>{`${getText(TEXT_NEXT_QUESTION)} ${getText(TEXT_FOR)}:`}
                <Timer from={content.nextQuestionInterval}/>
            </div>
        </div>
    }

    renderHeader() {
        const {content} = this.props;
        if (!content) {
            return null;
        }
        const question = content.question;
        return <div className="contentHeader">
            {`${getText(TEXT_QUESTION)} ${question.id}`}
            {this.renderQuestionResult()}
        </div>;
    }

    prepareScreenForTask() {
        const {screen} = this.props;
        const contentHeight = Math.min(screen.contentHeight / 1.15, screen.contentHeight - 40);
        return {
            ...screen,
            contentHeight
        }
    }

    renderTask() {
        const {content, onAnswerClick, onSkipAnimationChange, questionIdAnswerIdMap, questionIdSkipAnimationMap} = this.props;
        if (!content) {
            return null;
        }
        const {question, correctAnswerId, markedAnswerId} = content;
        return <Task
            style={{position: 'absolute', bottom: 0}}
            correctAnswerId={correctAnswerId}
            answerId={markedAnswerId || questionIdAnswerIdMap[question.id]}
            canChangeAnswer={false}
            screen={this.prepareScreenForTask()}
            skipAnimation={!_.isNil(correctAnswerId) || questionIdSkipAnimationMap[question.id] === true}
            onSkipAnimationChange={() => {
                if (!_.isNil(correctAnswerId)) {
                    return;
                }
                onSkipAnimationChange({...questionIdSkipAnimationMap, [question.id]: true})
            }}
            question={question}
            answers={question.answers}
            onAnswerClick={(answerId) => {
                if (!_.isNil(correctAnswerId)) {
                    return;
                }
                this.communication.send('BATTLE_ANSWER' + JSON.stringify({answerId}));
                onAnswerClick({...questionIdAnswerIdMap, [question.id]: answerId});
            }}
        />;
    }

    render() {
        return <div className='battlePage'>
            {this.renderHeader()}
            {this.renderProfiles()}
            {this.renderTask()}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        // opponentProfile: state.battle.opponent,
        profile: state.profile.profile,
        content: state.battle.content,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.battle.questionIdSkipAnimationMap,

        // question: state.battle.question,
    }),
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(BattlePage);
