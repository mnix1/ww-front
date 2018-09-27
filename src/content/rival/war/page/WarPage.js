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
import WarPageChoosingWhoAnswer from "./WarPageChoosingWhoAnswer";
import MeshBackground, {MESH_4} from "../../../../component/background/MeshBackground";
import {
    RIVAL_CONTENT_STATUS_ANSWERED,
    RIVAL_CONTENT_STATUS_ANSWERING,
    RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT,
    RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER,
    RIVAL_CONTENT_STATUS_CHOSEN_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CLOSED,
    RIVAL_CONTENT_STATUS_INTRO,
    RIVAL_CONTENT_STATUS_PREPARING_NEXT_TASK
} from "../../../../util/rivalHelper";

class WarPage extends React.PureComponent {

    renderContent() {
        const {content, communication} = this.props;
        if (!content) {
            return null;
        }
        const {status} = content;
        if (status === RIVAL_CONTENT_STATUS_INTRO) {
            return <WarPageIntro/>
        }
        if (status === RIVAL_CONTENT_STATUS_PREPARING_NEXT_TASK || status === RIVAL_CONTENT_STATUS_CHOSEN_TASK_PROPS) {
            return <WarPagePreparingNextTask/>
        }
        if (status === RIVAL_CONTENT_STATUS_ANSWERING) {
            return <WarPageAnswering communication={communication}/>
        }
        if (status === RIVAL_CONTENT_STATUS_ANSWERED) {
            return <WarPageAnswered/>
        }
        if (status === RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT) {
            return <WarPageAnsweringTimeout/>
        }
        if (status === RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS) {
            return <WarPageChoosingTaskProps communication={communication}/>
        }
        if (status === RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER) {
            return <WarPageChoosingWhoAnswer communication={communication}/>
        }
        if (status === RIVAL_CONTENT_STATUS_CLOSED) {
            return <WarPageClosed/>
        }
        return <div className='pageContent'>
        </div>;
    }

    render() {
        const {screen} = this.props;
        const style = {
            height: screen.isSmallHeight ? screen.height : screen.contentHeight,
            width: screen.isSmallHeight ? screen.width : screen.contentWidth,
        };
        return <div className='page warPage overflowHidden' style={style}>
            <MeshBackground mesh={MESH_4} fullScreen={screen.isSmallHeight}/>
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
)(WarPage);
