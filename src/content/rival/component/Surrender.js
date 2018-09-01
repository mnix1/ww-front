import React from 'react';
import '../battle/page/styles.css';
import {getText, TEXT_SURRENDER} from "../../../lang/langText";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import flag from '../../../media/image/icon/flag.svg';

export default class Surrender extends React.PureComponent {

    render() {
        const {onShowOptionsChange, communication, surrenderMsg, screen} = this.props;
        const imgHeight = screen.isSmallHeight ? 20 : 30;
        return <div className='justifyCenter surrender' onClick={() => {
            communication.send(surrenderMsg);
            onShowOptionsChange(false);
        }}>
            <Button material={BUTTON_MATERIAL_BOX_SHADOW} icon={<img alt='' src={flag} height={imgHeight}/>}>
                <div className='justifyCenter flexColumn'>{getText(TEXT_SURRENDER)}</div>
            </Button>
        </div>;
    }
}
