import React from 'react';
import Notification from "rc-notification";
import './styles.css';
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