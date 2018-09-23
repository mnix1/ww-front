import React from 'react';
import Notification from "rc-notification";
import './styles.css';
import {FaTimesCircle} from "react-icons/fa";
import cn from 'classnames';
import uuid from 'uuid';

let notification = null;
Notification.newInstance({
    style: {right: 0, bottom: '1rem'},
    closeIcon: <FaTimesCircle/>,
    maxCount: 4,
}, n => notification = n);

export function notice(content, onClick) {
    const className = cn('relative height100 notice pointer');
    const key = uuid();
    notification.notice({
        key,
        content: <div className={className} onClick={() => {
            notification.removeNotice(key);
            onClick && onClick();
        }}>
            <div className='absoluteBackgroundMix'/>
            {content}
        </div>,
        closable: true,
        duration: 400,
    });
}