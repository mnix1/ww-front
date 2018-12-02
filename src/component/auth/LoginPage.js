import React from 'react';
import {connect} from "react-redux";
import {FaFacebook, FaGoogle} from 'react-icons/fa';
import {getText, TEXT_LOGIN} from "../../lang/langText";
import {CREAM_COLOR} from "../../util/style/constant";
import {getIntroWisor} from "../../util/wisorHelper";

class LoginPage extends React.PureComponent {

    renderButton(href, backgroundColor, text, logo) {
        return <div className='justifyCenter' style={{height: '2rem', paddingTop: '1rem'}}>
            <a href={href} className='justifyStart paddingRem borderRadiusRem'
               style={{color: CREAM_COLOR, textDecoration: 'none', backgroundColor, width: '10rem'}}>
                <div className='justifyCenter flexColumn'>
                    {logo}
                </div>
                <div className='justifyCenter width100'>
                    <div className='justifyCenter flexColumn paddingLeftRem fontSize08Rem'>
                        {text}
                    </div>
                </div>
            </a>
        </div>
    }

    render() {
        const {screen} = this.props;
        return <div className='page loginPage' style={{width: screen.contentWidth}}>
            <div className='pageContent overflowAuto'>
                <div className='absoluteBackgroundMix blackBackground' style={{opacity: 0.7}}/>
                <div className='flex flexColumn height100 relative'>
                    <div className='justifyCenter paddingTopRem'>{getText(TEXT_LOGIN)}</div>
                    <div className='justifyCenter'>
                        <img alt='' className='paddingRightRem' src={getIntroWisor()} height={screen.contentHeight / 2}/>
                        <div className='justifyCenter flexColumn paddingLeftRem'>
                            {this.renderButton('/_login/google', '#4285f4', 'Log in with Google', <FaGoogle/>)}
                            {this.renderButton('/_login/facebook', '#4267b2', 'Log in with Facebook', <FaFacebook/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(LoginPage);
