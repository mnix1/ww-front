import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CANCEL, TEXT_SEARCHING_OPPONENT} from "../../lang/langText";
import {clearRivalStartRandomOpponentFetch} from "./fetch/RivalStartRandomOpponentFetch";
import {CREAM_COLOR} from "../../util/style/constant";
import Modal from "../../component/modal/Modal";
import {FaTimesCircle} from 'react-icons/fa';
import Profile from "../../component/profile/Profile";
import {push} from 'connected-react-router'
import {APP_ROUTE, PLAY_ROUTE} from "../routes";
import {statusChanged} from "../../redux/reducer/rival";
import {
    renderBattleElo,
    renderWarElo,
    RIVAL_STATUS_CANCELED_RANDOM_OPPONENT,
    RIVAL_STATUS_CLOSED, RIVAL_STATUS_START_RANDOM_OPPONENT,
} from "../../util/rivalHelper";
import FragmentPage from "../../component/page/FragmentPage";

class RivalSearchOpponentPage extends React.PureComponent {

    componentDidMount() {
        const {status, goToMainScreen} = this.props;
        if (status === RIVAL_STATUS_CLOSED || status === RIVAL_STATUS_CANCELED_RANDOM_OPPONENT) {
            goToMainScreen();
        }
    }

    componentWillUnmount() {
        const {status, onCancel} = this.props;
        if (status === RIVAL_STATUS_START_RANDOM_OPPONENT) {
            onCancel(false);
        }
    }

    renderContent() {
        const {status, onCancel, profile} = this.props;
        if (status !== RIVAL_STATUS_START_RANDOM_OPPONENT) {
            return null;
        }
        const actions = <div className='actions'>
            <div onClick={onCancel}><span>{getText(TEXT_CANCEL)}</span><FaTimesCircle color={CREAM_COLOR}/></div>
        </div>;
        const content = <div>
            <div className='justifyCenter'>{getText(TEXT_SEARCHING_OPPONENT)}...</div>
            <Profile renderBattleElo={renderBattleElo(this.props)} renderWarElo={renderWarElo(this.props)} {...profile}
                     actions={actions}/>
        </div>;
        return <Modal renderExit={false} content={content}/>;
    }

    render() {
        return <FragmentPage>
            {this.renderContent()}
        </FragmentPage>
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
        status: state.rival.status,
        importance: state.rival.rivalImportance,
        type: state.rival.rivalType,
    }),
    (dispatch) => ({
        goToMainScreen: () => {
            dispatch(push(APP_ROUTE));
            dispatch(statusChanged(undefined));
        },
        onCancel: (withMoveToPlay = true) => {
            clearRivalStartRandomOpponentFetch(dispatch);
            dispatch(statusChanged(RIVAL_STATUS_CANCELED_RANDOM_OPPONENT));
            if (withMoveToPlay) {
                dispatch(push(PLAY_ROUTE))
            }

        }
    })
)(RivalSearchOpponentPage);
