import React from 'react';
import Notification from "rc-notification";
import './styles.css';
import errorSvg from '../../media/image/icon/error.svg';
import presentSvg from '../../media/image/icon/present.svg';
import {getError} from "../../error";
import Gold from "../resource/Gold";
import {getText, TEXT_REWARD} from "../../lang";
import {getBook} from "../../util/bookHelper";

let notification = null;
Notification.newInstance({style: {right: 0, top: '1rem'}}, n => notification = n);

export function notice(content) {
    notification.notice({
        content: <div className='relative height100 notice'>
            <div className='absoluteBackgroundMix'/>
            {content}
        </div>,
        duration: 4
    });
};

export function noticeError(error) {
    notice(
        <div className='relative justifyCenter'>
            <img alt='' src={errorSvg} height={30}/>
            <div className='justifyCenter flexColumn'>{getError(error)}</div>
        </div>
    );
};

export function noticeReward(reward) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyBetween'>
                <img alt='' src={presentSvg} height={30}/>
                <div className='justifyCenter flexColumn'>
                    {getText(TEXT_REWARD)}
                </div>
            </div>
            <div className='justifyCenter marginRem'>
                {reward.gainGold && <Gold>{reward.gainGold}</Gold>}
                {reward.bookType && <img src={getBook(reward.bookType)} height={80}/>}
            </div>
        </div>
    );
};
