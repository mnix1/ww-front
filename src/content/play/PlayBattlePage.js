import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import rating from '../../media/image/menu/rating.svg';
import randomPerson from '../../media/image/menu/dices.svg';
import ranking from '../../media/image/menu/award.png';
import {BATTLE_FAST_ROUTE, BATTLE_RANKING_ROUTE, CLASSIFICATION_BATTLE_ROUTE, WAR_FAST_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import {RIVAL_IMPORTANCE_FAST, RIVAL_IMPORTANCE_RANKING, RIVAL_TYPE_BATTLE} from "../../util/rivalHelper";
import {startRandomOpponent} from "../../redux/reducer/rival";
import FragmentPage from "../../component/page/FragmentPage";
import {menuItemHeight} from "../../util/screenHelper";

class PlayBattlePage extends React.PureComponent {

    renderMenuItem(route, imgSrc, onClick = _.noop) {
        const {screen, onRouteChange} = this.props;
        const iconHeight = menuItemHeight(screen);
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
                    {this.renderMenuItem(CLASSIFICATION_BATTLE_ROUTE, rating)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(BATTLE_FAST_ROUTE, randomPerson, () => onBattleRandomOpponentClick(RIVAL_IMPORTANCE_FAST))}
                </div>
            </Menu>
        </div>;
    }

    render() {
        return <FragmentPage>
            {this.renderMenu()}
        </FragmentPage>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
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
