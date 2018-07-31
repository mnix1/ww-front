import React from 'react';
import './styles.css';
import {getHero} from "../../util/media/HeroHelper";
import PropTypes from "prop-types";
import TiWiFi from "react-icons/lib/ti/wi-fi";
import {DARK_GREEN_COLOR, DARK_RED_COLOR} from "../../util/style/constant";

export const STATUS_REQUESTED = 'REQUESTED';
export const STATUS_SUGGESTED = 'SUGGESTED';
export const STATUS_ACCEPTED = 'ACCEPTED';

export default class Friend extends React.PureComponent {

    static propTypes = {
        friend: PropTypes.object,
        isAdded: PropTypes.bool,
        actions: PropTypes.node,
        children: PropTypes.node,
    };

    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    render() {
        const {friend, children} = this.props;
        return <div key={friend.tag} className='friendContainer'>
            <div className='friend'>
                {children}
                <img src={getHero(friend.avatar)} height={80}/>
                <div className='details'>
                    {friend.isOnline && <div><TiWiFi style={{color: DARK_GREEN_COLOR}}/></div>}
                    {friend.isOnline === false && <div><TiWiFi style={{color: DARK_RED_COLOR}}/></div>}
                    <div>
                        <div className='name'>{friend.name}</div>
                        <div className='tag'>#{friend.tag}</div>
                    </div>
                </div>
                {this.renderActions()}
            </div>
        </div>
    }

}
