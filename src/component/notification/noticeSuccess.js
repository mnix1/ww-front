import React from 'react';
import './styles.css';
import {notice} from "./notice";
import successSvg from '../../media/image/icon/success.svg';
import {getSuccess} from "../../lang/langSuccess";

export function noticeSuccess(success) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <div className='justifyCenter flexColumn'>
                    <img alt='' src={successSvg} height={30}/>
                </div>
                <div className='justifyCenter flexColumn marginRem'>
                    {getSuccess(success)}
                </div>
            </div>
        </div>
    );
}
