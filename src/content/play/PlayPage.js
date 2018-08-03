import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import dices from '../../media/image/icon/dices.svg';
import clock from '../../media/image/icon/clock.svg';
import notebook from '../../media/image/icon/notebook.svg';
import {BATTLE_FAST_ROUTE, CHALLENGE_HISTORY_ROUTE, CHALLENGE_LIST_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";

class PlayPage extends React.PureComponent {

    renderMenuItem(route, imgSrc) {
        const {screen, onRouteChange} = this.props;
        const iconWidth = Math.max(Math.min(screen.width / 8, 70), 40);
        return <MenuItem onClick={onRouteChange} imgSrc={imgSrc} iconWidth={iconWidth} route={route}/>
    }

    renderMenu() {
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(BATTLE_FAST_ROUTE, dices)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
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
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayPage);
