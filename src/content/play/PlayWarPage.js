import React from 'react';
import './styles.css';
import {connect} from 'react-redux';
import rating from '../../media/image/menu/rating.svg';
import randomPerson from '../../media/image/menu/dices.svg';
import ranking from '../../media/image/menu/award.png';
import {WAR_TRAINING_ROUTE, CLASSIFICATION_WAR_ROUTE, WAR_FAST_ROUTE, WAR_RANKING_ROUTE} from "../routes";
import Menu from "../../component/menu/Menu";
import MenuItem from "../../component/menu/MenuItem";
import {push} from "connected-react-router";
import _ from 'lodash';
import {
    RIVAL_IMPORTANCE_FAST,
    RIVAL_IMPORTANCE_RANKING,
    RIVAL_IMPORTANCE_TRAINING,
    RIVAL_TYPE_WAR
} from "../../util/rivalHelper";
import {startRandomOpponent} from "../../redux/reducer/rival";
import FragmentPage from "../../component/page/FragmentPage";
import {menuItemHeight} from "../../util/screenHelper";
import Requirement from "../../component/requirement/Requirement";
import {getText, TEXT_LEVEL} from "../../lang/langText";
import {WAR_FAST_REQUIREMENT_LEVEL, WAR_RANKING_REQUIREMENT_LEVEL} from "../../util/requirementHelper";
import abc from "../../media/image/menu/abc.svg";

class PlayWarPage extends React.PureComponent {

    renderMenuItem(route, imgSrc, onClick = _.noop, requireLevel = 0) {
        const {screen, lang, onRouteChange, level} = this.props;
        const iconHeight = menuItemHeight(screen);
        const disabled = requireLevel > level;
        const menuItem = <MenuItem
            onClick={(route) => {
                if (disabled) {
                    return undefined;
                }
                onClick();
                onRouteChange(route);
            }}
            lang={lang}
            imgSrc={imgSrc}
            iconHeight={iconHeight}
            route={route}/>;
        if (!disabled) {
            return menuItem;
        }
        return <div className='relative'>
            {menuItem}
            <Requirement text={`${getText(TEXT_LEVEL)} ${requireLevel}`}/>
        </div>;
    }

    renderMenu() {
        const {onWarRandomOpponentClick} = this.props;
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems'>
                    {this.renderMenuItem(WAR_RANKING_ROUTE, ranking, () => onWarRandomOpponentClick(RIVAL_IMPORTANCE_RANKING), WAR_FAST_REQUIREMENT_LEVEL)}
                    {this.renderMenuItem(CLASSIFICATION_WAR_ROUTE, rating)}
                </div>
            </Menu>
            <Menu className='menuRight'>
                <div className='menuItems'>
                    {this.renderMenuItem(WAR_TRAINING_ROUTE, abc, () => onWarRandomOpponentClick(RIVAL_IMPORTANCE_TRAINING))}
                    {this.renderMenuItem(WAR_FAST_ROUTE, randomPerson, () => onWarRandomOpponentClick(RIVAL_IMPORTANCE_FAST), WAR_RANKING_REQUIREMENT_LEVEL)}
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
        profile: state.profile,
        lang: state.language.lang,
        level: state.profile.level,
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
