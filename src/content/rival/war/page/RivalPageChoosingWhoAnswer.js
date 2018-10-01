import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CHOOSE_WHO_ANSWER, TEXT_TIME} from "../../../../lang/langText";
import Team from "../../component/Team";
import {rivalInProgressContent} from "../../../../redux/reducer/rival";
import TaskDescription from "../../component/TaskDescription";
import _ from 'lodash';
import Timer from "../../../../component/timer/Timer";
import cn from 'classnames';

class RivalPageChoosingWhoAnswer extends React.PureComponent {

    renderTeamBig() {
        const {content, communication, onTeamClick} = this.props;
        const chosen = content.isChosenActiveIndex;
        const className = cn('justifyCenter overflowHidden width100', {
            disabled: chosen
        });
        return <div className='team justifyCenter flexColumn fontSize08Rem'>
            <Team
                renderHobbies={true}
                className={className}
                contentClassName='overflowXAuto justifyStart'
                memberClassName={chosen ? '' : 'pointer'}
                onClick={chosen ? _.noop : i => onTeamClick(i, communication)}
                presentIndexes={content.presentIndexes}
                activeIndex={content.activeIndex}
                team={content.team}/>
        </div>;
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent'>
            <TaskDescription
                content={content}
                renderTaskPoints={false}
                renderTaskCount={false}
                className='justifyCenter flexColumn pageHeader'
            >
                <div>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingWhoAnswerInterval}/></div>
            </TaskDescription>
            <div className='pageHeader'>{getText(TEXT_CHOOSE_WHO_ANSWER)}</div>
            {this.renderTeamBig()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({
        onTeamClick: (index, communication) => {
            communication.sendWhoAnswer(index);
            dispatch(rivalInProgressContent({activeIndex: index, isChosenActiveIndex: true}))
        }
    })
)(RivalPageChoosingWhoAnswer);
