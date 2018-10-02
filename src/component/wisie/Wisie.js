import React from 'react';
import {getWisie} from "../../util/wisieHelper";
import PropTypes from "prop-types";
import _ from 'lodash';
import cross from '../../media/image/icon/cross.svg';
import {getName} from "../../lang/langText";
import {getCategory} from "../../util/categoryHelper";
import './styles.css';

export default class Wisie extends React.PureComponent {

    static propTypes = {
        type: PropTypes.string,
        isOwned: PropTypes.bool,
        value: PropTypes.number,
        className: PropTypes.string,
        children: PropTypes.node,
        outsideChildren: PropTypes.node,
        outsideChildrenAfter: PropTypes.bool,
        imgHeight: PropTypes.number,
        style: PropTypes.object,
        onClick: PropTypes.func,
        renderHobbies: PropTypes.bool,
        customHobbies: PropTypes.node,
        renderImg: PropTypes.bool,
        imgHobbyHeight: PropTypes.number,
        renderDetails: PropTypes.bool,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        blackBackground: PropTypes.bool,
        customBackgroundImgSrc: PropTypes.node,
        hobbies: PropTypes.array
    };

    static defaultProps = {
        outsideChildrenAfter: true,
        renderHobbies: true,
        renderDetails: true,
        renderImg: true,
        disabled: false,
        active: false,
        imgHeight: 100,
        imgHobbyHeight: 18,
        className: '',
        blackBackground: false,
        onClick: _.noop
    };

    renderHobbies() {
        const {hobbies, renderHobbies, customHobbies, imgHobbyHeight} = this.props;
        if (!renderHobbies) {
            return null;
        }
        if (customHobbies) {
            return customHobbies;
        }
        return <div className='justifyCenter'>
            {hobbies.map(e => <img alt='' className='paddingLeftRem' key={e} height={imgHobbyHeight}
                                   src={getCategory(e)}/>)}
        </div>;
    }

    renderWisieDetailsNotOwned() {
        const name = getName(this.props);
        return <div className='wisieDetails fontSize08Rem relative justifyBetween'>
            <div className='justifyCenter flexColumn'>
                <span className='name flexColumn justifyCenter relative'>{name}</span>
                {this.renderValue()}
            </div>
        </div>;
    }

    renderWisieDetailsOwned() {
        const name = getName(this.props);
        return <div className='wisieDetails fontSize08Rem justifyBetween'>
            <div className='justifyCenter flexColumn'>
                <span className='name flexColumn justifyCenter'>{name}</span>
                {this.renderValue()}
            </div>
            {this.renderHobbies()}
        </div>;
    }

    renderValue() {
        const {value} = this.props;
        return !_.isNil(value) &&
            <div className='justifyStart' style={{fontSize: '0.8em', color: '#999'}}>
                {value}
            </div>;
    }

    renderContent() {
        const {type, isOwned, imgHeight, children, renderImg, renderDetails} = this.props;
        return <div className='relative justifyCenter flexColumn'>
            {renderDetails && (isOwned ? this.renderWisieDetailsOwned() : this.renderWisieDetailsNotOwned())}
            {renderImg &&
            <div className='justifyCenter'><img alt='' src={getWisie(type)} height={imgHeight}/></div>}
            {children}
        </div>
    }

    renderBlackBackground() {
        const {blackBackground} = this.props;
        if (!blackBackground) {
            return null;
        }
        return <div className='blackBackground absoluteBackgroundMix'/>;
    }

    renderBackground() {
        const {disabled, customBackgroundImgSrc} = this.props;
        if (!disabled) {
            return null;
        }
        return <div className='absoluteBackgroundMix opacity1 zIndex1'>
            <img alt='' src={_.defaultTo(customBackgroundImgSrc, cross)} className='height100 width100'/>
        </div>;
    }

    render() {
        const {onClick, outsideChildren, outsideChildrenAfter, style, type, isOwned, className, active, disabled} = this.props;
        const customClassName = `${className} ${isOwned ? 'owned' : 'notOwned'} ${active ? 'active' : ''}`;
        const customInsideClass = `${disabled ? 'disabled' : ''}`;
        return <div
            className={`wisie relative marginRem paddingRem borderBox inlineBlock boxShadow ${customClassName}`}
            style={style}
            key={type}>
            {!outsideChildrenAfter && outsideChildren}
            <div className={customInsideClass} onClick={disabled ? _.noop : onClick}>
                {this.renderBlackBackground()}
                {this.renderBackground()}
                {this.renderContent()}
            </div>
            {outsideChildrenAfter && outsideChildren}
        </div>;
    }

}
