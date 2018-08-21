import React from 'react';
import Notification from "rc-notification";
import './styles.css';
import error from '../../media/image/icon/error.svg';
import {getError} from "../../error";

let notification = null;
Notification.newInstance({width: 200, height: 200, left: `calc(50vw - 200px)`}, n => notification = n);

export function notice(content) {
    notification.notice({
        content: <div className='relative height100 notice'>
            <div className='absoluteBackgroundMix'/>
            <div className='relative justifyCenter'>
                <img alt='' src={error} height={30}/>
                <div className='justifyCenter flexColumn'>{content}</div>
            </div>
        </div>
    });
};

export function noticeError(error) {
    notice(getError(error));
};
