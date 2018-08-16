import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../component/profile/Profile";
import play from '../../../media/image/icon/play.svg';
import {Anime} from "../../../component/anime/Anime";
import {
    getCategoryLabel,
    getText,
    TEXT_BATTLE,
    TEXT_DRAW_CATEGORY,
    TEXT_DRAW_DIFFICULT,
    TEXT_QUESTION, TEXT_QUESTION_PREPARING, TEXT_TIME, TEXT_WAIT
} from "../../../lang";
import {OBJECTS_CATEGORY} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import {CATEGORY_RANDOM} from "../../../util/categoryHelper";
import _ from 'lodash';
import {renderDifficultyLevelStars, STARS_DIFFICULTY_LEVEL} from "../../../util/taskDifficultyLevel";
import DifficultLevelStars from "../../../component/difficult/DifficultLevelStars";
import Task from "../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../redux/reducer/battle";
import BattlePageProfiles from "./BattlePageProfiles";
import BattlePageTaskDescription from "./BattlePageTaskDescription";
import Timer from "../../../component/timer/Timer";

class BattlePageAnswered extends React.PureComponent {

    renderTask() {
        const {content, onAnswerClick, onSkipAnimationChange, questionIdAnswerIdMap, questionIdSkipAnimationMap, screen} = this.props;
        const {task, correctAnswerId, markedAnswerId} = content;
        return <Task
            correctAnswerId={correctAnswerId}
            answerId={markedAnswerId || questionIdAnswerIdMap[task.id]}
            canChangeAnswer={false}
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
                onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
            }}
        />;
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePageAnswering'>
            <BattlePageTaskDescription className='contentHeader'><div>{`${getText(TEXT_TIME)}: `}<Timer from={content.nextTaskInterval}/></div></BattlePageTaskDescription>
            <BattlePageProfiles className={'profilesAbsolute'}/>
            {this.renderTask()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        profile: state.profile.profile,
        content: state.battle.content,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.battle.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({
    })
)(BattlePageAnswered);
