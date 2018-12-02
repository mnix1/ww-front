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
import FragmentPage from "../../component/page/FragmentPage";
import {menuItemHeight} from "../../util/screenHelper";
import Requirement from "../../component/requirement/Requirement";
import {getText, TEXT_LEVEL} from "../../lang/langText";
import {
    BATTLE_REQUIREMENT_LEVEL,
    CAMPAIGN_REQUIREMENT_LEVEL,
    CHALLENGE_REQUIREMENT_LEVEL,
    WAR_REQUIREMENT_LEVEL
} from "../../util/requirementHelper";

class PlayPage extends React.PureComponent {

    renderMenuItem(route, imgSrc, requireLevel = 0) {
        const {screen, lang, onRouteChange, level} = this.props;
        const iconHeight = menuItemHeight(screen);
        const disabled = requireLevel > level;
        const menuItem = <MenuItem
            onClick={(route) => !disabled ? onRouteChange(route) : undefined}
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
        return <div>
            <Menu className='menuLeft'>
                <div className='menuItems relative'>
                    {this.renderMenuItem(PLAY_WAR_ROUTE, war, WAR_REQUIREMENT_LEVEL)}
                    {this.renderMenuItem(PLAY_BATTLE_ROUTE, battle, BATTLE_REQUIREMENT_LEVEL)}
                    {this.renderMenuItem(PLAY_CHALLENGE_ROUTE, challenge, CHALLENGE_REQUIREMENT_LEVEL)}
                    {this.renderMenuItem(CAMPAIGN_ROUTE, campaign, CAMPAIGN_REQUIREMENT_LEVEL)}
                    {this.renderMenuItem(TRAINING_ROUTE, practise)}
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
        profile: state.profile,
        screen: state.screen,
        lang: state.language.lang,
        level: state.profile.level,
    }),
    (dispatch) => ({
        onRouteChange: (e) => {
            dispatch(push(e));
        },
    })
)(PlayPage);
