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
        if (status === 'CHOOSING_WHO_ANSWER') {
            return <WarPageChoosingWhoAnswer communication={communication}/>
        }
        if (status === 'CLOSED') {
            return <WarPageClosed/>
        }
        return <div className='pageContent'>
        </div>;
    }

    render() {
        const {screen} = this.props;
        return <div className='page warPage' style={{height: screen.contentHeight}}>
            <div className='pageBackground absoluteBackgroundMix'/>
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
