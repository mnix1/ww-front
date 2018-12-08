import React from 'react';
import {connect} from "react-redux";
import {FaExternalLinkSquareAlt, FaFacebook, FaGoogle} from 'react-icons/fa';
import {getText, TEXT_APP_NAME, TEXT_LOG_IN_WITH, TEXT_LOGIN, TEXT_PASSWORD} from "../../lang/langText";
import {CREAM_COLOR} from "../../util/style/constant";
import {getIntroWisor} from "../../util/wisorHelper";
import {requestForm} from "../../util/fetchHelper";
import {noticeError} from "../notification/noticeError";
import {ERROR_NO_EMAIL_OR_PASSWORD} from "../../lang/langError";
import {replace} from "connected-react-router";
import {APP_ROUTE} from "../../content/routes";

class LoginPage extends React.PureComponent {

    state = {
        username: null,
        password: null,
    };

    renderButton(backgroundColor, text, logo, onClick) {
        return <div className='justifyCenter' style={{height: '2rem', paddingTop: '1rem'}}>
            <a onClick={onClick} className='justifyStart paddingRem borderRadiusRem pointer'
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

    renderCustomLogin(text) {
        const {goToMainScreen, lang} = this.props;
        return <div className='justifyCenter flexColumn'>
            <input onChange={event => this.setState({username: event.target.value})} className='marginBottomRem'
                   type='text' placeholder={'login'}/>
            <input onChange={event => this.setState({password: event.target.value})} type='password'
                   placeholder={getText(TEXT_PASSWORD, lang)}/>
            {this.renderButton('#8f8e90', text, <FaExternalLinkSquareAlt/>, () => {
                const {username, password} = this.state;
                if (!username || !password) {
                    noticeError(ERROR_NO_EMAIL_OR_PASSWORD);
                    return;
                }
                const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                requestForm('/_login/wisiemania', formData)
                    .then(goToMainScreen)
                    .catch(() => {
                        //wrong cred
                    })
            })}
        </div>
    }

    onClickHref(url) {
        return () => window.location.href = url;
    }

    render() {
        const {screen, lang} = this.props;
        return <div className='page loginPage' style={{width: screen.contentWidth}}>
            <div className='pageContent overflowAuto'>
                <div className='absoluteBackgroundMix blackBackground' style={{opacity: 0.7}}/>
                <div className='flex flexColumn height100 relative'>
                    <div className='justifyCenter paddingTopRem'>{getText(TEXT_LOGIN)}</div>
                    <div className='justifyCenter'>
                        <img alt='' className='paddingRightRem' src={getIntroWisor()}
                             height={screen.contentHeight / 2}/>
                        <div className='justifyCenter flexColumn paddingLeftRem'>
                            {this.renderCustomLogin(`${getText(TEXT_LOG_IN_WITH, lang)} ${getText(TEXT_APP_NAME, lang)}`)}
                            {this.renderButton('#4285f4', `${getText(TEXT_LOG_IN_WITH, lang)} Google`,
                                <FaGoogle/>, this.onClickHref('/_login/google'))}
                            {this.renderButton('#4267b2', `${getText(TEXT_LOG_IN_WITH, lang)} Facebook`,
                                <FaFacebook/>, this.onClickHref('/_login/facebook'))}
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
        lang: state.language.lang,
    }),
    (dispatch) => ({
        goToMainScreen: () => {
            dispatch(replace(APP_ROUTE));
        },
    })
)(LoginPage);
