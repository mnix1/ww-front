import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import TiWiFi from "react-icons/lib/ti/wi-fi";
import {GREEN_COLOR, RED_COLOR} from "../../util/style/constant";
import _ from 'lodash';
import {getWisor} from "../../util/wisorHelper";
import {getText, TEXT_POINTS} from "../../lang/langText";
import cross from '../../media/image/icon/cross.svg';

export default class Profile extends React.PureComponent {

    static propTypes = {
        tag: PropTypes.string,
        name: PropTypes.string,
        wisorType: PropTypes.string,
        isOnline: PropTypes.bool,
        isAdded: PropTypes.bool,
        imgHeight: PropTypes.number,
        battleElo: PropTypes.number,
        warElo: PropTypes.number,
        active: PropTypes.bool,
        renderBattleElo: PropTypes.bool,
        renderWarElo: PropTypes.bool,
        renderTag: PropTypes.bool,
        blackBackground: PropTypes.bool,
        style: PropTypes.object,
        className: PropTypes.string,
        detailsClassName: PropTypes.string,
        onClick: PropTypes.func,
        actions: PropTypes.node,
        children: PropTypes.node,
        eloStyle: PropTypes.object,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        imgHeight: 80,
        className: '',
        active: false,
        disabled: false,
        renderTag: false,
        renderBattleElo: false,
        renderWarElo: false,
        blackBackground: false,
        onClick: _.noop,
        detailsClassName: 'justifyCenter',
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    renderDetails() {
        const {wisorType, imgHeight, isOnline, name, renderTag, tag, renderBattleElo, battleElo, renderWarElo, warElo, detailsClassName} = this.props;
        return <div className='details width100 fontSize08Rem justifyCenter relative flexColumn'>
            <div className='justifyCenter'><img alt='' src={getWisor(wisorType)} height={imgHeight}/></div>
            <div>
                <div className='justifyCenter'>
                    {isOnline && <div className='justifyStart'><TiWiFi style={{color: GREEN_COLOR}}/></div>}
                    {isOnline === false && <div className={detailsClassName}><TiWiFi style={{color: RED_COLOR}}/></div>}
                    {name && <div className={`name width100 ${detailsClassName}`}>{name}</div>}
                </div>
                {renderTag && <div className={`tag ${detailsClassName}`}>#{tag}</div>}
                {renderBattleElo && <div className={detailsClassName}>{this.renderElo(battleElo)}</div>}
                {renderWarElo && <div className={detailsClassName}>{this.renderElo(warElo)}</div>}
            </div>
        </div>;
    }

    renderElo(elo) {
        const {eloStyle} = this.props;
        return <div className={`justifyBetween`} style={eloStyle}>
            {elo}
            <div className='paddingLeftRem'>{getText(TEXT_POINTS)}</div>
        </div>;
    }

    renderContent() {
        return <div className='relative profile justifyBetween'>
            {this.renderDetails()}
            {this.renderActions()}
        </div>;
    }

    render() {
        const {onClick, tag, children, className, style, active, disabled, blackBackground} = this.props;
        const customClassName = `${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`;
        return <div onClick={onClick} key={tag}
                    className={`profileContainer relative inlineBlock marginRem paddingRem boxShadow ${className} ${customClassName}`}
                    style={style}>
            {blackBackground && <div className='blackBackground absoluteBackgroundMix'/>}
            {disabled && <div className='absoluteBackgroundMix opacity1 zIndex1'>
                <img alt='' src={cross} className='height100 width100'/>
            </div>}
            {children}
            {this.renderContent()}
        </div>
    }

}
