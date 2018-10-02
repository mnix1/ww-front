import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RandomTaskProps from "../component/RandomTaskProps";
import ChoosingTaskProps from "../component/ChoosingTaskProps";
import TaskDescription from "../component/TaskDescription";
import {getText, TEXT_OPPONENT_CHOOSING, TEXT_TIME} from "../../../lang/langText";
import sleep from '../../../media/image/icon/sleep.svg';
import Timer from "../../../component/timer/Timer";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../util/difficultyHelper";
import {rivalInProgressContent} from "../../../redux/reducer/rival";
import Teams from "../component/Teams";
import {RIVAL_TYPE_BATTLE} from "../../../util/rivalHelper";
import Profiles from "../component/Profiles";
import {rivalScreen} from "../../../util/screenHelper";

class RivalPageChoosingTaskProps extends React.PureComponent {

    renderOpponentChoosing() {
        const {content, screen} = this.props;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div>
            <div className='pageHeader justifyCenter'>
                <div style={{width: screen.contentWidth / 3}}>
                    {getText(TEXT_OPPONENT_CHOOSING)}
                </div>
            </div>
            <div className='pageHeader'><img alt='' className='sleep' src={sleep} height={screen.wisieImgHeight}/></div>
            <div className='pageHeader'>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/>
            </div>
            {!battle && <Teams content={content}/>}
        </div>
    }

    renderContent() {
        const {content, screen, communication, onCategoryChange, onDifficultLevelChange, onDifficultLevelAcceptChange} = this.props;
        const {choosingTaskPropsTag} = content;
        if (_.isNil(choosingTaskPropsTag)) {
            return <RandomTaskProps content={content}/>;
        }
        if (choosingTaskPropsTag === content.profile.tag) {
            return <ChoosingTaskProps
                screen={rivalScreen({
                    screen,
                    offsetHeight: 56,
                    offsetWidth: 0
                })}
                renderPoints={false}
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
        const {content} = this.props;
        const {choosingTaskPropsTag, profile} = content;
        const battle = content.type === RIVAL_TYPE_BATTLE;
        return <div className='pageContent warPageChoosingTaskProps'>
            {battle ? <Profiles content={content} className='absolute'/>
                : choosingTaskPropsTag === profile.tag && <Teams forceAbsolute={true} content={content}/>}
            {!_.isNil(choosingTaskPropsTag) &&
            <TaskDescription content={content} className='justifyCenter flexColumn pageHeader' taskId={content.taskId}
                             renderTaskCount={battle}/>}
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
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
