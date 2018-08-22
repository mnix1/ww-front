import React from 'react';
import {notice} from "./notice";
import errorSvg from '../../media/image/icon/error.svg';
import {getError} from "../../error";

export function noticeError(error) {
    notice(
        <div className='relative justifyCenter'>
            <img alt='' src={errorSvg} height={30}/>
            <div className='justifyCenter flexColumn'>{getError(error)}</div>
        </div>
    );
};