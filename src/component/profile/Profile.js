import React from 'react';
import './styles.css';
import {getHero} from "../../util/heroHelper";
import PropTypes from "prop-types";
import TiWiFi from "react-icons/lib/ti/wi-fi";
import {GREEN_COLOR, RED_COLOR} from "../../util/style/constant";
import _ from 'lodash';

export default class Profile extends React.PureComponent {

    static propTypes = {
        tag: PropTypes.string,
        name: PropTypes.string,
        heroType: PropTypes.string,
        className: PropTypes.string,
        isOnline: PropTypes.bool,
        isAdded: PropTypes.bool,
        actions: PropTypes.node,
        children: PropTypes.node,
        imgHeight: PropTypes.number,
        style: PropTypes.object,
        onClick: PropTypes.func,
        isActive: PropTypes.bool,
        renderDetailsHorizontal: PropTypes.bool,
        blackBackground: PropTypes.bool,
    };

    static defaultProps = {
        imgHeight: 80,
        className: '',
        isActive: false,
        renderDetailsHorizontal: false,
        blackBackground: false,
        onClick: _.noop
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    renderDetails() {
        const {isOnline, name, tag} = this.props;
        return <div className='details justifyBetween relative flexColumn'>
            {isOnline === true && <div><TiWiFi style={{color: GREEN_COLOR}}/></div>}
            {isOnline === false && <div><TiWiFi style={{color: RED_COLOR}}/></div>}
            <div>
                {name && <div className='name'>{name}</div>}
                {tag && <div className='tag'>#{tag}</div>}
            </div>
        </div>;
    }

    renderContent() {
        const {heroType, imgHeight, renderDetailsHorizontal} = this.props;
        if (renderDetailsHorizontal) {
            return <div className='profile justifyBetween flexColumn'>
                {this.renderDetails()}
                <div className='justifyCenter'><img alt='' src={getHero(heroType)} height={imgHeight}/></div>
                {this.renderActions()}
            </div>;
        }
        return <div className='profile justifyBetween'>
            <div className='justifyCenter'><img alt='' src={getHero(heroType)} height={imgHeight}/></div>
            {this.renderDetails()}
            {this.renderActions()}
        </div>;
    }

    render() {
        const {onClick, tag, children, className, style, isActive, blackBackground} = this.props;
        return <div onClick={onClick} key={tag}
                    className={`profileContainer inlineBlock marginRem paddingRem boxShadow ${isActive ? 'active' : ''} ${blackBackground ? 'blackBackground' : ''} ${className}`}
                    style={style}>
            {children}
            {this.renderContent()}
        </div>
    }

}
