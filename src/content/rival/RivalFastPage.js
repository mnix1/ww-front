import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CANCEL, TEXT_SEARCHING_OPPONENT} from "../../lang/langText";
import {clearRivalStartFastFetch} from "./fetch/RivalStartFastFetch";
import {CREAM_COLOR} from "../../util/style/constant";
import Modal from "../../component/modal/Modal";
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import Profile from "../../component/profile/Profile";
import {push} from 'connected-react-router'
import {APP_ROUTE, PLAY_ROUTE} from "../routes";
import {statusChanged} from "../../redux/reducer/rival";
import {RIVAL_STATUS_CANCELED_FAST, RIVAL_STATUS_CLOSED, RIVAL_STATUS_WAITING_FAST} from "../../util/rivalHelper";

class RivalFastPage extends React.PureComponent {

    componentDidMount() {
        const {status, goToMainScreen} = this.props;
        if (status === RIVAL_STATUS_CLOSED || status === RIVAL_STATUS_CANCELED_FAST) {
            goToMainScreen();
        }
    }

    componentWillUnmount() {
        const {status, onCancel} = this.props;
        if (status === RIVAL_STATUS_WAITING_FAST) {
            onCancel(false);
        }
    }

    renderContent() {
        const {status, onCancel, profile} = this.props;
        if (status !== RIVAL_STATUS_WAITING_FAST) {
            return null;
        }
        const actions = <div className='actions'>
            <div onClick={onCancel}><span>{getText(TEXT_CANCEL)}</span><FaTimesCircle color={CREAM_COLOR}/></div>
        </div>;
        const content = <div>
            <div className='justifyCenter'>{getText(TEXT_SEARCHING_OPPONENT)}...</div>
            <Profile {...profile} actions={actions}/>
        </div>;
        return <Modal renderExit={false} content={content}/>;
    }

    render() {
        return <div className='page'>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageContent'>
                {this.renderContent()}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        status: state.rival.status,
    }),
    (dispatch) => ({
        goToMainScreen: () => {
            dispatch(push(APP_ROUTE));
        },
        onCancel: (withMoveToPlay = true) => {
            clearRivalStartFastFetch(dispatch);
            dispatch(statusChanged(RIVAL_STATUS_CANCELED_FAST));
            if (withMoveToPlay) {
                dispatch(push(PLAY_ROUTE))
            }

        }
    })
)(RivalFastPage);
