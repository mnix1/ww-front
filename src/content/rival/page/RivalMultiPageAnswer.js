import React from 'react';
import {connect} from 'react-redux';
import {
    RIVAL_CONTENT_STATUS_ANSWERED,
    RIVAL_CONTENT_STATUS_ANSWERING,
    RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT
} from "../../../util/rivalHelper";
import RivalPageAnswered from "./RivalPageAnswered";
import RivalPageAnsweringTimeout from "./RivalPageAnsweringTimeout";
import RivalPageAnswering from "./answering/RivalPageAnswering";

class RivalMultiPageAnswer extends React.PureComponent {

    state = {component: undefined};

    componentDidMount() {
        if (this.props.rivalStatus === RIVAL_CONTENT_STATUS_ANSWERING) {
            this.setState({component: 0});
        }
    }

    componentDidUpdate() {
        const {rivalStatus} = this.props;
        if (this.state.component === 0 && rivalStatus !== RIVAL_CONTENT_STATUS_ANSWERING) {
            const component = rivalStatus === RIVAL_CONTENT_STATUS_ANSWERED ? 2 : rivalStatus === RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT ? 3 : 0;
            this.setState({component: 1});
            setTimeout(() => {
                this.setState({component});
            }, 500)
        }
    }

    render() {
        // console.log('RivalMultiPageAnswer render');
        const {component} = this.state;
        const {rivalStatus} = this.props;
        if (component === 2 || (component === undefined && rivalStatus === RIVAL_CONTENT_STATUS_ANSWERED)) {
            return <RivalPageAnswered/>;
        }
        if (component === 3 || (component === undefined && rivalStatus === RIVAL_CONTENT_STATUS_ANSWERING_TIMEOUT)) {
            return <RivalPageAnsweringTimeout/>
        }
        return <RivalPageAnswering/>;
    }
}

export default connect(
    (state) => ({
        rivalStatus: state.rival.content.status,
    }),
    (dispatch) => ({})
)(RivalMultiPageAnswer);
