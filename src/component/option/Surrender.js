import React from 'react';
import flag from './../../media/image/icon/flag.svg';
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../button/Button";
import {getText, TEXT_SURRENDER} from "../../lang/langText";

export default class Surrender extends React.PureComponent {

    render() {
        const {onOptionShowChange, communication, screen} = this.props;
        const imgHeight = screen.isSmallHeight ? 20 : 30;
        return <div className='justifyCenter surrender' onClick={() => {
            communication.sendSurrender();
            onOptionShowChange(false);
        }}>
            <Button material={BUTTON_MATERIAL_BOX_SHADOW} icon={<img alt='' src={flag} height={imgHeight}/>}>
                <div className='justifyCenter flexColumn'>{getText(TEXT_SURRENDER)}</div>
            </Button>
        </div>;
    }
}
