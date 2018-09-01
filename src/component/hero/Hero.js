import React from 'react';
import {getWisie} from "../../util/wisieHelper";
import PropTypes from "prop-types";
import _ from 'lodash';
import {getName} from "../../lang/langText";
import {getCategory} from "../../util/categoryHelper";
import './styles.css';

export default class Hero extends React.PureComponent {

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
        renderImg: PropTypes.bool,
        imgHobbyHeight: PropTypes.number,
        renderDetails: PropTypes.bool,
        isActive: PropTypes.bool,
        hobbies: PropTypes.array
    };

    static defaultProps = {
        renderHobbies: true,
        renderDetails: true,
        renderImg: true,
        isActive: false,
        imgHeight: 100,
        imgHobbyHeight: 20,
        className: '',
        onClick: _.noop
    };

    renderHeroDetailsNotOwned() {
        const {hobbies, renderHobbies, imgHobbyHeight} = this.props;
        const name = getName(this.props);
        return <div className='heroDetails fontSize08Rem paddingRem relative justifyBetween'>
            <div className='absoluteBackgroundMix inlineBlock'/>
            <div className='justifyCenter flexColumn'>
                <span className='name flexColumn justifyCenter relative'>{name}</span>
                {this.renderValue()}
            </div>
            <div className='hobbies justifyCenter flexColumn relative'>
                {renderHobbies && !_.isEmpty(hobbies) && <div className='hobbies justifyCenter'>
                    {hobbies.map(e => <img alt='' className='hobby' key={e} height={imgHobbyHeight}
                                           src={getCategory(e)}/>)}
                </div>}
            </div>

        </div>;
    }

    renderHeroDetailsOwned() {
        const {hobbies, renderHobbies, imgHobbyHeight} = this.props;
        const name = getName(this.props);
        return <div className='heroDetails fontSize08Rem justifyBetween'>
            <div className='justifyCenter flexColumn'>
                <span className='name flexColumn justifyCenter'>{name}</span>
                {this.renderValue()}
            </div>
            {renderHobbies && <div className='hobbies justifyCenter '>
                {hobbies.map(e => <img alt='' className='hobby' key={e} height={imgHobbyHeight}
                                       src={getCategory(e)}/>)}
            </div>}

        </div>;
    }

    renderValue() {
        const {value, isOwned} = this.props;
        return isOwned &&
            <div className='justifyStart' style={{fontSize: '0.8em', color: '#999'}}>
                {value}
            </div>;
    }

    render() {
        const {onClick, style, type, isOwned, imgHeight, stats, children, renderImg, className, renderDetails, isActive} = this.props;
        return <div
            className={`hero marginRem paddingRem borderBox inlineBlock boxShadow ${className} ${isOwned ? 'owned' : 'notOwned'} ${isActive ? 'active' : ''}`}
            style={style}>
            <div onClick={onClick} key={type}>
                <div className=' justifyCenter flexColumn'>
                    {renderDetails && (isOwned ? this.renderHeroDetailsOwned() : this.renderHeroDetailsNotOwned())}
                    {renderImg && <div className='justifyCenter'><img alt='' src={getWisie(type)} height={imgHeight}/></div>}
                    {stats}
                    {children}
                </div>
            </div>
        </div>;
    }

}
