import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import dices from '../../media/image/icon/dices.svg';
import clock from '../../media/image/icon/clock.svg';
import rubicCube from '../../media/image/icon/rubicCube.svg';
import notebook from '../../media/image/icon/notebook.svg';
import {BATTLE_FAST_ROUTE, CHALLENGE_FAST_ROUTE, CHALLENGE_HISTORY_ROUTE, CHALLENGE_LIST_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import {CHALLENGE_STATUS_START} from "../../util/challengeHelper";
import {challengeCleared, statusChanged as challengeStatusChanged  } from "../../redux/reducer/challenge";
import _ from 'lodash';
import {clearChallengeTaskAndStartFetch} from "../challenge/fetch/ChallengeFetchContainer";
import {clearBattleStartFastFetch} from "../battle/fetch/BattleStartFastFetch";
import {battleCleared, statusChanged as battleStatusChanged} from "../../redux/reducer/battle";
import {BATTLE_STATUS_START_FAST} from "../../util/battleHelper";

class PlayPage extends React.PureComponent {

    renderMenuItem(route, imgSrc, onClick = _.noop) {
        const {screen, onRouteChange} = this.props;
        const iconWidth = Math.max(Math.min(screen.width / 8, 70), 40);
        return <MenuItem imgSrc={imgSrc}
                         iconWidth={iconWidth}
                         route={route}
                         onClick={(route) => {
                             onClick();
                             onRouteChange(route);
                         }}/>
    }

    renderMenu() {
        const {onChallengeFastClick, onBattleFastClick} = this.props;
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(BATTLE_FAST_ROUTE, dices, onBattleFastClick)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(CHALLENGE_FAST_ROUTE, rubicCube, onChallengeFastClick)}
                    {this.renderMenuItem(CHALLENGE_LIST_ROUTE, clock)}
                    {this.renderMenuItem(CHALLENGE_HISTORY_ROUTE, notebook)}
                </div>
            </Menu>
        </div>;
    }

    renderContent() {
        return this.renderMenu();
    }

    render() {
        return <div className='page'>
            <div className='pageBackground'/>
            <div className='pageContent'>
                {this.renderContent()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname
    }),
    (dispatch) => ({
        onChallengeFastClick: () => {
            clearChallengeTaskAndStartFetch(dispatch);
            dispatch(challengeCleared());
            dispatch(challengeStatusChanged(CHALLENGE_STATUS_START));
        },
        onBattleFastClick: () => {
            clearBattleStartFastFetch(dispatch);
            dispatch(battleCleared());
            dispatch(battleStatusChanged(BATTLE_STATUS_START_FAST));
        },
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayPage);
