import React from 'react';
import './styles.css';
import {getText, TEXT_REWARD} from "../../lang/langText";
import {notice} from "./notice";
import presentSvg from '../../media/image/icon/present.svg';
import Experience from "../experience/Experience";
import {getStore} from "../../index";

export function noticeExperience(obj, onClick) {
    notice(
        <div className='relative justifyCenter flexColumn'>
            {/*<div className='justifyEvenly'>*/}
                {/*<img alt='' src={presentSvg} height={30}/>*/}
                {/*<div className='justifyCenter flexColumn marginRem'>*/}
                    {/*{getText(TEXT_REWARD)}*/}
                {/*</div>*/}
            {/*</div>*/}
            <div className='justifyEvenly marginRem'>
                <Experience store={getStore()} {...obj}/>
            </div>
        </div>,
        onClick
    );
}
