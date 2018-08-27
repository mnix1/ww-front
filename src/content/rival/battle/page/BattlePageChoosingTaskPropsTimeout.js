import React from 'react';
import {connect} from 'react-redux';
import RandomTaskProps from "../../component/RandomTaskProps";
import Profiles from "../../component/Profiles";
import {getText, TEXT_NOT_CHOSEN_TASK_PROPS} from "../../../../lang/text";

class BattlePageChoosingTaskPropsTimeout extends React.PureComponent {

    renderContent() {
        const {screen, content} = this.props;
        return <RandomTaskProps content={content}>
            <div className='pageHeader justifyCenter'>
                <div style={{width: screen.contentWidth / 2}}>
                    {getText(TEXT_NOT_CHOSEN_TASK_PROPS)}
                </div>
            </div>
        </RandomTaskProps>;
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePageChosenTaskProps'>
            <Profiles content={content} className='absolute'/>
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
    (dispatch) => ({})
)(BattlePageChoosingTaskPropsTimeout);
