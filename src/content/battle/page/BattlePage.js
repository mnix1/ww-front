import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../redux/reducer/battle";
import BattlePageIntro from "./BattlePageIntro";
import BattlePageAnswering from "./BattlePageAnswering";
import BattlePagePreparingNextTask from "./BattlePagePreparingNextTask";
import flag from '../../../media/image/icon/flag.svg';
import BattlePageAnswered from "./BattlePageAnswered";
import BattlePageClosed from "./BattlePageClosed";

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
        if (status === 'PREPARING_NEXT_TASK') {
            return <BattlePagePreparingNextTask/>
        }
        if (status === 'ANSWERING') {
            return <BattlePageAnswering communication={communication}/>
        }
        if (status === 'ANSWERED' || status === 'ANSWERING_TIMEOUT') {
            return <BattlePageAnswered/>
        }
        if (status === 'CLOSED') {
            return <BattlePageClosed/>
        }
        return <div className='pageContent'>
        </div>;
    }

    renderSurrender() {
        const {onSurrenderClick, communication} = this.props;
        return <div className='surrender'>
            <img src={flag} height={60} onClick={() => {
                communication.send('BATTLE_SURRENDER');
                onSurrenderClick();
            }}/>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page battlePage' style={{height: screen.contentHeight}}>
            <div className='pageBackground'/>
            {this.renderSurrender()}
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
        content: state.battle.content,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.battle.questionIdSkipAnimationMap,

        // question: state.battle.question,
    }),
    (dispatch) => ({
        onSurrenderClick: () => {
        }
    })
)(BattlePage);
