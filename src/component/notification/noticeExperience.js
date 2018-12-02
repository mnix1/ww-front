import React from 'react';
import './styles.css';
import {notice} from "./notice";
import Experience from "../experience/Experience";
import {getStore} from "../../index";
import flask from "../../media/image/icon/flask.svg";
import {getText, TEXT_EXPERIENCE} from "../../lang/langText";

export function noticeExperience(obj, onClick) {
    const nextLevel = obj.levelGain !== 0;
    notice(
        <div className='relative justifyCenter flexColumn'>
            <div className='justifyEvenly'>
                <div className='justifyCenter flexColumn'>
                    <img alt='' src={flask} height={30}/>
                </div>
                <div className='justifyCenter flexColumn marginRem'>
                    {getText(TEXT_EXPERIENCE)}
                </div>
            </div>
            <div className='justifyEvenly'>
                <Experience lineWidth={60} store={getStore()} {...{
                    ...obj,
                    experienceGain: nextLevel ? 0 : obj.experienceGain
                }} styleBoxShadow={false} styleMargin={false}
                            styleBackground={false} renderTitle={false} renderNumbers={nextLevel}/>
            </div>
        </div>,
        onClick
    );
}
