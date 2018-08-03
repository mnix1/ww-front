import React from 'react';
import './styles.css';
import {getHero} from "../../util/media/HeroHelper";
import PropTypes from "prop-types";
import TiWiFi from "react-icons/lib/ti/wi-fi";
import {DARK_GREEN_COLOR, DARK_RED_COLOR, GREEN_COLOR, RED_COLOR} from "../../util/style/constant";

export default class Profile extends React.PureComponent {

    static propTypes = {
        tag: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
        isOnline: PropTypes.bool,
        isAdded: PropTypes.bool,
        actions: PropTypes.node,
        children: PropTypes.node,
        imgHeight: PropTypes.number
    };

    static defaultProps = {
        imgHeight: 80,
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    render() {
        const {avatar, isOnline, name, tag, children, imgHeight} = this.props;
        return <div key={tag} className='profileContainer'>
            {children}
            <div className='profile'>
                <img alt='' src={getHero(avatar)} height={imgHeight}/>
                <div className='details'>
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
