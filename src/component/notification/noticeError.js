import React from 'react';
import {notice} from "./notice";
import errorSvg from '../../media/image/icon/error.svg';
import {getError} from "../../lang/error";

export function noticeError(error) {
    notice(
        <div className='relative justifyEvenly'>
            <img alt='' src={errorSvg} height={30}/>
            <div className='justifyCenter flexColumn'>{getError(error)}</div>
        </div>
    );
};