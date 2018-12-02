import React from 'react';
import {connect} from 'react-redux';
import RandomTaskProps from "../component/RandomTaskProps";
import ChoosingTaskProps from "../component/ChoosingTaskProps";
import TaskDescription from "../component/TaskDescription";
import {
    getText,
    TEXT_OPPONENT_CHOOSING,
    TEXT_OPPONENT_CHOOSING_CATEGORY,
    TEXT_OPPONENT_CHOOSING_DIFFICULTY,
    TEXT_TIME
} from "../../../lang/langText";
import sleep from '../../../media/image/icon/sleep.svg';
import Timer from "../../../component/timer/Timer";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../util/difficultyHelper";
import {rivalInProgressContent} from "../../../redux/reducer/rival";
import Teams from "../component/Teams";
import {
    RIVAL_CONTENT_STATUS_CHOOSING_TASK_CATEGORY,
    RIVAL_CONTENT_STATUS_CHOOSING_TASK_DIFFICULTY,
    RIVAL_CONTENT_STATUS_RANDOM_TASK_PROPS,
    RIVAL_TYPE_BATTLE
} from "../../../util/rivalHelper";
import Profiles from "../component/Profiles";
import {rivalScreen} from "../../../util/screenHelper";

class RivalPageChoosingTaskProps extends React.PureComponent {

    renderOpponentChoosing() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div>
            <div className='pageHeader justifyCenter'>
                <div style={{width: screen.contentWidth / 3}}>
                    {getText(content.status === RIVAL_CONTENT_STATUS_CHOOSING_TASK_CATEGORY
                        ? TEXT_OPPONENT_CHOOSING_CATEGORY
                        : content.status === RIVAL_CONTENT_STATUS_CHOOSING_TASK_DIFFICULTY
                            ? TEXT_OPPONENT_CHOOSING_DIFFICULTY
                            : TEXT_OPPONENT_CHOOSING)}
                </div>
            </div>
            <div className='pageHeader'><img alt='' className='sleep' src={sleep} height={screen.rivalImgHeight}/></div>
            <div className='pageHeader'>{`${getText(TEXT_TIME)}: `}<Timer from={content.nextTimeout- content.currentTimeout} value={content.nextTimeout - content.now}/>
            </div>
            {!battle && <Teams content={content}/>}
        </div>
    }

    renderContent() {
        const {content, screen, communication, onCategoryChange, onDifficultLevelChange, onDifficultLevelAcceptChange} = this.props;
        const {meChoosingTaskProps, status} = content;
        if (RIVAL_CONTENT_STATUS_RANDOM_TASK_PROPS === status) {
            return <RandomTaskProps className='randomTaskProps' content={content}/>;
        }
        const battle = content.type === RIVAL_TYPE_BATTLE;
        if (meChoosingTaskProps) {
            return <ChoosingTaskProps
                screen={rivalScreen({
                    screen,
                    offsetHeight: 56,
                    offsetWidth: 0
                })}
                renderPoints={battle}
                content={content}
                onCategoryChange={onCategoryChange}
                onDifficultLevelChange={onDifficultLevelChange}
                onDifficultLevelAcceptChange={onDifficultLevelAcceptChange}
                communication={communication}
            />;
        }
        return this.renderOpponentChoosing();
    }

    render() {
        // console.log('RivalPageChoosingTaskProps render');
        const {content} = this.props;
        const {meChoosingTaskProps, status} = content;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPageChoosingTaskProps'>
            {battle ? <Profiles className='absolute'/>
                : meChoosingTaskProps && <Teams forceAbsolute={true} content={content}/>}
            {RIVAL_CONTENT_STATUS_RANDOM_TASK_PROPS !== status &&
            <TaskDescription
                taskCount={content.taskCount}
                className='justifyCenter flexColumn pageHeader'
                task={content.task}
                renderTaskCount={battle}/>}
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
        communication: state.socket.rivalCommunication,
    }),
    (dispatch) => ({
        onCategoryChange: (categoryObject) => dispatch(rivalInProgressContent({
            chosenCategory: categoryObject.id,
        })),
        onDifficultLevelChange: (id) => dispatch(rivalInProgressContent({
            chosenDifficulty: DIFFICULT_LEVEL_TO_NAME[id],
        })),
        onDifficultLevelAcceptChange: (accept) => dispatch(rivalInProgressContent({
            isChosenDifficulty: accept,
        }))
    })
)(RivalPageChoosingTaskProps);
