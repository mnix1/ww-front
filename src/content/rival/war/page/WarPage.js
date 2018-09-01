import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import WarPageIntro from "./WarPageIntro";
import WarPageAnswering from "./WarPageAnswering";
import WarPagePreparingNextTask from "./WarPagePreparingNextTask";
import WarPageAnswered from "./WarPageAnswered";
import WarPageClosed from "./WarPageClosed";
import WarPageChoosingTaskProps from "./WarPageChoosingTaskProps";
import WarPageAnsweringTimeout from "./WarPageAnsweringTimeout";
import FaCogs from "react-icons/lib/fa/cogs";
import _ from 'lodash';
import WarPageChoosingWhoAnswer from "./WarPageChoosingWhoAnswer";
import {showOptionsChanged} from "../../../../redux/reducer/rival";
import Options from "../../component/Options";

class WarPage extends React.PureComponent {

    renderContent() {
        const {content, communication} = this.props;
        if (!content) {
            return null;
        }
        const {status} = content;
        if (status === 'INTRO') {
            return <WarPageIntro/>
        }
        if (status === 'PREPARING_NEXT_TASK' || status === 'CHOSEN_TASK_PROPS') {
            return <WarPagePreparingNextTask/>
        }
        if (status === 'ANSWERING') {
            return <WarPageAnswering communication={communication}/>
        }
        if (status === 'ANSWERED') {
            return <WarPageAnswered/>
        }
        if (status === 'ANSWERING_TIMEOUT') {
            return <WarPageAnsweringTimeout/>
        }
        if (status === 'CHOOSING_TASK_PROPS') {
            return <WarPageChoosingTaskProps communication={communication}/>
        }
        if (status === 'CHOOSING_WHO_ANSWER') {
            return <WarPageChoosingWhoAnswer communication={communication}/>
        }
        if (status === 'CLOSED') {
            return <WarPageClosed/>
        }
        return <div className='pageContent'>
        </div>;
    }

    renderShowOptions() {
        const {onShowOptionsChange, screen} = this.props;
        const imgHeight = screen.isSmallHeight ? 30 : 40;
        return <div className='showOptions'><FaCogs size={imgHeight} onClick={onShowOptionsChange}/></div>
    }

    render() {
        const {screen, showOptions, onShowOptionsChange, communication} = this.props;
        return <div className='page warPage' style={{height: screen.contentHeight}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            {this.renderShowOptions()}
            {showOptions && <Options
                onShowOptionsChange={onShowOptionsChange}
                communication={communication}
                surrenderMsg='WAR_SURRENDER'
                screen={screen}
            />}
            {this.renderContent()}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        socket: state.socket.socket,
        // opponentProfile: state.war.opponent,
        profile: state.profile.profile,
        content: state.rival.content,
        showOptions: state.rival.showOptions,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,

        // question: state.war.question,
    }),
    (dispatch) => ({
        onShowOptionsChange: (showOptions) => dispatch(showOptionsChanged(_.defaultTo(showOptions, true)))
    })
)(WarPage);
