import React from 'react';
import './styles.css';
import Gold from "../resource/Gold";
import {getText, TEXT_REWARD} from "../../lang/langText";
import {getBook} from "../../util/bookHelper";
import {notice} from "./notice";
import presentSvg from '../../media/image/icon/present.svg';

export function noticeReward(reward) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <img alt='' src={presentSvg} height={30}/>
                <div className='justifyCenter flexColumn marginRem'>
                    {getText(TEXT_REWARD)}
                </div>
            </div>
            <div className='justifyEvenly marginRem'>
                {reward.goldGain && <Gold>{reward.goldGain}</Gold>}
                {reward.bookType && <img alt='' src={getBook(reward.bookType)} height={80}/>}
            </div>
        </div>
    );
}
