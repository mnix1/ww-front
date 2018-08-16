import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../component/profile/Profile";
import {Anime} from "../../../component/anime/Anime";
import _ from 'lodash';
import Task from "../../../component/task/Task";
import {BattlePageProfilesComponent} from "./BattlePageProfiles";
import BattlePageTaskDescription from "./BattlePageTaskDescription";
import FaTimesCircleO from "react-icons/lib/fa/times-circle-o";
import FaCheckCircleO from "react-icons/lib/fa/check-circle-o";
import {GREEN_COLOR, RED_COLOR} from "../../../util/style/constant";
import {getText, TEXT_ANSWERED, TEXT_CORRECT, TEXT_CORRECT_ANSWER, TEXT_WRONG} from "../../../lang";
import thumbUp from '../../../media/image/icon/thumbUp.svg';
import thumbDown from '../../../media/image/icon/thumbDown.svg';

class BattlePageAnswered extends React.PureComponent {

    renderTask() {
        const {content, onAnswerClick, onSkipAnimationChange, questionIdAnswerIdMap, questionIdSkipAnimationMap, screen} = this.props;
        const {task, correctAnswerId, markedAnswerId} = content;
        return <Task
            className='taskWithAnswer'
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
        />
    }

    renderEmptyTask() {
        const {content, screen} = this.props;
        const {task} = content;
        return <Task
            className='emptyTask'
            anime={false}
            screen={screen}
            skipAnimation={true}
            question={task}
            answers={task.answers}
        />;
    }

    renderWhoAnswered() {
        const {content, profile} = this.props;
        const {meAnswered, opponent, correctAnswerId, marketAnswerId} = content;
        const answeredProfile = meAnswered ? profile : opponent;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageBackground'/>
            <div className='pageCenterVertical'>
                <Profile {...answeredProfile}/>
                <div>{getText(TEXT_ANSWERED)}...</div>
                <div className='result'>
                    {correctAnswerId === marketAnswerId
                        ? <div><div>{getText(TEXT_CORRECT)}</div><img src={thumbUp} height={60}/></div>
                        : <div><div>{getText(TEXT_WRONG)}</div><img src={thumbDown} height={60}/></div>}
                </div>
            </div>
        </div>
    }

    renderProfilesWithNewScore() {
        const {content, profile, screen} = this.props;
        return <Anime
            targetAsChildProp='content'
            from={{score: content.score, opponentScore: content.opponentScore, opponent: content.opponent}}
            to={{
                score: {value: content.newScore, duration: 1000, delay: 7000},
                opponentScore: {value: content.newOpponentScore, duration: 1000, delay: 7000}
            }}>
            <BattlePageProfilesComponent className={'profilesAbsolute'} profile={profile} screen={screen}/>
        </Anime>;
    }

    render() {
        return <div className='pageContent battlePageAnswered'>
            <BattlePageTaskDescription className='contentHeader'/>
            {this.renderProfilesWithNewScore()}
            {this.renderWhoAnswered()}
            {this.renderEmptyTask()}
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
    (dispatch) => ({})
)(BattlePageAnswered);
