import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import rating from '../../media/image/menu/rating.svg';
import randomPerson from '../../media/image/menu/dices.svg';
import ranking from '../../media/image/menu/award.png';
import {CLASSIFICATION_WAR_ROUTE, WAR_FAST_ROUTE, WAR_RANKING_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import {RIVAL_IMPORTANCE_FAST, RIVAL_IMPORTANCE_RANKING, RIVAL_TYPE_WAR} from "../../util/rivalHelper";
import {startRandomOpponent} from "../../redux/reducer/rival";
import FragmentPage from "../../component/page/FragmentPage";

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
        const {onWarRandomOpponentClick} = this.props;
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(WAR_RANKING_ROUTE, ranking, () => onWarRandomOpponentClick(RIVAL_IMPORTANCE_RANKING))}
                    {this.renderMenuItem(WAR_FAST_ROUTE, randomPerson, () => onWarRandomOpponentClick(RIVAL_IMPORTANCE_FAST))}
                    {this.renderMenuItem(CLASSIFICATION_WAR_ROUTE, rating)}
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
        onWarRandomOpponentClick: (importance) => {
           startRandomOpponent(dispatch, RIVAL_TYPE_WAR, importance);
        },
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayWarPage);
