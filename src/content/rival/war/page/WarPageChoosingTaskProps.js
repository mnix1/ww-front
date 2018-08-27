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
import {categoryChanged, difficultLevelChanged} from "../../../../redux/reducer/war";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../../util/difficultyHelper";

class WarPageChoosingTaskProps extends React.PureComponent {

    renderOpponentChoosing(){
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
        const {content, communication, profile, difficultyLevel, category, onCategoryChange, onDifficultLevelChange} = this.props;
        const {choosingTaskPropsTag} = content;
        if (_.isNil(choosingTaskPropsTag)) {
            return <RandomTaskProps content={content}/>;
        }
        if (choosingTaskPropsTag === profile.tag) {
            return <ChoosingTaskProps
                acceptMsg='WAR_CHOOSE_TASK_PROPS'
                content={content}
                onCategoryChange={onCategoryChange}
                onDifficultLevelChange={onDifficultLevelChange}
                category={category}
                difficultyLevel={difficultyLevel}
                communication={communication}
            />
        }
        return this.renderOpponentChoosing();
    }

    render() {
        const {content} = this.props;
        const {choosingTaskPropsTag} = content;
        return <div className='pageContent warPageChoosingTaskProps'>
            <Profiles content={content} className='absolute'/>
            {!_.isNil(choosingTaskPropsTag) && <TaskDescription content={content} className='pageHeader' taskId={content.taskId}/>}
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.war.content,
        category: state.war.category,
        difficultyLevel: state.war.difficultyLevel,
        profile: state.profile.profile,
    }),
    (dispatch) => ({
        onCategoryChange: (categoryObject) => dispatch(categoryChanged(categoryObject.id)),
        onDifficultLevelChange: (id) => dispatch(difficultLevelChanged(DIFFICULT_LEVEL_TO_NAME[id]))
    })
)(WarPageChoosingTaskProps);
