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
        imgHeight: PropTypes.number,
        style: PropTypes.object,
        onClick: PropTypes.func,
        stats: PropTypes.node,
        renderHobbies: PropTypes.bool,
        customHobbies: PropTypes.node,
        renderImg: PropTypes.bool,
        imgHobbyHeight: PropTypes.number,
        renderDetails: PropTypes.bool,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        blackBackground: PropTypes.bool,
        hobbies: PropTypes.array
    };

    static defaultProps = {
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
            {hobbies.map(e => <img alt='' className='paddingLeftRem' key={e} height={imgHobbyHeight} src={getCategory(e)}/>)}
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

    render() {
        const {onClick, style, type, isOwned, imgHeight, stats, children, renderImg, className, renderDetails, active, disabled, blackBackground} = this.props;
        const customClassName = `${className} ${isOwned ? 'owned' : 'notOwned'} ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`;
        return <div
            className={`wisie relative marginRem paddingRem borderBox inlineBlock boxShadow ${customClassName}`}
            style={style}>
            <div onClick={disabled ? _.noop : onClick} key={type}>
                {blackBackground && <div className='blackBackground absoluteBackgroundMix'/>}
                {disabled && <div className='absoluteBackgroundMix opacity1 zIndex1'>
                    <img alt='' src={cross} className='height100 width100'/>
                </div>}
                <div className='relative justifyCenter flexColumn'>
                    {renderDetails && (isOwned ? this.renderWisieDetailsOwned() : this.renderWisieDetailsNotOwned())}
                    {renderImg &&
                    <div className='justifyCenter'><img alt='' src={getWisie(type)} height={imgHeight}/></div>}
                    {stats}
                    {children}
                </div>
            </div>
        </div>;
    }

}
