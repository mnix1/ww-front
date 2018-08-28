import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Task from "../../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../../redux/reducer/war";
import TaskDescription from "../../component/TaskDescription";
import Timer from "../../../../component/timer/Timer";
import {getText, TEXT_TIME} from "../../../../lang/text";
import ActiveHeroes from "../../component/ActiveHeroes";
import Hero from "../../../../component/hero/Hero";
import Profile from "../../../../component/profile/Profile";
import WarTaskDescription from "../../component/WarTaskDescription";

class WarPageAnswering extends React.PureComponent {

    renderTaskActive() {
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
                communication.send('WAR_ANSWER' + JSON.stringify({answerId}));
                onAnswerClick({...questionIdAnswerIdMap, [task.id]: answerId});
            }}
        />;
    }

    renderTaskNotActive() {
        const {content, screen} = this.props;
        const {task, team, activeIndex, opponentTeam, opponentActiveIndex} = content;
        return <div>
            <div className='pageHeader'>
                <Hero {...team[activeIndex - 1]} renderDetails={true} renderHobbies={false} isOwned={true}/>
                {opponentActiveIndex === 0
                    ? <Profile renderDetailsHorizontal={true} {...content.opponent}/>
                    : <Hero {...opponentTeam[opponentActiveIndex - 1]} renderDetails={true} renderHobbies={false}
                            isOwned={true}/>
                }
            </div>
            <Task
                screen={{...screen, contentHeight: screen.contentHeight - 200}}
                skipAnimation={true}
                question={task}
                answers={task.answers}
            />
        </div>;
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent warPageAnswering'>
            <WarTaskDescription content={content} className='pageHeader'>
                <div>{`${getText(TEXT_TIME)}: `}<Timer from={content.endAnsweringInterval}/></div>
            </WarTaskDescription>
            <ActiveHeroes content={content} className='absolute'/>
            {content.activeIndex === 0 ? this.renderTaskActive() : this.renderTaskNotActive()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        // opponentProfile: state.war.opponent,
        profile: state.profile.profile,
        content: state.war.content,
        questionIdAnswerIdMap: state.war.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.war.questionIdSkipAnimationMap,
    }),
    (dispatch) => ({
        onAnswerClick: questionIdAnswerIdMap => dispatch(questionIdAnswerIdMapChanged(questionIdAnswerIdMap)),
        onSkipAnimationChange: questionIdSkipAnimationMap => dispatch(questionIdSkipAnimationMapChanged(questionIdSkipAnimationMap))
    })
)(WarPageAnswering);
