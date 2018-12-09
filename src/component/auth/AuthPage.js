import React from 'react';
import {getIntroWisor} from "../../util/wisorHelper";
import {ERROR_TYPE} from "../../lang/langError";
import {getLoginText, TEXT_SIGN_IN} from "../../lang/langLogin";

export default class AuthPage extends React.PureComponent {

    renderContent() {
        return null;
    }

    getTitle() {
        return TEXT_SIGN_IN;
    }

    renderMessage() {
        const {message, lang} = this.props;
        if (!message) {
            return null;
        }
        if (message.type === ERROR_TYPE) {
            return <div className='marginBottomRem justifyStart flexWrap fontSize08Rem'
                        style={{color: '#ff5153', maxWidth: '12rem'}}>{getLoginText(message.id, lang)}</div>;
        }
        return <div className='marginBottomRem justifyStart flexWrap fontSize08Rem'
                    style={{maxWidth: '12rem'}}>{getLoginText(message.id, lang)}</div>;
    }

    render() {
        const {screen, lang} = this.props;
        return <div className='page' style={{width: screen.contentWidth}}>
            <div className='pageContent overflowAuto'>
                <div className='absoluteBackgroundMix blackBackground' style={{opacity: 0.7}}/>
                <div className='flex flexColumn height100 relative'>
                    <div className='justifyCenter paddingTopRem'>{getLoginText(this.getTitle(), lang)}</div>
                    <div className='justifyCenter'>
                        <img alt='' className='paddingRightRem' src={getIntroWisor()}
                             height={screen.contentHeight / 2}/>
                        <div className='justifyCenter flexColumn paddingLeftRem'>
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
