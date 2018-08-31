import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RandomTaskProps from "../../component/RandomTaskProps";
import Profiles from "../../component/Profiles";
import ChoosingTaskProps from "../../component/ChoosingTaskProps";
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_OPPONENT_CHOOSING, TEXT_TIME} from "../../../../lang/text";
import sleep from '../../../../media/image/icon/sleep.svg';
import Timer from "../../../../component/timer/Timer";
import {battleInProgressContent} from "../../../../redux/reducer/battle";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../../util/difficultyHelper";

class BattlePageChoosingTaskProps extends React.PureComponent {

    renderOpponentChoosing() {
        const {content, screen} = this.props;
        return <div>
            <div className='pageHeader justifyCenter'>
                <div style={{width: screen.contentWidth / 3}}>
                    {getText(TEXT_OPPONENT_CHOOSING)}
                </div>
            </div>
            <div className='pageHeader'><img alt='' className='sleep' src={sleep} height={80}/></div>
            <div className='pageHeader'>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/>
            </div>
        </div>
    }

    renderContent() {
        const {content, screen, communication, profile, onCategoryChange, onDifficultLevelChange, onDifficultLevelAcceptChange} = this.props;
        const {choosingTaskPropsTag} = content;
        if (_.isNil(choosingTaskPropsTag)) {
            return <RandomTaskProps content={content}/>;
        }
        if (choosingTaskPropsTag === profile.tag) {
            return <ChoosingTaskProps
                screen={{...screen, contentHeight: screen.contentHeight - 100}}
                acceptMsg='BATTLE_CHOOSE_TASK_PROPS'
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
        const {choosingTaskPropsTag} = content;
        return <div className='pageContent battlePageChoosingTaskProps'>
            <Profiles content={content} className='absolute'/>
            {!_.isNil(choosingTaskPropsTag) &&
            <TaskDescription content={content} className='justifyCenter flexColumn pageHeader' taskId={content.taskId}/>}
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.battle.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({
        onCategoryChange: (categoryObject) => dispatch(battleInProgressContent({
            chosenCategory: categoryObject.id,
        })),
        onDifficultLevelChange: (id) => dispatch(battleInProgressContent({
            chosenDifficulty: DIFFICULT_LEVEL_TO_NAME[id],
        })),
        onDifficultLevelAcceptChange: (accept) => dispatch(battleInProgressContent({
            isChosenDifficulty: accept,
        }))
    })
)(BattlePageChoosingTaskProps);
