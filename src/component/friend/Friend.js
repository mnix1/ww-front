import React from 'react';
import './styles.css';
import {randomHero} from "../../util/media/HeroHelper";
import FaBan from 'react-icons/lib/fa/ban';
import FaGavel from 'react-icons/lib/fa/gavel';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';

const FRIEND_STATUS_REQUESTED = 'REQUESTED';
const FRIEND_STATUS_ACCEPTED = 'ACCEPTED';

export class Friend extends React.PureComponent {

    render() {
        const {onAcceptFriendClick, onDeleteFriendClick, onBattleFriendClick, friend} = this.props;
        return <div key={friend.tag} className='friendContainer'>
            <div className='friend'>
                <img src={randomHero()} height={80}/>
                <div className='details'>
                    <div className='actions'>
                        {friend.status === FRIEND_STATUS_ACCEPTED && <FaGavel color="#fffdf1" onClick={() => onBattleFriendClick(friend.tag)}/>}
                        {friend.status === FRIEND_STATUS_REQUESTED && <FaPlusCircle color="#fffdf1" onClick={() => onAcceptFriendClick(friend.tag)}/>}
                        <FaBan color="#fffdf1" onClick={() => onDeleteFriendClick(friend.tag)}/>
                    </div>
                    <div>
                        <div className='name'>{friend.name}</div>
                        <div className='tag'>#{friend.tag}</div>
                    </div>
                </div>
            </div>
        </div>
    }

}
