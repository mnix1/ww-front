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
import MeshBackground, {MESH_4} from "../../../../component/background/MeshBackground";
import {
    RIVAL_CONTENT_STATUS_ANSWERED,
    RIVAL_CONTENT_STATUS_ANSWERING,
    RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT,
    RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CHOSEN_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CLOSED,
    RIVAL_CONTENT_STATUS_INTRO,
    RIVAL_CONTENT_STATUS_PREPARING_NEXT_TASK
} from "../../../../util/rivalHelper";

class BattlePage extends React.PureComponent {
    renderContent() {
        const {content, communication} = this.props;
        if (!content) {
            return null;
        }
        const {status} = content;
        if (status === RIVAL_CONTENT_STATUS_INTRO) {
            return <BattlePageIntro/>
        }
        if (status === RIVAL_CONTENT_STATUS_PREPARING_NEXT_TASK || status === RIVAL_CONTENT_STATUS_CHOSEN_TASK_PROPS) {
            return <BattlePagePreparingNextTask/>
        }
        if (status === RIVAL_CONTENT_STATUS_ANSWERING) {
            return <BattlePageAnswering communication={communication}/>
        }
        if (status === RIVAL_CONTENT_STATUS_ANSWERED) {
            return <BattlePageAnswered/>
        }
        if (status === RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT) {
            return <BattlePageAnsweringTimeout/>
        }
        if (status === RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS) {
            return <BattlePageChoosingTaskProps communication={communication}/>
        }
        if (status === RIVAL_CONTENT_STATUS_CLOSED) {
            return <BattlePageClosed/>
        }
        return <div className='pageContent'>
        </div>;
    }

    render() {
        const {screen} = this.props;
        return <div className='page battlePage' style={{height: screen.contentHeight}}>
            <MeshBackground mesh={MESH_4}/>
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
