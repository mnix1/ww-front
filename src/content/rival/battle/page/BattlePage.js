import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import BattlePageIntro from "./BattlePageIntro";
import BattlePageAnswering from "./BattlePageAnswering";
import BattlePagePreparingNextTask from "./BattlePagePreparingNextTask";
import flag from '../../../../media/image/icon/flag.svg';
import BattlePageAnswered from "./BattlePageAnswered";
import BattlePageClosed from "./BattlePageClosed";
import BattlePageChoosingTaskProps from "./BattlePageChoosingTaskProps";
import BattlePageAnsweringTimeout from "./BattlePageAnsweringTimeout";
import FaCogs from "react-icons/lib/fa/cogs";
import {showOptionsChanged} from "../../../../redux/reducer/battle";
import Modal from "../../../../component/modal/Modal";
import {getText, TEXT_SURRENDER} from "../../../../lang/text";
import _ from 'lodash';
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../../component/button/Button";

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

    renderSurrender() {
        const {onShowOptionsChange, communication, screen} = this.props;
        const imgHeight = screen.isSmallHeight ? 20 : 30;
        return <div className='justifyCenter surrender' onClick={() => {
            communication.send('BATTLE_SURRENDER');
            onShowOptionsChange(false);
        }}>
            <Button material={BUTTON_MATERIAL_BOX_SHADOW} icon={<img alt='' src={flag} height={imgHeight}/>}>
                <div className='justifyCenter flexColumn'>{getText(TEXT_SURRENDER)}</div>
            </Button>
        </div>;
    }

    renderShowOptions() {
        const {onShowOptionsChange, screen} = this.props;
        const imgHeight = screen.isSmallHeight ? 30 : 40;
        return <div className='showOptions'><FaCogs size={imgHeight} onClick={onShowOptionsChange}/></div>
    }

    renderOptions() {
        const content = <div>
            {this.renderSurrender()}
        </div>;
        return <Modal renderExit={false} content={content}/>
    }

    render() {
        const {screen, showOptions} = this.props;
        return <div className='page battlePage' style={{height: screen.contentHeight}}>
            <div className='pageBackground absoluteBackgroundMix'/>
            {this.renderShowOptions()}
            {showOptions && this.renderOptions()}
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
        showOptions: state.battle.showOptions,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.battle.questionIdSkipAnimationMap,

        // question: state.battle.question,
    }),
    (dispatch) => ({
        onShowOptionsChange: (showOptions) => dispatch(showOptionsChanged(_.defaultTo(showOptions, true)))
    })
)(BattlePage);
