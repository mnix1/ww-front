import React from 'react';
import {notice} from "./notice";
import errorSvg from '../../media/image/icon/error.svg';
import {getError} from "../../lang/langError";

export function noticeError(error, onClick) {
    notice(
        <div className='relative justifyEvenly'>
            <div className='justifyCenter flexColumn'>
                <img alt='' src={errorSvg} height={30}/>
            </div>
            <div className='justifyCenter flexColumn marginRem'>{getError(error)}</div>
        </div>,
        onClick
    );
}