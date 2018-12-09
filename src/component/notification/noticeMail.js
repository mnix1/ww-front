import React from 'react';
import './styles.css';
import {notice} from "./notice";
import letter from "../../media/image/icon/letter.svg";
import {getText, TEXT_NEW_MAIL} from "../../lang/langText";

export function noticeMail(onClick) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <div className='justifyCenter flexColumn'>
                    <img draggable="false" alt='' src={letter} height={30}/>
                </div>
                <div className='justifyCenter flexColumn marginRem'>
                    {getText(TEXT_NEW_MAIL)}
                </div>
            </div>
        </div>,
        onClick
    );
}
