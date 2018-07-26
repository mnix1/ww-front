import React from 'react';
import './styles.css';
import {
    getText,
    TEXT_ADD_FRIEND,
    TEXT_ADD_FRIEND_ALREADY,
    TEXT_ADD_FRIEND_TAG,
    TEXT_REQUEST_SENT,
    TEXT_WRONG_TAG
} from "../../lang";
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import IoAndroidSync from 'react-icons/lib/io/android-sync';

export class AddFriend extends React.PureComponent {

    addFriendInputRef = React.createRef();

    render() {
        const {onAddFriendClick, onAddFriendClear, addFriendRep, screen} = this.props;
        const fontSize = screen.isSmallHeight || screen.isSmallWidth
            ? 14 : 20;
        if (addFriendRep === undefined) {
            return <div className='addFriend'>
                <div>{getText(TEXT_ADD_FRIEND)}</div>
                <div className='addFriendActions'>
                    <input ref={this.addFriendInputRef}
                           placeholder={getText(TEXT_ADD_FRIEND_TAG)}
                           type='text'
                           maxLength={8}
                           style={{width: 120}}/>
                    <FaPlusCircle color="#fffdf1" size={fontSize + 4}
                                  onClick={() => onAddFriendClick(this.addFriendInputRef.current.value)}/>
                </div>
            </div>;
        }
        if (addFriendRep.pending) {
            return <div className='addFriend'>LOADING</div>
        }
        if (addFriendRep.rejected) {
            return <div className='addFriend'>REJECTED</div>
        }
        const code = addFriendRep.value.code;
        return <div className='addFriend' style={{display: 'flex'}}>
            {code === 1 && <span>{getText(TEXT_REQUEST_SENT)}</span>}
            {code === -2 && <span>{getText(TEXT_WRONG_TAG)}</span>}
            {(code === -1 || code === -3) && <span>{getText(TEXT_ADD_FRIEND_ALREADY)}</span>}
            <IoAndroidSync size={fontSize} color="#fffdf1" onClick={onAddFriendClear}/>
        </div>;
    }

}
