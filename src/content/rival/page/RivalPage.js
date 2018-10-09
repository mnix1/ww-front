import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import RivalPageIntro from "./RivalPageIntro";
import RivalPagePreparingNextTask from "./RivalPagePreparingNextTask";
import RivalPageClosed from "./RivalPageClosed";
import RivalPageChoosingTaskProps from "./RivalPageChoosingTaskProps";
import RivalPageChoosingWhoAnswer from "./RivalPageChoosingWhoAnswer";
import MeshBackground, {MESH_4} from "../../../component/background/MeshBackground";
import {
    RIVAL_CONTENT_STATUS_ANSWERED,
    RIVAL_CONTENT_STATUS_ANSWERING,
    RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT,
    RIVAL_CONTENT_STATUS_CHANGING_TASK,
    RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER,
    RIVAL_CONTENT_STATUS_CHOSEN_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CLOSED,
    RIVAL_CONTENT_STATUS_INTRO,
    RIVAL_CONTENT_STATUS_PREPARING_NEXT_TASK
} from "../../../util/rivalHelper";
import RivalMultiPageAnswer from "./RivalMultiPageAnswer";
import _ from 'lodash';

class RivalPage extends React.PureComponent {

    renderContent() {
        const {rivalStatus} = this.props;
        if (!rivalStatus) {
            return null;
        }
        if (rivalStatus === RIVAL_CONTENT_STATUS_ANSWERING
            || rivalStatus === RIVAL_CONTENT_STATUS_ANSWERED
            || rivalStatus === RIVAL_CONTENT_STATUS_CHANGING_TASK
            || rivalStatus === RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT) {
            return <RivalMultiPageAnswer/>
        }
        if (rivalStatus === RIVAL_CONTENT_STATUS_PREPARING_NEXT_TASK || rivalStatus === RIVAL_CONTENT_STATUS_CHOSEN_TASK_PROPS) {
            return <RivalPagePreparingNextTask/>
        }
        if (rivalStatus === RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS) {
            return <RivalPageChoosingTaskProps/>
        }
        if (rivalStatus === RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER) {
            return <RivalPageChoosingWhoAnswer/>
        }
        if (rivalStatus === RIVAL_CONTENT_STATUS_INTRO) {
            return <RivalPageIntro/>
        }
        if (rivalStatus === RIVAL_CONTENT_STATUS_CLOSED) {
            return <RivalPageClosed/>
        }
        return <div className='pageContent'/>;
    }

    render() {
        // console.log('RivalPage render');
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
        rivalStatus: _.get(state.rival.content, 'status'),
    }),
    (dispatch) => ({})
)(RivalPage);
