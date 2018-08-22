import React from 'react';
import {notice} from "./notice";
import {getText, TEXT_BOUGHT} from "../../lang";
import {getBook} from "../../util/bookHelper";
import cashRegister from '../../media/image/icon/cashRegister.svg';

export function noticeBuy(bookType) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyBetween'>
                <img alt='' src={cashRegister} height={30}/>
                <div className='justifyCenter flexColumn'>
                    {getText(TEXT_BOUGHT)}
                </div>
            </div>
            <div className='justifyCenter marginRem'>
                <img src={getBook(bookType)} height={80}/>
            </div>
        </div>
    );
};
