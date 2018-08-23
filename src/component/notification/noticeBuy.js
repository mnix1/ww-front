import React from 'react';
import {notice} from "./notice";
import {getText, TEXT_BOUGHT} from "../../lang/text";
import {getBook} from "../../util/bookHelper";
import shoppingCart from '../../media/image/icon/shoppingCart.svg';

export function noticeBuy(bookType) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <img alt='' src={shoppingCart} height={30}/>
                <div className='justifyCenter flexColumn'>
                    {getText(TEXT_BOUGHT)}
                </div>
            </div>
            <div className='justifyCenter marginRem'>
                <img alt='' src={getBook(bookType)} height={80}/>
            </div>
        </div>
    );
};
