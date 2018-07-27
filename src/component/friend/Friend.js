import React from 'react';
import './styles.css';
import {getHero, randomHero} from "../../util/media/HeroHelper";
import PropTypes from "prop-types";

export const STATUS_REQUESTED = 'REQUESTED';
export const STATUS_SUGGESTED = 'SUGGESTED';
export const STATUS_ACCEPTED = 'ACCEPTED';

export class Friend extends React.PureComponent {

    static propTypes = {
        friend: PropTypes.object,
        isAdded: PropTypes.bool
    };


    renderActions() {
        const {actions} = this.props;
        return actions;
    }

    render() {
        const {friend} = this.props;
        return <div key={friend.tag} className='friendContainer'>
            <div className='friend'>
                <img src={getHero(friend.avatar)} height={80}/>
                <div className='details'>
                    {this.renderActions()}
                    <div>
                        <div className='name'>{friend.name}</div>
                        <div className='tag'>#{friend.tag}</div>
                    </div>
                </div>
            </div>
        </div>
    }

}
