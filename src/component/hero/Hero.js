import React from 'react';
import {getHero} from "../../util/heroHelper";
import PropTypes from "prop-types";
import _ from 'lodash';
import {getName} from "../../lang/text";
import {getCategory} from "../../util/categoryHelper";
import './styles.css';
import {toFixed2} from "../../util/textHelper";

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
    };

    static defaultProps = {
        imgHeight: 100,
        className: '',
        onClick: _.noop
    };

    renderHeroDetailsNotOwned() {
        const {hobbies} = this.props;
        const name = getName(this.props);
        return <div className='heroDetails paddingRem relative justifyBetween'>
            <div className='absoluteBackgroundMix inlineBlock'/>
            <div className='justifyCenter flexColumn'>
                <span className='name flexColumn justifyCenter relative'>{name}</span>
                {this.renderValue()}
            </div>
            <div className='hobbies justifyCenter flexColumn relative'>
                <div className='hobbies justifyCenter '>
                    {hobbies.map(e => <img alt='' className='hobby' key={e} height={20}
                                           src={getCategory(e)}/>)}
                </div>
            </div>

        </div>;
    }

    renderHeroDetailsOwned() {
        const {hobbies} = this.props;
        const name = getName(this.props);
        return <div className='heroDetails paddingRem justifyBetween'>
            <div className='justifyCenter flexColumn'>
                <span className='name flexColumn justifyCenter'>{name}</span>
                {this.renderValue()}
            </div>
            <div className='hobbies justifyCenter '>
                {hobbies.map(e => <img alt='' className='hobby' key={e} height={20}
                                       src={getCategory(e)}/>)}
            </div>

        </div>;
    }

    renderValue() {
        const {value, isOwned} = this.props;
        return isOwned &&
            <div className='' style={{fontSize: '0.8em', color: '#999'}}>
                {toFixed2(value)}
            </div>;
    }

    render() {
        const {onClick, style, type, isOwned, imgHeight, stats, children, className} = this.props;
        return <div
            className={`hero marginRem paddingRem borderBox inlineBlock boxShadow ${className} ${isOwned ? 'owned' : 'notOwned'}`}
            style={style}>
            <div onClick={onClick} key={type}>
                <div className=' justifyCenter flexColumn'>
                    {isOwned ? this.renderHeroDetailsOwned() : this.renderHeroDetailsNotOwned()}
                    <div className='justifyCenter'><img alt='' src={getHero(type)} height={imgHeight}/></div>
                    {stats}
                    {children}
                </div>
            </div>
        </div>;
    }

}
