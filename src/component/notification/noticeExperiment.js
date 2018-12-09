import React from 'react';
import {notice} from "./notice";
import {getText, TEXT_WISIE_DISCOVERED} from "../../lang/langText";
import experiment from '../../media/image/icon/experiment.svg';
import {getWisieImgSrc} from "../../util/wisieHelper";

export function noticeExperiment(wisieType) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <div className='justifyCenter flexColumn'>
                    <img draggable="false" alt='' src={experiment} height={30}/>
                </div>
                <div className='justifyCenter flexColumn marginRem'>
                    {getText(TEXT_WISIE_DISCOVERED)}
                </div>
            </div>
            <div className='justifyCenter marginRem'>
                <img draggable="false" alt='' src={getWisieImgSrc(wisieType)} height={80}/>
            </div>
        </div>
    );
}
