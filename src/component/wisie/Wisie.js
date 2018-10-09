import React from 'react';
import {getWisie} from "../../util/wisieHelper";
import PropTypes from "prop-types";
import _ from 'lodash';
import cross from '../../media/image/icon/cross.svg';
import {getName} from "../../lang/langText";
import {getCategory} from "../../util/categoryHelper";
import './styles.css';
import {getDisguise} from "../../util/disguiseHelper";
import {GREEN_COLOR, ORANGE_COLOR} from "../../util/style/constant";
import {getSkill} from "../../util/skillHelper";
import cn from 'classnames';

export default class Wisie extends React.PureComponent {

    static propTypes = {
        type: PropTypes.string,
        disguise: PropTypes.string,
        valueChange: PropTypes.string,
        value: PropTypes.number,
        className: PropTypes.string,
        detailsClassName: PropTypes.string,
        children: PropTypes.node,
        outsideChildren: PropTypes.node,
        outsideChildrenAfter: PropTypes.bool,
        nearImgChildren: PropTypes.node,
        nearImgChildrenAfter: PropTypes.bool,
        imgHeight: PropTypes.number,
        style: PropTypes.object,
        onClick: PropTypes.func,
        renderImg: PropTypes.bool,
        imgHobbyAndSkillHeight: PropTypes.number,
        renderDetails: PropTypes.bool,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        blackBackground: PropTypes.bool,
        customBackgroundImgSrc: PropTypes.node,
        renderHobbies: PropTypes.bool,
        hobbiesAndSkillsUnderName: PropTypes.bool,
        customHobbies: PropTypes.node,
        hobbiesAndSkillsWidth100: PropTypes.bool,
        hobbies: PropTypes.array,
        renderSkills: PropTypes.bool,
        customSkills: PropTypes.bool,
        skills: PropTypes.array
    };

    static defaultProps = {
        outsideChildrenAfter: true,
        nearImgChildrenAfter: true,
        renderHobbies: true,
        hobbiesAndSkillsWidth100: false,
        hobbiesAndSkillsUnderName: false,
        renderSkills: false,
        detailsClassName: 'justifyBetween',
        renderDetails: true,
        renderImg: true,
        disabled: false,
        active: false,
        imgHeight: 100,
        imgHobbyAndSkillHeight: 18,
        className: '',
        blackBackground: false,
        onClick: _.noop
    };

    renderHobbiesAndSkills() {
        const {hobbiesAndSkillsWidth100} = this.props;
        return <div className={`justifyBetween ${hobbiesAndSkillsWidth100 ? 'width100' : ''}`}>
            {this.renderSkills()}
            {this.renderHobbies()}
        </div>
    }

    renderHobbies() {
        const {hobbies, renderHobbies, renderSkills, hobbiesAndSkillsUnderName, customHobbies, imgHobbyAndSkillHeight} = this.props;
        if (!renderHobbies) {
            return null;
        }
        if (customHobbies) {
            return customHobbies;
        }
        const imgClassName = cn({
            paddingLeftRem: renderSkills || !hobbiesAndSkillsUnderName,
            paddingRightRem: !renderSkills && hobbiesAndSkillsUnderName,
        });
        return <div className='justifyEnd'>
            {hobbies.map(e => <img alt='' className={imgClassName} key={e}
                                   height={imgHobbyAndSkillHeight}
                                   src={getCategory(e)}/>)}
        </div>;
    }

    renderSkills() {
        const {skills, renderSkills, hobbiesAndSkillsUnderName, customSkills, imgHobbyAndSkillHeight} = this.props;
        if (!renderSkills) {
            return null;
        }
        if (customSkills) {
            return customSkills;
        }
        return <div className={hobbiesAndSkillsUnderName ? 'justifyStart' : 'paddingLeftRem justifyStart'}>
            {skills.map(e => <img alt='' className='' key={e}
                                  height={imgHobbyAndSkillHeight}
                                  src={getSkill(e)}/>)}
        </div>;
    }

    renderWisieDetails() {
        const {hobbiesAndSkillsUnderName, renderSkills, detailsClassName} = this.props;
        const name = getName(this.props);
        return <div className={`wisieDetails fontSize08Rem ${detailsClassName}`}>
            <div className={`justifyStart flexColumn ${hobbiesAndSkillsUnderName && renderSkills ? 'width100' : ''}`}>
                <div className='justifyStart'><span className='name flexColumn justifyCenter'>{name}</span></div>
                {hobbiesAndSkillsUnderName && this.renderHobbiesAndSkills()}
                {this.renderValue()}
            </div>
            {!hobbiesAndSkillsUnderName && this.renderHobbiesAndSkills()}
        </div>;
    }

    renderValue() {
        const {value, valueChange} = this.props;
        const color = _.isNil(valueChange) || valueChange === 'NONE'
            ? '#999'
            : valueChange === 'DECREASE'
                ? ORANGE_COLOR
                : GREEN_COLOR;
        return !_.isNil(value) &&
            <div className='justifyStart' style={{fontSize: '0.8em', color}}>
                <span className='justifyCenter flexColumn'>{value}</span>
            </div>;
    }

    renderContent() {
        const {type, imgHeight, disguise, children, renderImg, renderDetails, nearImgChildrenAfter, nearImgChildren} = this.props;
        return <div className='relative justifyCenter flexColumn width100'>
            {renderDetails && this.renderWisieDetails()}
            {renderImg &&
            <div className='justifyCenter'>
                {!nearImgChildrenAfter && nearImgChildren}
                <img alt='' src={disguise ? getDisguise(disguise) : getWisie(type)} height={imgHeight}/>
                {nearImgChildrenAfter && nearImgChildren}
            </div>}
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
        return <div className='absoluteBackgroundMix zIndex1'>
            <img alt='' src={_.defaultTo(customBackgroundImgSrc, cross)} className='height100 width100'/>
        </div>;
    }

    render() {
        const {onClick, outsideChildren, outsideChildrenAfter, style, type, className, active, disabled} = this.props;
        const customClassName = `${className} ${active ? 'active' : ''}`;
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
