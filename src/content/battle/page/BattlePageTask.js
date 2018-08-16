import React from 'react';
import {connect} from 'react-redux';
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../redux/reducer/battle";
import _ from "lodash";
import Task from "../../../component/task/Task";

class BattlePageTask extends React.PureComponent {

    prepareScreenForTask() {
        const {screen} = this.props;
        let contentHeight = screen.contentHeight;
        let contentWidth = screen.contentWidth;
        if (screen.moreHeightThanWidth) {
            contentHeight = Math.min(screen.contentHeight / 1.3, screen.contentHeight - 40);
        } else {
            contentHeight = Math.min(screen.contentHeight, screen.contentHeight);
            contentWidth = Math.min(screen.contentWidth / 1.1, screen.contentWidth - 40);
        }
        return {
            ...screen,
            contentHeight,
            contentWidth
        }
    }

    render() {
        const {content, onAnswerClick, onSkipAnimationChange, questionIdAnswerIdMap, questionIdSkipAnimationMap, screen, communication} = this.props;
        const {task, correctAnswerId, markedAnswerId, status} = content;
        if (status !== 'ANSWERING' && status !== 'ANSWERED') {
            return null;
        }
        return <Task
            style={{display: screen.moreHeightThanWidth ? 'block' : 'flex'}}
            correctAnswerId={correctAnswerId}
            answerId={markedAnswerId || questionIdAnswerIdMap[task.id]}
            canChangeAnswer={false}
            screen={this.prepareScreenForTask()}
            skipAnimation={!_.isNil(correctAnswerId) || questionIdSkipAnimationMap[task.id] === true}
            onSkipAnimationChange={() => {
                if (!_.isNil(correctAnswerId)) {
                    return;
                }
                onSkipAnimationChange({...questionIdSkipAnimationMap, [task.id]: true})
            }}
            question={task}
            answers={task.answers}
            onAnswerClick={(answerId) => {
                if (!_.isNil(correctAnswerId)) {
                    return;
                }
                communication.send('BATTLE_ANSWER' + JSON.stringify({answerId}));
                onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
            }}
        />;
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
)(BattlePageTask);
