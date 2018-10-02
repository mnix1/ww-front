import React from 'react';
import {connect} from 'react-redux';
import {
    RIVAL_CONTENT_STATUS_ANSWERED,
    RIVAL_CONTENT_STATUS_ANSWERING,
    RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT
} from "../../../util/rivalHelper";
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
