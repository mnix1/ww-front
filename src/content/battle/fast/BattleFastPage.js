import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CANCEL, TEXT_SEARCHING_OPPONENT} from "../../../lang/text";
import {statusChanged} from "../../../redux/reducer/battle";
import {clearBattleStartFastFetch} from "../fetch/BattleStartFastFetch";
import {
    BATTLE_STATUS_CANCELED_FAST,
    BATTLE_STATUS_CLOSED,
    BATTLE_STATUS_WAITING_FAST
} from "../../../util/battleHelper";
import {CREAM_COLOR} from "../../../util/style/constant";
import Modal from "../../../component/modal/Modal";
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import Profile from "../../../component/profile/Profile";
import {push} from 'connected-react-router'
import {APP_ROUTE, PLAY_ROUTE} from "../../routes";

class BattleFastPage extends React.PureComponent {

    componentDidMount() {
        const {status, goToMainScreen} = this.props;
        if (status === BATTLE_STATUS_CLOSED || status === BATTLE_STATUS_CANCELED_FAST) {
            goToMainScreen();
        }
    }

    componentWillUnmount() {
        const {status, onCancel} = this.props;
        if (status === BATTLE_STATUS_WAITING_FAST) {
            onCancel(false);
        }
    }

    renderContent() {
        const {status, onCancel, profile} = this.props;
        if (status !== BATTLE_STATUS_WAITING_FAST) {
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
        status: state.battle.status,
    }),
    (dispatch) => ({
        goToMainScreen: () => {
            dispatch(push(APP_ROUTE));
        },
        onCancel: (withMoveToPlay = true) => {
            clearBattleStartFastFetch(dispatch);
            dispatch(statusChanged(BATTLE_STATUS_CANCELED_FAST));
            if (withMoveToPlay) {
                dispatch(push(PLAY_ROUTE))
            }

        }
    })
)(BattleFastPage);
