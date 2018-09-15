import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import randomPerson from '../../media/image/menu/dices.svg';
import ranking from '../../media/image/menu/award.png';
import {BATTLE_FAST_ROUTE, BATTLE_RANKING_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import {clearRivalStartRandomOpponentFetch} from "../rival/fetch/RivalStartRandomOpponentFetch";
import {
    RIVAL_IMPORTANCE_FAST,
    RIVAL_IMPORTANCE_RANKING,
    RIVAL_STATUS_START_RANDOM_OPPONENT,
    RIVAL_TYPE_BATTLE, RIVAL_TYPE_WAR
} from "../../util/rivalHelper";
import {
    rivalCleared,
    rivalImportanceChanged,
    rivalTypeChanged,
    startRandomOpponent,
    statusChanged
} from "../../redux/reducer/rival";

class PlayBattlePage extends React.PureComponent {

    renderMenuItem(route, imgSrc, onClick = _.noop) {
        const {screen, onRouteChange} = this.props;
        const iconHeight = screen.wisieImgHeight + 10;
        return <MenuItem
            imgSrc={imgSrc}
            iconHeight={iconHeight}
            route={route}
            onClick={(route) => {
                onClick();
                onRouteChange(route);
            }}/>;
    }

    renderMenu() {
        const {onBattleRandomOpponentClick} = this.props;
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(BATTLE_RANKING_ROUTE, ranking, () => onBattleRandomOpponentClick(RIVAL_IMPORTANCE_RANKING))}
                    {this.renderMenuItem(BATTLE_FAST_ROUTE, randomPerson, () => onBattleRandomOpponentClick(RIVAL_IMPORTANCE_FAST))}
                </div>
            </Menu>
        </div>;
    }

    render() {
        return <div className='page'>
            <div className='pageBackground absoluteBackgroundMix'/>
            <div className='pageContent'>
                {this.renderMenu()}
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
        onBattleRandomOpponentClick: (importance) => {
            startRandomOpponent(dispatch, RIVAL_TYPE_BATTLE, importance);
        },
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayBattlePage);
