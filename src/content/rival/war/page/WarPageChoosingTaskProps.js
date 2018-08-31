import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RandomTaskProps from "../../component/RandomTaskProps";
import ChoosingTaskProps from "../../component/ChoosingTaskProps";
import TaskDescription from "../../component/TaskDescription";
import {getText, TEXT_OPPONENT_CHOOSING, TEXT_OPPONENT_TEAM, TEXT_TIME, TEXT_YOUR_TEAM} from "../../../../lang/text";
import sleep from '../../../../media/image/icon/sleep.svg';
import Timer from "../../../../component/timer/Timer";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../../util/difficultyHelper";
import {warInProgressContent} from "../../../../redux/reducer/war";
import Team from "../../component/Team";

class WarPageChoosingTaskProps extends React.PureComponent {

    renderOpponentChoosing() {
        const {content, profile, screen} = this.props;
        return <div>
            <div className='pageHeader justifyCenter'>
                <div style={{width: screen.contentWidth / 3}}>
                    {getText(TEXT_OPPONENT_CHOOSING)}
                </div>
            </div>
            <div className='pageHeader'><img alt='' className='sleep' src={sleep} height={80}/></div>
            <div className='pageHeader'>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/>
            </div>
            <div className='pageHeader'>{getText(TEXT_YOUR_TEAM)}</div>
            <div className='pageHeader fontSize08Rem'>
                <Team renderHobbies={true} profile={profile} team={content.team}
                      presentIndexes={content.presentIndexes}/>
            </div>
            <div className='pageHeader'>{getText(TEXT_OPPONENT_TEAM)}</div>
            <div className='pageHeader fontSize08Rem'>
                <Team renderHobbies={true} profile={content.opponent} team={content.opponentTeam}
                      presentIndexes={content.opponentPresentIndexes}/>
            </div>
        </div>
    }

    renderTeams() {
        const {content, profile, screen} = this.props;
        const renderImg = screen.contentHeight - 40 > 480;
        return <div className='contentHeader justifyBetween fontSize07Rem' style={{zIndex: 0}}>
            <div style={{marginLeft: '0.25rem'}}>
                <div>{getText(TEXT_YOUR_TEAM)}</div>
                <div>
                    <Team renderImg={renderImg} renderHobbies={true} imgHeight={40} imgHobbyHeight={14} contentClassName='flexColumn'
                          className='justifyStart' profile={profile} team={content.team}
                          presentIndexes={content.presentIndexes}/>
                </div>
            </div>
            <div style={{marginRight: '0.25rem'}}>
                <div>{getText(TEXT_OPPONENT_TEAM)}</div>
                <div>
                    <Team renderImg={renderImg} renderHobbies={true} imgHeight={40} imgHobbyHeight={14} contentClassName='flexColumn'
                          className='justifyEnd' profile={content.opponent} team={content.opponentTeam}
                          presentIndexes={content.opponentPresentIndexes}/>
                </div>
            </div>
        </div>;
    }

    renderContent() {
        const {content, screen, communication, profile, onCategoryChange, onDifficultLevelChange, onDifficultLevelAcceptChange} = this.props;
        const {choosingTaskPropsTag} = content;
        if (_.isNil(choosingTaskPropsTag)) {
            return <RandomTaskProps content={content}/>;
        }
        if (choosingTaskPropsTag === profile.tag) {
            return <ChoosingTaskProps
                screen={{...screen, contentHeight: screen.contentHeight - 80, contentWidth: screen.contentWidth - 80}}
                renderPoints={false}
                acceptMsg='WAR_CHOOSE_TASK_PROPS'
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
        const {content, profile} = this.props;
        const {choosingTaskPropsTag} = content;
        return <div className='pageContent warPageChoosingTaskProps'>
            {choosingTaskPropsTag === profile.tag && this.renderTeams()}
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
        content: state.war.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({
        onCategoryChange: (categoryObject) => dispatch(warInProgressContent({
            chosenCategory: categoryObject.id,
        })),
        onDifficultLevelChange: (id) => dispatch(warInProgressContent({
            chosenDifficulty: DIFFICULT_LEVEL_TO_NAME[id],
        })),
        onDifficultLevelAcceptChange: (accept) => dispatch(warInProgressContent({
            isChosenDifficulty: accept,
        }))
    })
)(WarPageChoosingTaskProps);
