import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import BattlePageIntro from "./BattlePageIntro";
import BattlePageAnswering from "./BattlePageAnswering";
import BattlePagePreparingNextTask from "./BattlePagePreparingNextTask";
import BattlePageAnswered from "./BattlePageAnswered";
import BattlePageClosed from "./BattlePageClosed";
import BattlePageChoosingTaskProps from "./BattlePageChoosingTaskProps";
import BattlePageAnsweringTimeout from "./BattlePageAnsweringTimeout";
import FaCogs from "react-icons/lib/fa/cogs";
import _ from 'lodash';
import {showOptionsChanged} from "../../../../redux/reducer/rival";
import Options from "../../component/Options";

class BattlePage extends React.PureComponent {

    renderContent() {
        const {content, communication} = this.props;
        if (!content) {
            return null;
        }
        const {status} = content;
        if (status === 'INTRO') {
            return <BattlePageIntro/>
        }
        if (status === 'PREPARING_NEXT_TASK' || status === 'CHOSEN_TASK_PROPS') {
            return <BattlePagePreparingNextTask/>
        }
        if (status === 'ANSWERING') {
            return <BattlePageAnswering communication={communication}/>
        }
        if (status === 'ANSWERED') {
            return <BattlePageAnswered/>
        }
        if (status === 'ANSWERING_TIMEOUT') {
            return <BattlePageAnsweringTimeout/>
        }
        if (status === 'CHOOSING_TASK_PROPS') {
            return <BattlePageChoosingTaskProps communication={communication}/>
        }
        if (status === 'CLOSED') {
            return <BattlePageClosed/>
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
        return <div className='page battlePage' style={{height: screen.contentHeight}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            {this.renderShowOptions()}
            {showOptions && <Options
                onShowOptionsChange={onShowOptionsChange}
                communication={communication}
                surrenderMsg='BATTLE_SURRENDER'
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
        // opponentProfile: state.battle.opponent,
        profile: state.profile.profile,
        content: state.rival.content,
        showOptions: state.rival.showOptions,
        questionIdAnswerIdMap: state.rival.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.rival.questionIdSkipAnimationMap,

        // question: state.battle.question,
    }),
    (dispatch) => ({
        onShowOptionsChange: (showOptions) => dispatch(showOptionsChanged(_.defaultTo(showOptions, true)))
    })
)(BattlePage);
