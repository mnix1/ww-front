import React from 'react';
import './styles.css';
import {getHero} from "../../util/media/HeroHelper";
import PropTypes from "prop-types";
import {prepareAnswerIntervalMessage, prepareScoreMessage} from "../../util/textHelper";
import {BATTLE_STATUS_CLOSED} from "../../util/battleHelper";
import {getText, TEXT_WAITING, TEXT_WAITING_FOR_RESPONSE} from "../../lang";


export default class Position extends React.PureComponent {

    static propTypes = {
        position: PropTypes.object,
    };

    renderPosition() {
        const {position} = this.props;
        if (position.status !== BATTLE_STATUS_CLOSED) {
            return <div className='position'>
                <div className='details'>{getText(TEXT_WAITING)}</div>
                <div className='details'>ZzzZzzzz...</div>
            </div>
        }
        return <div className='position'>
            {/*<div className='details'>{preparePositionMessage(position.position)}</div>*/}
            <div className='details'>{prepareScoreMessage(position.score)}</div>
            <div className='details'>{prepareAnswerIntervalMessage(position.answerInterval)}</div>
        </div>
    }

    render() {
        const {position} = this.props;
        const profile = position.profile;
        return <div key={profile.tag} className='positionContainer'>
            {this.renderPosition()}
            <div className='profile'>
                <img src={getHero(profile.avatar)} height={80}/>
                <div className='details'>
                    <div>
                        <div className='name'>{profile.name}</div>
                        <div className='tag'>#{profile.tag}</div>
                    </div>
                </div>
            </div>
        </div>
    }

}
