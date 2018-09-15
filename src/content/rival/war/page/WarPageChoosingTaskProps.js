import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RandomTaskProps from "../../component/RandomTaskProps";
import ChoosingTaskProps from "../../component/ChoosingTaskProps";
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_OPPONENT_CHOOSING, TEXT_TIME} from "../../../../lang/langText";
import sleep from '../../../../media/image/icon/sleep.svg';
import Timer from "../../../../component/timer/Timer";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../../util/difficultyHelper";
import {rivalInProgressContent} from "../../../../redux/reducer/rival";
import Teams from "../../component/Teams";

class WarPageChoosingTaskProps extends React.PureComponent {

    renderOpponentChoosing() {
        const {content, screen} = this.props;
        return <div>
            <div className='pageHeader justifyCenter'>
                <div style={{width: screen.contentWidth / 3}}>
                    {getText(TEXT_OPPONENT_CHOOSING)}
                </div>
            </div>
            <div className='pageHeader'><img alt='' className='sleep' src={sleep} height={screen.wisieImgHeight}/></div>
            <div className='pageHeader'>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/>
            </div>
            <Teams content={content}/>
        </div>
    }

    renderContent() {
        const {content, screen, rivalType, communication, onCategoryChange, onDifficultLevelChange, onDifficultLevelAcceptChange} = this.props;
        const {choosingTaskPropsTag} = content;
        if (_.isNil(choosingTaskPropsTag)) {
            return <RandomTaskProps content={content}/>;
        }
        if (choosingTaskPropsTag === content.profile.tag) {
            return <ChoosingTaskProps
                screen={{...screen, contentHeight: screen.contentHeight - 70, contentWidth: screen.contentWidth - 80}}
                renderPoints={false}
                rivalType={rivalType}
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
        return <div className='pageContent warPageChoosingTaskProps'>
            {choosingTaskPropsTag === profile.tag && <Teams forceAbsolute={true} content={content}/>}
            {!_.isNil(choosingTaskPropsTag) &&
            <TaskDescription content={content} className='justifyCenter flexColumn pageHeader' taskId={content.taskId}
                             renderTaskCount={false}/>}
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
        rivalType: state.rival.rivalType,
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
)(WarPageChoosingTaskProps);
