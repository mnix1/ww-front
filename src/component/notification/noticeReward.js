import React from 'react';
import './styles.css';
import Gold from "../resource/Gold";
import {getText, TEXT_REWARD} from "../../lang/langText";
import {getBook} from "../../util/bookHelper";
import {notice} from "./notice";
import presentSvg from '../../media/image/icon/present.svg';

export function noticeReward(reward, onClick) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <div className='justifyCenter flexColumn'>
                    <img draggable="false" alt='' src={presentSvg} height={30}/>
                </div>
                <div className='justifyCenter flexColumn marginRem'>
                    {getText(TEXT_REWARD)}
                </div>
            </div>
            <div className='justifyEvenly marginRem'>
                {reward.goldGain && <Gold styleMargin={false}>{reward.goldGain}</Gold>}
                {reward.bookType && <img draggable="false" alt='' src={getBook(reward.bookType)} height={80}/>}
            </div>
        </div>,
        onClick
    );
}
