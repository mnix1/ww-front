import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Task from "../../../../component/task/Task";
import {questionIdAnswerIdMapChanged, questionIdSkipAnimationMapChanged} from "../../../../redux/reducer/rival";
import TaskDescription from "../../component/TaskDescription";
import Timer from "../../../../component/timer/Timer";
import {getText, TEXT_TIME} from "../../../../lang/langText";
import ActiveMembers from "../../component/ActiveMembers";
import Wisie from "../../../../component/wisie/Wisie";
import Profile from "../../../../component/profile/Profile";
import WisieActions from "../../../../component/wisie/WisieActions";
import {isTeamMemberWisie} from "../../../../util/heroHelper";
import {remToPixels} from "../../../../util/fontHelper";
import {
    RIVAL_CONTENT_STATUS_ANSWERED,
    RIVAL_CONTENT_STATUS_ANSWERING, RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT,
    RIVAL_TYPE_BATTLE
} from "../../../../util/rivalHelper";
import Profiles from "../../component/Profiles";
import {rivalScreen} from "../../../../util/screenHelper";
import RivalPageAnswered from "./RivalPageAnswered";
import RivalPageAnsweringTimeout from "./RivalPageAnsweringTimeout";
import RivalPageAnswering from "./RivalPageAnswering";

class RivalMultiPageAnswer extends React.PureComponent {

    state = {component: undefined};

    componentDidMount() {
        if (this.props.content.status === RIVAL_CONTENT_STATUS_ANSWERING) {
            this.setState({component: 0});
        }
    }

    componentDidUpdate() {
        const status = this.props.content.status;
        if (this.state.component === 0 && status !== RIVAL_CONTENT_STATUS_ANSWERING) {
            const component = status === RIVAL_CONTENT_STATUS_ANSWERED ? 2 : status === RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT ? 3 : 0;
            this.setState({component: 1});
            setTimeout(() => {
                this.setState({component});
            }, 500)
        }
    }

    render() {
        const {component} = this.state;
        const {content, communication} = this.props;
        if (component === 2 || (component === undefined && content.status === RIVAL_CONTENT_STATUS_ANSWERED)) {
            return <RivalPageAnswered/>;
        }
        if (component === 3 || (component === undefined && content.status === RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT)) {
            return <RivalPageAnsweringTimeout/>
        }
        return <RivalPageAnswering communication={communication}/>;
    }
}

export default connect(
    (state) => ({
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(RivalMultiPageAnswer);
