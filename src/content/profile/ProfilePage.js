import React from 'react';
import {connect} from 'react-redux';
import ProfilePageBook from "./ProfilePageBook";
import AvailableResources from "../../component/resource/AvailableResources";
import Profile from "../../component/profile/Profile";
import ScreenPage from "../../component/page/ScreenPage";
import letter from "../../media/image/icon/letter.svg";
import {RED_COLOR} from "../../util/style/constant";
import {getText, TEXT_MAIL} from "../../lang/langText";
import {MAIL_ROUTE} from "../routes";
import {push} from 'connected-react-router'
import ProfileFetchContainer from "./fetch/ProfileFetchContainer";
import {Loading} from "../../component/loading/Loading";
import _ from 'lodash';
import {isRepFulfilled, isRepPending} from "../../util/repositoryHelper";

class ProfilePage extends React.PureComponent {
    renderMailBox() {
        const {screen, onMailBoxClick, mailListRep, lang} = this.props;
        const pending = isRepPending(mailListRep);
        let style = {
            background: RED_COLOR,
            opacity: 0.8,
            borderRadius: '50%',
            height: screen.fontSizeRem,
            width: screen.fontSizeRem,
            top: screen.fontSizeRem / 4,
            right: screen.fontSizeRem / 4,
            left: 'auto'
        };
        const noNewMails = isRepFulfilled(mailListRep) && !_.some(mailListRep.value, e => !e.displayed);
        if (pending || noNewMails) {
            style.background = '#444';
        }
        return <div className={`justifyStart flexColumn relative ${pending ? 'notAllowed' : 'pointer'}`}
                    onClick={onMailBoxClick}>
            <span className='justifyCenter'>{getText(TEXT_MAIL, lang)}</span>
            <div className='justifyCenter relative'>
                <div className='absoluteBackgroundMix' style={style}>
                    {pending && <Loading height={screen.fontSizeRem / 2}/>}
                </div>
                <img alt='' src={letter} height={screen.standardImgHeight}/>
            </div>
        </div>
    }

    render() {
        const {profile} = this.props;
        if (_.isNil(profile)) {
            return <Loading/>;
        }
        return <ScreenPage>
            <div className='justifyCenter flexColumn'>
                <div className='justifyEvenly flexWrap'>
                    <Profile renderTag className='' {...profile}/>
                    <div className='justifyCenter'><AvailableResources/></div>
                    <div className='justifyCenter paddingTopRem'>{this.renderMailBox()}</div>
                </div>
                <ProfilePageBook/>
            </div>
            <ProfileFetchContainer/>
        </ScreenPage>
    }
}

export default connect(
    (state) => ({
        profile: state.profile,
        lang: state.language.lang,
        screen: state.screen,
        mailListRep: state.repository.mailList,
    }),
    (dispatch) => ({
        onMailBoxClick: () => dispatch(push(MAIL_ROUTE))
    })
)(ProfilePage);
