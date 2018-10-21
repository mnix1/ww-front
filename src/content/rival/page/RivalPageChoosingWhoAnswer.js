import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CHOOSE_WHO_ANSWER, TEXT_OPPONENT_TEAM} from "../../../lang/langText";
import Team from "../component/Team";
import {rivalInProgressContent} from "../../../redux/reducer/rival";
import TaskDescription from "../component/TaskDescription";
import _ from 'lodash';
import cn from 'classnames';
import AvailableSkills from "../../../component/skill/AvailableSkills";
import {SKILL_LIFEBUOY} from "../../../util/skillHelper";
import {RIVAL_TYPE_CHALLENGE} from "../../../util/rivalHelper";

class RivalPageChoosingWhoAnswer extends React.PureComponent {

    handleLifebuoyClick = (index) => {
        const {communication} = this.props;
        communication.sendLifebuoy(index);
    };

    renderTeamBig() {
        const {content, communication, onTeamClick} = this.props;
        const chosen = content.isChosenActiveIndex;
        const className = cn('justifyCenter overflowHidden width100', {
            disabled: chosen
        });
        return <div className='team justifyCenter flexColumn fontSize08Rem'>
            <Team
                renderLifebuoyChoose={content.skills[SKILL_LIFEBUOY].canUse}
                onLifebuoyClick={this.handleLifebuoyClick}
                className={className}
                contentClassName='overflowXAuto overflowYHidden justifyStart'
                memberClassName={chosen ? '' : 'pointer'}
                onClick={chosen ? _.noop : i => onTeamClick(i, communication)}
                presentIndexes={content.presentIndexes}
                activeIndex={content.activeIndex}
                team={content.team}/>
            <AvailableSkills skills={content.skills}/>
        </div>;
    }

    renderOpponentTeamBig() {
        const {content} = this.props;
        return <div className='team justifyCenter flexColumn fontSize08Rem'>
            <Team
                contentClassName='overflowXAuto overflowYHidden justifyStart'
                presentIndexes={content.opponentPresentIndexes}
                team={content.opponentTeam}/>
            <AvailableSkills skills={content.opponentSkills}/>
        </div>;
    }

    render() {
        // console.log('RivalPageChoosingWhoAnswer render');
        const {content} = this.props;
        const challenge = content.type === RIVAL_TYPE_CHALLENGE;
        return <div className='pageContent'>
            <TaskDescription
                task={content.task}
                taskCount={content.taskCount}
                renderScore={challenge}
                score={content.score}
                renderTaskPoints={false}
                renderTaskCount={false}
                renderTimer={true}
                interval={content.choosingWhoAnswerInterval}
                className='justifyCenter flexColumn pageHeader'
            />
            <div className='pageHeader'>{getText(TEXT_CHOOSE_WHO_ANSWER)}</div>
            {this.renderTeamBig()}
            {content.opponent && <div className='pageHeader'>{getText(TEXT_OPPONENT_TEAM)}</div>}
            {content.opponent && this.renderOpponentTeamBig()}
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
        onTeamClick: (index, communication) => {
            communication.sendWhoAnswer(index);
            dispatch(rivalInProgressContent({activeIndex: index, isChosenActiveIndex: true}))
        }
    })
)(RivalPageChoosingWhoAnswer);
