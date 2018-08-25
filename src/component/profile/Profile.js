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
        onClick: PropTypes.func
    };

    static defaultProps = {
        imgHeight: 80,
        className: '',
        onClick: _.noop
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    render() {
        const {heroType, onClick, isOnline, name, tag, children, imgHeight, className, style} = this.props;
        return <div onClick={onClick} key={tag} className={`profileContainer inlineBlock marginRem paddingRem boxShadow ${className}`} style={style}>
            {children}
            <div className='profile justifyBetween'>
                <div className='justifyCenter'><img alt='' src={getHero(heroType)} height={imgHeight}/></div>
                <div className='details justifyBetween relative flexColumn'>
                    {isOnline === true && <div><TiWiFi style={{color: GREEN_COLOR}}/></div>}
                    {isOnline === false && <div><TiWiFi style={{color: RED_COLOR}}/></div>}
                    <div>
                        {name && <div className='name'>{name}</div>}
                        {tag && <div className='tag'>#{tag}</div>}
                    </div>
                </div>
                {this.renderActions()}
            </div>
        </div>
    }

}
