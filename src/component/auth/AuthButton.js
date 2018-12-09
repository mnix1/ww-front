import React from 'react';
import {CREAM_COLOR} from "../../util/style/constant";

export  default class AuthButton extends React.PureComponent {

    render() {
        const {backgroundColor, text, logo, onClick} = this.props;
        return <div className='justifyCenter' style={{height: '2rem', paddingTop: '1rem'}}>
            <div onClick={onClick} className='justifyStart paddingRem borderRadiusRem pointer'
               style={{color: CREAM_COLOR, textDecoration: 'none', backgroundColor, width: '12rem'}}>
                <div className='justifyCenter flexColumn'>
                    {logo}
                </div>
                <div className='justifyCenter width100'>
                    <div className='justifyCenter flexColumn paddingLeftRem fontSize08Rem'>
                        {text}
                    </div>
                </div>
            </div>
        </div>
    }
}