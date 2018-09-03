import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_ACCEPT, TEXT_CHOOSE_WHO_ANSWER, TEXT_TIME} from "../../../../lang/langText";
import Team from "../../component/Team";
import {rivalInProgressContent} from "../../../../redux/reducer/rival";
import TaskDescription from "../../component/TaskDescription";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../../component/button/Button";
import _ from 'lodash';
import Timer from "../../../../component/timer/Timer";

class WarPageChoosingWhoAnswer extends React.PureComponent {

    renderTeamBig() {
        const {content, communication, onTeamClick, onTeamAcceptClick} = this.props;
        const chosen = content.isChosenActiveIndex;
        return <div className='team justifyCenter flexColumn fontSize08Rem'>
            <Team
                renderHobbies={true}
                className={chosen ? 'disabled' : ''}
                memberClassName={chosen ? '' : 'pointer'}
                onClick={chosen ? _.noop : onTeamClick}
                profile={content.profile}
                presentIndexes={content.presentIndexes}
                activeIndex={content.activeIndex}
                team={content.team}/>
            <div className='justifyCenter marginRem'>
                <Button className={chosen ? 'disabled' : ''} onClick={chosen
                    ? _.noop
                    : () => {
                        communication.send('WAR_CHOOSE_WHO_ANSWER' + JSON.stringify({activeIndex: content.activeIndex}));
                        onTeamAcceptClick(true);
                    }} material={BUTTON_MATERIAL_BOX_SHADOW}>{getText(TEXT_ACCEPT)}</Button>
            </div>
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
        onTeamClick: (index) => dispatch(rivalInProgressContent({activeIndex: index})),
        onTeamAcceptClick: (accept) => dispatch(rivalInProgressContent({isChosenActiveIndex: accept}))
    })
)(WarPageChoosingWhoAnswer);
