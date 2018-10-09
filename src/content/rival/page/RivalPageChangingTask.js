import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CHANGE_TASK_ACCEPTED} from "../../../lang/langText";
import {getSkill, SKILL_CHANGE_TASK} from "../../../util/skillHelper";

class RivalPageChangingTask extends React.PureComponent {

    renderChangingTask() {
        const {screen} = this.props;
        return <div className='pageCenterHorizontal whoAnswered'>
            <div className='pageCenterVertical'>
                <div className='paddingBottomRem'>{getText(TEXT_CHANGE_TASK_ACCEPTED)}...</div>
                <img alt='' src={getSkill(SKILL_CHANGE_TASK)} height={screen.wisieImgHeight}/>
            </div>
        </div>
    }

    render() {
        return <div className='pageContent'>
            {this.renderChangingTask()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(RivalPageChangingTask);
