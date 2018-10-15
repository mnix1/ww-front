import React from 'react';
import './styles.css';
import {
    getText,
    TEXT_ADD_FRIEND,
    TEXT_ADD_FRIEND_ALREADY,
    TEXT_ENTER_TAG_HERE,
    TEXT_REQUEST_SENT,
    TEXT_WRONG_TAG
} from "../../lang/langText";
import {FaPlusCircle} from 'react-icons/fa';
import {IoMdSync} from 'react-icons/io';
import PropTypes from "prop-types";

export class AddFriend extends React.PureComponent {

    static propTypes = {
        friend: PropTypes.object,
        onAddClick: PropTypes.func,
        onClearClick: PropTypes.func,
        addFriendRep: PropTypes.object,
    };

    addFriendInputRef = React.createRef();

    render() {
        const {onAddClick, onClearClick, addFriendRep} = this.props;
        if (addFriendRep === undefined) {
            return <div className='addFriend boxShadow paddingRem'>
                <div>{getText(TEXT_ADD_FRIEND)}</div>
                <div className='addFriendActions'>
                    <input ref={this.addFriendInputRef}
                           placeholder={getText(TEXT_ENTER_TAG_HERE)}
                           type='text'
                           maxLength={8}
                           style={{width: 120}}/>
                    <FaPlusCircle onClick={() => onAddClick(this.addFriendInputRef.current.value)}/>
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
            <IoMdSync color="#fffdf1" onClick={onClearClick}/>
        </div>;
    }

}
