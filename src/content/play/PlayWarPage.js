import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import randomPerson from '../../media/image/menu/dices.svg';
import {WAR_FAST_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import {clearRivalStartFastFetch} from "../rival/fetch/RivalStartFastFetch";
import {RIVAL_STATUS_START_FAST, RIVAL_TYPE_WAR} from "../../util/rivalHelper";
import {rivalCleared, rivalTypeChanged, statusChanged} from "../../redux/reducer/rival";

class PlayWarPage extends React.PureComponent {

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
        const {onWarFastClick} = this.props;
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(WAR_FAST_ROUTE, randomPerson, onWarFastClick)}
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
        onWarFastClick: () => {
            clearRivalStartFastFetch(dispatch);
            dispatch(rivalCleared());
            dispatch(rivalTypeChanged(RIVAL_TYPE_WAR));
            dispatch(statusChanged(RIVAL_STATUS_START_FAST));
        },
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayWarPage);
