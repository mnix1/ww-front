import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import clock from '../../media/image/category/clock.png';
import randomPerson from '../../media/image/menu/dices.svg';
import notebook from '../../media/image/menu/notes.svg';
import {CHALLENGE_FAST_ROUTE, CHALLENGE_HISTORY_ROUTE, CHALLENGE_LIST_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import {CHALLENGE_STATUS_START} from "../../util/challengeHelper";
import {challengeCleared, statusChanged as challengeStatusChanged} from "../../redux/reducer/challenge";
import _ from 'lodash';
import {clearChallengeTaskAndStartFetch} from "../challenge/fetch/ChallengeFetchContainer";

class PlayChallengePage extends React.PureComponent {

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
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayChallengePage);
