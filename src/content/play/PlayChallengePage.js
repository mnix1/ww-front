import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import clock from '../../media/image/menu/clock.png';
import add from '../../media/image/menu/add.svg';
import global from '../../media/image/menu/global.svg';
import padlock from '../../media/image/menu/padlock.svg';
import notebook from '../../media/image/menu/notes.svg';
import {
    CHALLENGE_CREATE_ROUTE,
    CHALLENGE_GLOBAL_ROUTE,
    CHALLENGE_HISTORY_ROUTE,
    CHALLENGE_ACTIVE_ROUTE,
    CHALLENGE_PRIVATE_ROUTE
} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import FragmentPage from "../../component/page/FragmentPage";
import {menuItemHeight} from "../../util/screenHelper";

class PlayChallengePage extends React.PureComponent {

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
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(CHALLENGE_GLOBAL_ROUTE, global)}
                    {this.renderMenuItem(CHALLENGE_PRIVATE_ROUTE, padlock)}
                    {this.renderMenuItem(CHALLENGE_ACTIVE_ROUTE, clock)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(CHALLENGE_CREATE_ROUTE, add)}
                    {this.renderMenuItem(CHALLENGE_HISTORY_ROUTE, notebook)}
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
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayChallengePage);
