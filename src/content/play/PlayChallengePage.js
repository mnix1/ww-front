import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import clock from '../../media/image/icon/clock.png';
import notebook from '../../media/image/menu/notes.svg';
import {CHALLENGE_HISTORY_ROUTE, CHALLENGE_LIST_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import FragmentPage from "../../component/page/FragmentPage";

class PlayChallengePage extends React.PureComponent {

    renderMenuItem(route, imgSrc, onClick = _.noop) {
        const {screen, onRouteChange} = this.props;
        const iconHeight = screen.standardImgHeight + 10;
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
                    {this.renderMenuItem(CHALLENGE_LIST_ROUTE, clock)}
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
