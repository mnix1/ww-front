import React from 'react';
import './styles.css';
import PropTypes from "prop-types";
import {TiWiFi} from "react-icons/ti";
import {GREEN_COLOR, RED_COLOR} from "../../util/style/constant";
import _ from 'lodash';
import {getWisor} from "../../util/wisorHelper";
import cross from '../../media/image/icon/cross.svg';
import cn from 'classnames';
import Grade from "../grade/Grade";
import Elo from "../elo/Elo";

export default class Profile extends React.PureComponent {

    static propTypes = {
        tag: PropTypes.string,
        name: PropTypes.string,
        wisorType: PropTypes.string,
        isOnline: PropTypes.bool,
        isAdded: PropTypes.bool,
        imgHeight: PropTypes.number,
        elo: PropTypes.number,
        level: PropTypes.number,
        grade: PropTypes.string,
        active: PropTypes.bool,
        renderElo: PropTypes.bool,
        renderTag: PropTypes.bool,
        renderGrade: PropTypes.bool,
        renderLevel: PropTypes.bool,
        blackBackground: PropTypes.bool,
        style: PropTypes.object,
        className: PropTypes.string,
        detailsClassName: PropTypes.string,
        detailsContainerClassName: PropTypes.string,
        detailsInsideContainerClassName: PropTypes.string,
        onClick: PropTypes.func,
        actions: PropTypes.node,
        children: PropTypes.node,
        childrenAfterContent: PropTypes.node,
        eloStyle: PropTypes.object,
        disabled: PropTypes.bool,
        defaultClassNames: PropTypes.bool,
        defaultDetailsClassNames: PropTypes.bool,
    };

    static defaultProps = {
        imgHeight: 80,
        className: '',
        active: false,
        disabled: false,
        renderTag: false,
        renderElo: false,
        renderGrade: false,
        blackBackground: false,
        onClick: _.noop,
        detailsClassName: 'justifyCenter',
        detailsInsideContainerClassName: '',
        defaultClassNames: true,
        defaultDetailsClassNames: true,
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    renderDetails() {
        const {wisorType, imgHeight, isOnline, name, renderTag, tag, defaultDetailsClassNames, detailsContainerClassName, detailsClassName, detailsInsideContainerClassName} = this.props;
        const customClassName = cn({
            'fontSize08Rem': defaultDetailsClassNames,
            [detailsContainerClassName]: detailsContainerClassName
        });
        return <div className={customClassName}>
            <div className='justifyCenter'><img alt='' src={getWisor(wisorType)} height={imgHeight}/></div>
            <div className={detailsInsideContainerClassName}>
                <div className='justifyCenter'>
                    {isOnline && <div className='justifyStart'><TiWiFi style={{color: GREEN_COLOR}}/></div>}
                    {isOnline === false && <div className={detailsClassName}><TiWiFi style={{color: RED_COLOR}}/></div>}
                    {name && <div className={`name width100 ${detailsClassName}`}>{name}</div>}
                </div>
                {renderTag && <div className={`fontSize06Rem ${detailsClassName}`}>tag: #{tag}</div>}
                {<div className={detailsClassName}>{this.renderEloAndGrade()}</div>}
            </div>
        </div>;
    }

    renderEloAndGrade() {
        const {eloStyle, elo, renderElo, renderGrade, grade} = this.props;
        if (!renderElo) {
            return null;
        }
        return <div className={`justifyBetween`}>
            {renderGrade && <Grade className='paddingRightRem' grade={grade}/>}
            <Elo style={eloStyle} elo={elo}/>
        </div>;
    }

    renderContent() {
        return <div className='relative profile justifyCenter'>
            {this.renderDetails()}
            {this.renderActions()}
        </div>;
    }

    render() {
        const {onClick, tag, children, childrenAfterContent, className, style, active, disabled, blackBackground, defaultClassNames} = this.props;
        const customClassName = cn({
            'profileContainer relative inlineBlock marginRem paddingRem boxShadow': defaultClassNames,
            [className]: className,
            active,
            disabled,
        });
        return <div onClick={disabled ? _.noop : onClick} key={tag}
                    className={`${customClassName}`}
                    style={style}>
            {blackBackground && <div className='blackBackground absoluteBackgroundMix'/>}
            {disabled && <div className='absoluteBackgroundMix opacity1 zIndex1'>
                <img alt='' src={cross} className='height100 width100'/>
            </div>}
            {children}
            {this.renderContent()}
            {childrenAfterContent}
        </div>
    }

}
