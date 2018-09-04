import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import battle from '../../media/image/menu/bowling.svg';
import practise from '../../media/image/menu/practise.svg';
import campaign from '../../media/image/menu/expedition.png';
import challenge from '../../media/image/menu/rubicCube.svg';
import war from '../../media/image/menu/chessBoard.svg';
import {CAMPAIGN_ROUTE, PLAY_BATTLE_ROUTE, PLAY_CHALLENGE_ROUTE, PLAY_WAR_ROUTE, TRAINING_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import {TEXT_WISIES_TEAM} from "../../lang/langText";
import Requirement from "../../component/requirement/Requirement";
import {rivalCleared, rivalImportanceChanged, rivalTypeChanged, statusChanged} from "../../redux/reducer/rival";
import {
    RIVAL_IMPORTANCE_FAST,
    RIVAL_STATUS_START_RANDOM_OPPONENT,
    RIVAL_STATUS_WAITING_RANDOM_OPPONENT,
    RIVAL_TYPE_CAMPAIGN
} from "../../util/rivalHelper";
import {clearRivalStartRandomOpponentFetch} from "../rival/fetch/RivalStartRandomOpponentFetch";

class PlayPage extends React.PureComponent {

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

    renderWarMenuItem(route, imgSrc) {
        const {screen, onRouteChange, profile} = this.props;
        const disabled = !profile.teamInitialized;
        const iconHeight = screen.wisieImgHeight + 10;
        const menuItem = <MenuItem
            className={disabled ? 'disabled' : ''}
            imgSrc={imgSrc}
            iconHeight={iconHeight}
            route={route}
            onClick={(route) => {
                if (!disabled) {
                    onRouteChange(route);
                }
            }}/>;
        if (!disabled) {
            return menuItem;
        }
        return <div className='relative'>
            {menuItem}
            <Requirement text={TEXT_WISIES_TEAM}/>
        </div>;
    }

    renderMenu() {
        const {onCampaignClick} = this.props;
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems relative'>
                    {this.renderWarMenuItem(PLAY_WAR_ROUTE, war)}
                    {this.renderMenuItem(PLAY_BATTLE_ROUTE, battle)}
                    {this.renderMenuItem(PLAY_CHALLENGE_ROUTE, challenge)}
                    {this.renderMenuItem(CAMPAIGN_ROUTE, campaign, onCampaignClick)}
                    {this.renderMenuItem(TRAINING_ROUTE, practise)}
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
        profile: state.profile.profile,
        screen: state.screen,
        path: state.router.location.pathname
    }),
    (dispatch) => ({
        onCampaignClick: () => {
            clearRivalStartRandomOpponentFetch(dispatch);
            dispatch(rivalCleared());
            dispatch(rivalTypeChanged(RIVAL_TYPE_CAMPAIGN));
            dispatch(rivalImportanceChanged(RIVAL_IMPORTANCE_FAST));
            dispatch(statusChanged(RIVAL_STATUS_START_RANDOM_OPPONENT));
        },
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayPage);
