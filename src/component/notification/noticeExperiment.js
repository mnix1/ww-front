import React from 'react';
import {notice} from "./notice";
import {getText, TEXT_WISIE_DISCOVERED} from "../../lang/text";
import experiment from '../../media/image/icon/experiment.svg';
import {getHero} from "../../util/heroHelper";

export function noticeExperiment(heroType) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <img alt='' src={experiment} height={30}/>
                <div className='justifyCenter flexColumn marginRem'>
                    {getText(TEXT_WISIE_DISCOVERED)}
                </div>
            </div>
            <div className='justifyCenter marginRem'>
                <img alt='' src={getHero(heroType)} height={80}/>
            </div>
        </div>
    );
};
