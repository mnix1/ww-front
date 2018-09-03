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

    render() {
        const {screen} = this.props;
        return <div className='page battlePage' style={{height: screen.contentHeight}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            {this.renderContent()}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(BattlePage);
