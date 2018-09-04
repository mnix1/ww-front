import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Task from "../../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../../redux/reducer/rival";
import Profiles from "../../component/Profiles";
import TaskDescription from "../../component/TaskDescription";
import Timer from "../../../../component/timer/Timer";
import {getText, TEXT_TIME} from "../../../../lang/langText";

class BattlePageAnswering extends React.PureComponent {

    renderTask() {
        const {content, onAnswerClick, onSkipAnimationChange, questionIdAnswerIdMap, questionIdSkipAnimationMap, screen, communication} = this.props;
        const {task, correctAnswerId} = content;
        return <Task
            screen={screen}
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
                communication.send('BATTLE_^_ANSWER' + JSON.stringify({answerId}));
                onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
            }}
        />;
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePageAnswering'>
            <TaskDescription content={content} className='justifyCenter flexColumn contentHeader'>
                <div>{`${getText(TEXT_TIME)}: `}<Timer from={content.endAnsweringInterval}/></div>
            </TaskDescription>
            <Profiles content={content} className='absolute'/>
            {this.renderTask()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(BattlePageAnswering);
