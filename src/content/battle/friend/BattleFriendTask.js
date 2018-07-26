import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import BattleFriendStartFetch from "./fetch/BattleFriendStartFetch";
import Task from "../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIndexChanged} from "../../../redux/reducer/battle";

class BattleFriendTask extends React.PureComponent {

    renderTask(battle) {
        const {questionIndex, screen, onAnswerClick, questionIdAnswerIdMap} = this.props;
        const question = _.sortBy(battle.questions, 'id')[questionIndex];
        return <div>
            <Task
                answerId={questionIdAnswerIdMap[question.id]}
                canChangeAnswer={true}
                screen={screen}
                skipAnimation={false}
                onSkipAnimationChange={_.noop}
                question={question}
                answers={question.answers}
                onAnswerClick={(answerId) => onAnswerClick({...questionIdAnswerIdMap, [question.id]: answerId})}
            />
        </div>;
    }

    render() {
        const {tags, battleFriendStartRep} = this.props;
        return <div>
            {battleFriendStartRep && battleFriendStartRep.fulfilled && this.renderTask(battleFriendStartRep.value.battle)}
            <BattleFriendStartFetch battleFriendStartRep={battleFriendStartRep} tags={tags}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        tags: state.battle.tags,
        questionIndex: state.battle.questionIndex,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        battleFriendStartRep: state.repository.battleFriendStart,
    }),
    (dispatch) => ({
        onNavigateTaskClick: questionIndex => dispatch(questionIndexChanged(questionIndex)),
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap))
    })
)(BattleFriendTask);
