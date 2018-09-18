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
        const {screen, onRouteChange} = this.props;
        const iconHeight = screen.wisieImgHeight + 10;
        return <MenuItem
            imgSrc={imgSrc}
            iconHeight={iconHeight}
            route={route}
            onClick={route => onRouteChange(route)}
        />;
    }

    renderMenu() {
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems relative'>
                    {this.renderWarMenuItem(PLAY_WAR_ROUTE, war)}
                    {this.renderMenuItem(PLAY_BATTLE_ROUTE, battle)}
                    {this.renderMenuItem(PLAY_CHALLENGE_ROUTE, challenge)}
                    {this.renderMenuItem(CAMPAIGN_ROUTE, campaign)}
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
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayPage);
