import React from 'react';
import {connect} from "react-redux";
import {goBack} from "connected-react-router";
import {fetchTag} from "../../util/fetchHelper";
import _ from 'lodash';
import googleLogo from '../../media/image/icon/googleLogo.svg';
import {getText, TEXT_LOGIN} from "../../lang/langText";
import {CREAM_COLOR} from "../../util/style/constant";

class LoginPage extends React.PureComponent {

    componentDidMount() {
    }

    render() {
        const {screen} = this.props;
        return <div className='page loginPage' style={{height: screen.contentHeight / 2, width: screen.contentWidth}}>
            <div className='pageContent overflowAuto'>
                <div className='absoluteBackgroundMix blackBackground'/>
                <div className='flex flexColumn height100 relative'>
                    <div className='justifyCenter paddingTopRem'>{getText(TEXT_LOGIN)}</div>
                    <div className='justifyCenter flexColumn height100'>
                        <div className='justifyCenter'>
                            <a href="/login/google" className='justifyCenter boxShadow paddingRem'
                               style={{color: CREAM_COLOR, textDecoration: 'none'}}>
                                <img alt='' src={googleLogo} height={30}/>
                                <div className='justifyCenter flexColumn paddingLeftRem'>Google</div>
                            </a>
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
    (dispatch) => ({
        // onProfileTagChange: (tag) => {
        //     if (_.isNil(tag)) {
        //         return;
        //     }
        //     dispatch(profileTagChanged(tag));
        //     dispatch(goBack());
        // }
    })
)(LoginPage);
