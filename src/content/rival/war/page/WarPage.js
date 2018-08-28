import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import WarPageIntro from "./WarPageIntro";
import WarPageAnswering from "./WarPageAnswering";
import WarPagePreparingNextTask from "./WarPagePreparingNextTask";
import flag from '../../../../media/image/icon/flag.svg';
import WarPageAnswered from "./WarPageAnswered";
import WarPageClosed from "./WarPageClosed";
import WarPageChoosingTaskProps from "./WarPageChoosingTaskProps";
import WarPageAnsweringTimeout from "./WarPageAnsweringTimeout";
import FaCogs from "react-icons/lib/fa/cogs";
import {showOptionsChanged} from "../../../../redux/reducer/war";
import Modal from "../../../../component/modal/Modal";
import {getText, TEXT_SURRENDER} from "../../../../lang/text";
import _ from 'lodash';

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
        if (status === 'CLOSED') {
            return <WarPageClosed/>
        }
        return <div className='pageContent'>
        </div>;
    }

    renderSurrender() {
        const {onShowOptionsChange, communication, screen} = this.props;
        const imgHeight = screen.isSmallHeight ? 30 : 60;
        return <div className='surrender' onClick={() => {
            communication.send('WAR_SURRENDER');
            onShowOptionsChange(false);
        }}>
            <span>{getText(TEXT_SURRENDER)}</span>
            <img alt='' src={flag} height={imgHeight} style={{marginTop: -imgHeight}}/>
        </div>
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
        return <div className='page warPage' style={{height: screen.contentHeight}}>
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
        // opponentProfile: state.war.opponent,
        profile: state.profile.profile,
        content: state.war.content,
        showOptions: state.war.showOptions,
        questionIdAnswerIdMap: state.war.questionIdAnswerIdMap,
        questionIdSkipAnimationMap: state.war.questionIdSkipAnimationMap,

        // question: state.war.question,
    }),
    (dispatch) => ({
        onShowOptionsChange: (showOptions) => dispatch(showOptionsChanged(_.defaultTo(showOptions, true)))
    })
)(WarPage);
