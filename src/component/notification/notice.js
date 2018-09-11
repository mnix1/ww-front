import React from 'react';
import Notification from "rc-notification";
import './styles.css';
import {FaTimesCircle} from "react-icons/fa";

let notification = null;
Notification.newInstance({
    style: {right: 0, top: '1rem'},
    closeIcon: <FaTimesCircle/>,
    maxCount: 4,
}, n => notification = n);

export function notice(content) {
    notification.notice({
        content: <div className='relative height100 notice'>
            <div className='absoluteBackgroundMix'/>
            {content}
        </div>,
        closable: true,
        duration: 4,
    });
}