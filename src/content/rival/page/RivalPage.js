import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import RivalPageIntro from "./RivalPageIntro";
import RivalPagePreparingNextTask from "./RivalPagePreparingNextTask";
import RivalPageClosed from "./RivalPageClosed";
import RivalPageChoosingTaskProps from "./RivalPageChoosingTaskProps";
import RivalPageChoosingWhoAnswer from "./RivalPageChoosingWhoAnswer";
import {
    RIVAL_CONTENT_STATUS_ANSWERED,
    RIVAL_CONTENT_STATUS_ANSWERING,
    RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT,
    RIVAL_CONTENT_STATUS_CHANGING_TASK,
    RIVAL_CONTENT_STATUS_CHOOSING_TASK_CATEGORY,
    RIVAL_CONTENT_STATUS_CHOOSING_TASK_DIFFICULTY,
    RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER,
    RIVAL_CONTENT_STATUS_CHOSEN_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CLOSED,
    RIVAL_CONTENT_STATUS_INTRO,
    RIVAL_CONTENT_STATUS_PREPARING_NEXT_TASK,
    RIVAL_CONTENT_STATUS_RANDOM_TASK_PROPS
} from "../../../util/rivalHelper";
import RivalMultiPageAnswer from "./RivalMultiPageAnswer";
import _ from 'lodash';
import FullScreenPage from "../../../component/page/FullScreenPage";

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
        if (rivalStatus === RIVAL_CONTENT_STATUS_CHOOSING_TASK_CATEGORY
            || rivalStatus === RIVAL_CONTENT_STATUS_CHOOSING_TASK_DIFFICULTY
            || rivalStatus === RIVAL_CONTENT_STATUS_RANDOM_TASK_PROPS) {
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
        return <FullScreenPage className='warPage' customContent={true}>
            {this.renderContent()}
        </FullScreenPage>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        rivalStatus: _.get(state.rival.content, 'status'),
    }),
    (dispatch) => ({})
)(RivalPage);
